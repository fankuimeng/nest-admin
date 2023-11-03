import { ApiProperty } from '@nestjs/swagger';

export class ResponseVo<T = any> {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {},
  })
  data?: T;

  @ApiProperty({
    type: String,
    description: '响应信息',
    default: '操作成功！',
  })
  msg: string;

  @ApiProperty({
    type: Number,
    description: '状态码',
    default: 200,
  })
  code: number;
}
