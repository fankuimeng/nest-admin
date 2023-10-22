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
import { HttpError } from 'src/common/exception';
import { RedisService } from '../redis/redis.service';
import {
  AdminLoginResponseDto,
  LoginDto,
  UserInfo,
  UserLoginDto,
  UserRegisterDto,
} from './typing/user';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResponseModel } from 'src/typinng/global';

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

  async login(userInfo: UserLoginDto) {
    const { name, password, captcha, type = 1 } = userInfo;
    const userinfo = await this.userService.findOne({
      where: {
        name,
        isAdmin: type,
      },

      relations: ['roles', 'roles.permissions'],
    });
    if (!userinfo)
      throw new HttpError('用户不存在，请注册', HttpStatus.UNAUTHORIZED);
    if (md5(password) !== userinfo.password)
      throw new HttpError('输入密码错误', HttpStatus.UNAUTHORIZED);
    const redisCaptcha = await this.redisService.getValue(
      `captcha_${userinfo.email}`,
    );
    if (!redisCaptcha)
      throw new HttpError('验证码已失效', HttpStatus.UNAUTHORIZED);
    if (redisCaptcha === captcha)
      throw new HttpError('验证码不正确', HttpStatus.UNAUTHORIZED);

    if (userinfo.isDisable)
      throw new HttpError(
        '当前用户已被禁用,请联系管理员',
        HttpStatus.UNAUTHORIZED,
      );
    return this.handlUserLogin(userinfo);
  }
  async register(user: UserRegisterDto) {
    const captcha = await this.redisService.getValue(`captcha_${user.email}`);

    if (!captcha) throw new HttpError('验证码已失效', HttpStatus.BAD_REQUEST);

    if (user.captcha !== captcha)
      throw new HttpError('验证码不正确', HttpStatus.BAD_REQUEST);
    const foundUser = await this.userService.repository.findOneBy({
      name: user.name,
    });
    if (foundUser) throw new HttpError('用户已存在', HttpStatus.BAD_REQUEST);
    return await this.userService.saveOne(
      { ...user, password: md5(user.password) },
      {
        successMsg: '注册用户成功',
        errorCode: HttpStatus.BAD_REQUEST,
      },
    );
  }

  async handlUserLogin(
    userInfo: User,
    msg = '登录成功',
    type = 0,
  ): Promise<ResponseModel<AdminLoginResponseDto>> {
    const newUser: UserInfo = {
      ...userInfo,
      password: null,
      roles: userInfo.roles.map((item) => item.name),
      permissions: userInfo.roles.reduce((arr, item) => {
        item.permissions.forEach((permission) => {
          if (arr.indexOf(permission) === -1) {
            arr.push(permission);
          }
        });
        return arr;
      }, []),
    };

    const accessToken = this.jwtService.sign(
      {
        userId: newUser.id,
        username: newUser.name,
        roles: newUser.roles,
        permissions: newUser.permissions,
      },
      {
        expiresIn:
          this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME') || '30m',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        userId: newUser.id,
      },
      {
        expiresIn:
          this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME') || '7d',
      },
    );
    return responseMessage(
      { data: newUser, refreshToken, accessToken },
      null,
      msg,
    );
  }

  async refresh(refreshToken: string) {
    try {
      const data = this.jwtService.verify(refreshToken);
      const user = await this.userService.repository.findOneBy({
        id: Number(data.userId),
      });
      return this.handlUserLogin(user, '刷新成功');
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }
}
