import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { DATE_FORMATE } from 'src/typinng/enum';
import { updateClass } from 'src/utils';

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

export const generateBaseRequestDto = <T>(entity: new () => T): any => {
  const name = entity.name;

  const PageRequestDtoClass = () => {
    class PageRequestDto extends ListBaseQueryDto {
      constructor(...args: any[]) {
        super();
        // 在构造函数中调用 entity 类的构造函数
        entity.apply(this, args);
      }
      // 可以添加额外的属性或方法
    }
    // 将 entity 类的原型链连接到 PageRequestDto 类的原型链上
    Object.setPrototypeOf(PageRequestDto, entity);

    return PageRequestDto;
  };

  // 创建
  class CreateRequestDto extends (PartialType(entity) as any) {}
  const PageRequestDto = PageRequestDtoClass();
  class UpdateRequestDto extends (PartialType(entity) as any) {}
  class BatchDeleteRequestDto {
    @ApiProperty({
      type: [Number],
      description: 'id',
      example: [1, 2],
    })
    ids: number[];
  }

  // PAGE = 'PageRequestDto',
  // CREATE = 'CreateRequestDto',
  // DETAIL = 'DetailRequestDto',
  // CHECK = 'CheckRequestDto',
  // ALL = 'AllRequestDto',
  // UPDATE = 'UpdateRequestDto',
  // DELETE = 'DeleteRequestDto',
  // DELETE_BATCH = 'BatchDeleteRequestDto',

  return updateClass(
    [PageRequestDto, CreateRequestDto, UpdateRequestDto, BatchDeleteRequestDto],
    name,
  );
};
