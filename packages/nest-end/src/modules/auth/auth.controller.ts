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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { responseMessage } from 'src/utils';
import { VerifyCodeResponseDto } from './dto';
import * as svgCaptcha from 'svg-captcha';
import { RedisService } from '../redis/redis.service';
import { User } from '../user/entities/user.entity';
import { RES_CODE, RES_MSG } from 'src/typinng/enum';

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
  ) {}

  // 登录
  @Post('signin')
  async signin(@Body() userInfo: Partial<User>) {
    const { nickname, password } = userInfo;
    const data = await this.authService.signin(nickname, password);
    return responseMessage({ data, msg: '用户登录成功' });
  }
  //   @Get()
  //   findAll() {
  //     return this.authService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.authService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //     return this.authService.update(+id, updateAuthDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.authService.remove(+id);
  //   }

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

    return responseMessage(captcha.data, '请求验证码'); //给页面返回一张图片
  }
}
