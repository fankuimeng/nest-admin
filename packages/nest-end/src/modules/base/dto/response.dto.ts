import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { DATE_FORMATE } from 'src/typinng/enum';

export class BaseCreateDto {
  @ApiProperty({
    type: String,
    description: '名称',
    default: '',
  })
  name?: string;

  @ApiProperty({
    type: Number,
    description: '是否禁用',
    default: 1,
  })
  isDisable?: number;
}
export class BaseUpdateDto extends PartialType(BaseCreateDto) {
  @ApiProperty({
    type: Number,
    description: '是否删除',
    default: 1,
  })
  isDelete?: number;
}

export class BaseQueryDto extends BaseCreateDto {
  @ApiProperty({
    type: Number,
    description: 'id',
    default: 1,
  })
  id?: number;

  @ApiProperty({
    type: String,
    description: '创建人',
    default: '',
  })
  createBy?: String;
  @ApiProperty({
    type: String,
    description: '更新人',
    default: '',
  })
  updateBy?: String;

  @ApiProperty({
    type: String,
    description: '更新时间',
    default: dayjs().format(DATE_FORMATE.DATE),
  })
  updateTime?: String;

  @ApiProperty({
    type: String,
    description: '创建时间',
    default: dayjs().format(DATE_FORMATE.DATE),
  })
  createTime?: String;
}

export class ListBaseQueryDto extends BaseQueryDto {
  @ApiProperty({
    type: Number,
    description: '条数',
    default: 10,
  })
  pageSize?: number;

  @ApiProperty({
    type: Number,
    description: '当前页码',
    default: 1,
  })
  current?: number;
}
