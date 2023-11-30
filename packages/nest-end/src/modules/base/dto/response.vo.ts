import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { BASE_RESPONSE_VO } from 'src/typinng/enum';
import { PageClassType, PageResModel } from 'src/typinng/global';
import { updateClass } from 'src/utils';
import { CustomType } from 'src/utils/handlClass';

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

export const generatePageResponseVo = <T>(
  entity: new () => T,
): PageClassType<T> => {
  const name = entity.name;
  const key = `${name}PageVo`;
  const dataKey = `${name}PageDataVo`;
  let obj = {
    [dataKey]: class extends CustomType(entity, BASE_RESPONSE_VO.PAGE) {},
  };
  class PageResponseVo {
    @ApiProperty({
      type: [obj[dataKey]],
      description: `${name}模块-分页数据`,
      default: {},
    })
    records: Array<T>;

    @ApiProperty({
      type: Number,
      description: `${name}模块-当前页`,
      default: {},
    })
    current: number;

    @ApiProperty({
      type: Number,
      description: `${name}模块-分页大小`,
      default: {},
    })
    pageSize: number;

    @ApiProperty({
      type: Number,
      description: `${name}模块-分页数`,
      default: {},
    })
    total: number;
    @ApiProperty({
      type: Number,
      description: `${name}模块-分页数`,
      default: {},
    })
    pageCount: number;
    constructor(args: Omit<PageResModel<T>, 'pageCount'>) {
      this.current = args.current;
      this.pageSize = args.pageSize;
      this.total = args.total;
      this.records = args.records;
      this.pageCount = Math.ceil(args.total / args.pageSize);
    }
  }
  obj = {
    [key]: class extends PageResponseVo {},
  } as any;
  return obj[key] as unknown as PageClassType<T>;
};

export const generateBaseResponseVo = <T>(entity: new () => T) => {
  const name = entity.name;
  // 分页
  class PageResponseVo extends ResponseVo {
    @ApiProperty({
      type: generatePageResponseVo(entity),
      description: `${name}模块-分页响应体`,
    })
    data?: T;
  }
  // 创建
  class CreateResponseVo extends ResponseVo {
    @ApiProperty({
      type: Number,
      description: `${name}模块-创建响应体`,
      default: {},
    })
    data?: Partial<T>;
  }

  // 详情
  class DetailResponseVo extends ResponseVo {
    @ApiProperty({
      type: CustomType(entity, BASE_RESPONSE_VO.DETAIL),
      description: `${name}模块-查看详情响应体`,
      default: {},
    })
    data?: Partial<T>;
  }

  // 更新
  class UpdateResponseVo extends ResponseVo {
    @ApiProperty({
      type: [Number],
      description: `${name}模块-批量更新数据`,
      default: {},
    })
    data?: Array<Partial<T>>;
  }

  // 所有数据不分页
  class AllResponseVo extends ResponseVo {
    @ApiProperty({
      type: [class extends CustomType(entity, BASE_RESPONSE_VO.ALL) {}],
      description: `${name}模块-所有数据-不分页响应体`,
      default: {},
    })
    data?: Array<T>;
  }

  // 删除
  class DeleteResponseVo extends ResponseVo {
    @ApiProperty({
      type: Number,
      description: `${name}模块-删除数据`,
      default: {},
    })
    data?: number;
  }

  // 批量删除
  class BatchDeleteResponseVo extends ResponseVo {
    @ApiProperty({
      type: [Number],
      isArray: true,
      description: `${name}模块-批量删除所有的数据`,
      default: {},
    })
    data?: number[];
  }

  return updateClass(
    [
      PageResponseVo,
      DetailResponseVo,
      UpdateResponseVo,
      AllResponseVo,
      DeleteResponseVo,
      BatchDeleteResponseVo,
      CreateResponseVo,
      AllResponseVo,
    ],
    name,
  );
};
