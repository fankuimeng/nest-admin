import { ListBaseQueryDto } from 'src/modules/base/dto/request.dto';
import { BaseEntities } from 'src/modules/base/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { BASE_REQUEST_DTO, BASE_RESPONSE_VO } from './enum';

/**
 * @description: 动态对象属性
 * @return {*}
 
 */
export type ResData = Record<string, any>;

/**
 * @description: 分页查询
 * @return {*}
 */

export type PageResModel<T> = {
  records: Array<T>;
  current: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

export type PageClassType<T> = new (
  args: Omit<PageResModel<T>, 'pageCount'>,
) => PageResModel<T>;

/**
 * @description: Response 返回体，默认是不分页，如果是分页查询，需要自己将 Model 带入
 * @return {*}
 
 */
export type ResponseModel<T = ResData[]> = {
  code?: number;
  data: T;
  msg?: string | string[];
  logContent?: string;
};

/**
 * @description: Session 存储对象
 * @return {*}
 
 */
export type SessionModel = {
  currentUserInfo: User; // 用户信息
  verifyCode: string; // 验证码
};

export type InstanceEntities<T, U = BaseEntities> = Partial<T> & Partial<U>;
export type PageQueryType<T, U = object> = ListBaseQueryDto &
  InstanceEntities<T> &
  U;

// 获取基础的类型



//  所有value的集合
// export type SwaggerDecoratorArgsType =  BASE_REQUEST_DTO | BASE_RESPONSE_VO




export type SwaggerDecoratorArgsType = { BaseRequestDto?: (keyof typeof BASE_REQUEST_DTO)[]; BaseResponseVo?: (keyof typeof BASE_RESPONSE_VO)[] }

// type AllRequestAndResponse = {
//   [K in RequestAndResponseArray]: K;
// }

// export type SwaggerDecoratorArgsType = Array<typeof BASE_REQUEST_DTO[keyof typeof BASE_REQUEST_DTO] | typeof BASE_RESPONSE_VO[keyof typeof BASE_RESPONSE_VO]>;


