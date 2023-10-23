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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responseMessage } from 'src/utils';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from '../redis/redis.service';
import { User } from '../user/entities/user.entity';
import { EmailService } from '../common/email.service';
import {
  AdminLoginResponseDto,
  LoginDto,
  UserLoginDto,
  UserRegisterDto,
  VerifyCodeResponseDto,
} from './typing/user';
import { ResponseDto } from 'src/dto/response.dto';

@ApiTags('用户登录模块')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOkResponse({ type: VerifyCodeResponseDto })
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

  @Post('register')
  async register(@Body() registerUser: UserRegisterDto) {
    return this.authService.register(registerUser);
  }

  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '获取邮箱验证码' })
  @Get('register-captcha')
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
  @ApiOkResponse({ type: AdminLoginResponseDto })
  @ApiOperation({ summary: '获取登录后的用户权限信息' })
  @Post('login')
  async signin(@Body() userInfo: UserLoginDto) {
    return this.authService.login(userInfo);
  }

  @Get('refresh')
  async refresh(@Query('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
