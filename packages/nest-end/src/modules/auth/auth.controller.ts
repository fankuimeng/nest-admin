import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Res,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responseMessage } from 'src/utils';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from '../redis/redis.service';
import { EmailService } from '../common/email.service';

import { SessionModel } from 'src/typinng/global';
import { IpAddress } from 'src/utils/requestIp';
import {
  AuthLoginResponseVo,
  AuthVerifyCodeResponseVo,
} from './dto/response.vo';
import { ResponseVo } from '../base/dto/response.vo';
import { AuthRefreshTokenDto, AuthUserRegisterDto } from './dto/request.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth-用户权限模块')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOkResponse({ type: AuthVerifyCodeResponseVo })
  @ApiOperation({ summary: '获取图形验证码' })
  @Get('/verify-code') //当请求该接口时，返回一张随机图片验证码
  async getCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.createMathExpr({
      //可配置返回的图片信息
      size: 4, // 验证码长度
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
      noise: 2, // 干扰线条的数量
      width: 132,
      height: 40,
      fontSize: 50,
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#fff',
    });
    req.session.verifyCode = captcha.text; //使用session保存验证，用于登陆时验证
    // this.redisService.setValue(`code:${captcha.text}`, captcha.text, 60);
    res.set('Access-Control-Allow-Origin', '*'); // 允许所有域名进行跨域请求
    res.set('Cross-Origin-Opener-Policy', 'cross-origin');
    res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    // res.type('image/svg+xml'); //指定返回的类型
    res.type('svg');
    return await responseMessage(captcha.data); //给页面返回一张图片
  }

  @ApiOkResponse({ type: AuthLoginResponseVo })
  @ApiOperation({ summary: '用户注册' })
  @Post('register')
  async register(@Body() registerUser: AuthUserRegisterDto) {
    return this.authService.register(registerUser);
  }

  @ApiOkResponse({ type: ResponseVo<String> })
  @ApiOperation({ summary: '获取邮箱验证码' })
  @Get('register-email')
  async captcha(@Query('address') address: string) {
    const code = Math.random().toString().slice(2, 8);
    this.redisService.setValue(`captcha_${address}`, code, 5 * 60);
    await this.emailService.sendMail({
      to: address,
      subject: '注册验证码',
      html: `<p>你的注册验证码是 ${code}</p>`,
    });
    return responseMessage(null, null, '发送邮件成功');
  }

  // 登录
  @ApiOkResponse({
    type: AuthLoginResponseVo,
  })
  @ApiOperation({ summary: '获取登录后的用户权限信息' })
  @Post('login')
  async signin(
    @Body() authUserRegisterDto: AuthUserRegisterDto,
    @IpAddress() ip: string,
    @Session() session: SessionModel,
  ) {
    return this.authService.login(authUserRegisterDto, ip, session);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'token令牌',
  })
  @ApiOkResponse({
    type: AuthLoginResponseVo,
  })
  @ApiOperation({ summary: '刷新tpken' })
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(
    @Body() authRefreshTokenDto: AuthRefreshTokenDto,
    @Session() session: SessionModel,
  ) {
    return this.authService.refresh(authRefreshTokenDto.refreshToken, session);
  }
}
