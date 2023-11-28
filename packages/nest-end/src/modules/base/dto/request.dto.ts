import {
  ApiProperty,
  PartialType,
  IntersectionType,
  PickType,
} from '@nestjs/swagger';
import { Type } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { BASE_REQUEST_DTO, DATE_FORMATE } from 'src/typinng/enum';
import { updateClass } from 'src/utils';
import { CustomType } from 'src/utils/handlClass';

export class ListBaseQueryDto {
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

export const generateBaseRequestDto = <T>(entity: new () => T): any => {
  const name = entity.name;
  const partialType = PartialType(entity);
  class PageRequestDto extends IntersectionType(
    ListBaseQueryDto,
    CustomType(partialType, BASE_REQUEST_DTO.PAGE),
  ) {}
  class CreateRequestDto extends CustomType(
    partialType,
    BASE_REQUEST_DTO.CREATE,
  ) {}
  class UpdateRequestDto extends CustomType(
    partialType,
    BASE_REQUEST_DTO.UPDATE,
  ) {}
  class BatchDeleteRequestDto {
    @ApiProperty({
      type: [Number],
      description: 'id',
      example: [1, 2],
    })
    ids: number[];
  }
  return updateClass(
    [PageRequestDto, CreateRequestDto, UpdateRequestDto, BatchDeleteRequestDto],
    name,
  );
};
