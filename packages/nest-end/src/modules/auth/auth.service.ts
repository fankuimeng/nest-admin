import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { md5, responseMessage } from 'src/utils';
import { RedisService } from '../redis/redis.service';
import {
  AdminLoginResponseDto,
  AdminLoginUserVo,
  UserInfo,
  UserLoginDto,
  UserRegisterDto,
} from './typing/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseModel, SessionModel } from 'src/typinng/global';
import { BusinessException } from 'src/filter/business.exception';

@Injectable()
export class AuthService {
  constructor() {}
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(UserService)
  private userService: UserService;

  @Inject(ConfigService)
  private configService: ConfigService;

  @Inject(RedisService)
  private redisService: RedisService;

  async login(userInfo: UserLoginDto, ip, session: SessionModel) {
    const user = await this.validateUser(userInfo);
    const { accessToken, refreshToken } = await this.generateTokens(user);
    // 执行更新操作 // 将登录次数+1
    const newUser = await this.userService.saveOne({
      ...user,
      loginLastIp: ip,
      loginLastTime: new Date(),
      id: user.id,
      loginNum: user.loginNum + 1,
    });
    // 将数据保存到session
    session.currentUserInfo = newUser as User;
    return responseMessage(
      { userInfo: { ...newUser, password: null }, accessToken, refreshToken },
      '登录成功',
      '登录成功',
    );
  }

  async register(user: UserRegisterDto) {
    const captcha = await this.redisService.getValue(`captcha_${user.email}`);

    if (!captcha)
      throw new BusinessException('验证码已失效', HttpStatus.BAD_REQUEST);

    if (user.captcha !== captcha)
      throw new BusinessException('验证码不正确', HttpStatus.BAD_REQUEST);
    const foundUser = await this.userService.repository.findOneBy({
      name: user.name,
    });
    if (foundUser)
      throw new BusinessException('用户已存在', HttpStatus.BAD_REQUEST);
    return await this.userService.saveOne(
      { ...user, password: md5(user.password) },
      {
        successMsg: '注册用户成功',
        errorCode: HttpStatus.BAD_REQUEST,
      },
    );
  }
  async validateUser(userInfo: UserLoginDto) {
    const { name, password, captcha, type = 1 } = userInfo;
    const userinfo = await this.userService.findOne({
      where: {
        name,
        password: md5(password),
        isAdmin: type,
      },
      select: { password: false },
      relations: ['roles', 'roles.permissions'],
    });
    if (!userinfo)
      throw new BusinessException(
        '用户或密码错误，请重新登录',
        HttpStatus.FORBIDDEN,
      );

    const redisCaptcha = await this.redisService.getValue(
      `captcha_${userinfo.email}`,
    );
    if (!userinfo.isAdmin && !redisCaptcha)
      throw new BusinessException('验证码已失效', HttpStatus.FORBIDDEN);

    if (!userinfo.isAdmin && redisCaptcha !== captcha)
      throw new BusinessException('验证码不正确', HttpStatus.FORBIDDEN);
    if (userinfo?.isDisable)
      throw new BusinessException(
        '当前用户已被禁用,请联系管理员',
        HttpStatus.FORBIDDEN,
      );
    return userinfo;
  }
  // login -> token
  async generateTokens(userInfo: User): Promise<Partial<AdminLoginUserVo>> {
    const accessToken = this.jwtService.sign(
      {
        userId: userInfo.id,
        username: userInfo.name,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId: userInfo.id,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    // 将用户 token 保存到 redis
    await this.redisService.setValue(
      `${userInfo.id}-${userInfo.name}`,
      accessToken,
      Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME')),
    );
    await this.redisService.setValue(
      `refreshToken-${userInfo.id}`,
      refreshToken,
      Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME')),
    );
    return { refreshToken, userInfo, accessToken };
  }

  async refresh(refreshTokenArgs: string, session: SessionModel) {
    // 获取 redis 存储的 token
    const cacheToken = await this.redisService.getValue(
      `refreshToken-${session.currentUserInfo.id}`,
    );
    // token 已过期
    if (!cacheToken) {
      throw new UnauthorizedException('刷新token令牌已过期，请重新登录！');
    }
    // token 校验
    if (JSON.parse(cacheToken) !== refreshTokenArgs) {
      throw new UnauthorizedException('token令牌非法，请重新登录！');
    }
    const userInfo = await this.userService.repository.findOneBy({
      id: Number(session.currentUserInfo.id),
    });
    if (!userInfo) throw new BusinessException('当前用户不存在');
    const { refreshToken, accessToken } = await this.generateTokens(userInfo);

    return responseMessage({ refreshToken, accessToken, userInfo });
  }
}
