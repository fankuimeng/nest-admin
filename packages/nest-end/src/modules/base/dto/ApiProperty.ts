import {
  ApiPropertyOptions,
  ApiProperty as SwaggerApiProperty,
} from '@nestjs/swagger';
import { BASE_REQUEST_DTO, BASE_RESPONSE_VO } from 'src/typinng/enum';
import { SwaggerDecoratorArgsType } from 'src/typinng/global';

export const ApiProperty = (
  options: ApiPropertyOptions & SwaggerDecoratorArgsType,
) => {
  // ts-ignore
  const newOptions = {};
  // @ts-ignore
  options.BaseResponseVo?.forEach((item) => {
    newOptions[BASE_RESPONSE_VO[item]] = true;
  });
  // @ts-ignore
  options.BaseRequestDto?.forEach((item) => {
    newOptions[BASE_REQUEST_DTO[item]] = true;
  });
  // @ts-ignore
  delete options.BaseRequestDto;
  // @ts-ignore
  delete options.BaseResponseVo;

  return SwaggerApiProperty(
    Object.assign({ readOnly: true }, {
      ...options,
      ...newOptions,
    } as ApiPropertyOptions),
  );
};

export const ApiAllPropert = (
  options?: ApiPropertyOptions & SwaggerDecoratorArgsType,
) => {
  return ApiProperty({
    type: Number,
    // @ts-ignore
    BaseResponseVo: ['PAGE', 'CHECK', 'ALL', 'UPDATE', 'DETAIL', 'CREATE'],
    // @ts-ignore
    BaseRequestDto: ['ALL', 'PAGE', 'CHECK', 'CREATE', 'DETAIL', 'UPDATE'],
    ...(options || {}),
  });
};

export const ApiCommonPropert = (
  options?: ApiPropertyOptions & SwaggerDecoratorArgsType,
) => {
  return ApiProperty({
    type: String,
    // @ts-ignore
    BaseRequestDto: ['ALL', 'PAGE'] as any, // @ts-ignore
    // @ts-ignore
    BaseResponseVo: ['ALL', 'PAGE', 'CHECK', 'CREATE', 'DETAIL', 'UPDATE'], // @ts-ignore
    ...(options || {}),
  });
};

// 更新创建
export const ApiUpdatePropert = (
  options?: ApiPropertyOptions & SwaggerDecoratorArgsType,
) => {
  return ApiProperty({
    type: String,
    // @ts-ignore
    BaseRequestDto: ['ALL', 'PAGE', 'UPDATE', 'CREATE'],
    // @ts-ignore
    BaseResponseVo: ['ALL', 'PAGE', 'CHECK', 'CREATE', 'DETAIL', 'UPDATE'],
    ...(options || {}),
  });
};
