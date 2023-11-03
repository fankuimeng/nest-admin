import { BaseQueryDto } from 'src/modules/base/dto/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LogsQueryDto extends BaseQueryDto {
  @ApiProperty({
    type: String,
    description: '开始时间',
    default: '2023-06-08 12:25:36',
  })
  start_time?: string;

  @ApiProperty({
    type: String,
    description: '结束时间',
    default: '2023-06-08 12:25:36',
  })
  end_time?: string;
}
