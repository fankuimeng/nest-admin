import { ApiProperty } from '@nestjs/swagger';
import { PageResModel } from 'src/typinng/global';

export class ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {},
  })
  data: any;

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

export class UpdateResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: [1],
  })
  data: PageResModel<number[]>;
}

export class DeleteResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: 1,
  })
  data: PageResModel<number>;
}
