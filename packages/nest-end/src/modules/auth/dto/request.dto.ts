import { ApiProperty } from '@nestjs/swagger';

export class AuthUserLoginDto {
  @ApiProperty({
    type: String,
    description: '用户名',
    default: '',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: '',
  })
  password?: string;

  @ApiProperty({
    type: String,
    description: '图形验证码',
    default: 6389,
  })
  captcha?: string;

  @ApiProperty({
    type: Number,
    description: '邮箱验证码',
    default: '638963',
  })
  email?: string;
}

export class AuthUserRegisterDto extends AuthUserLoginDto {
  @ApiProperty({
    type: Number,
    description: '是否为管理员',
    default: 1,
  })
  isAdmin?: number;
}

export class AuthRefreshTokenDto {
  @ApiProperty({
    type: String,
    description: '密码',
    default: '',
  })
  refreshToken?: string;
}
