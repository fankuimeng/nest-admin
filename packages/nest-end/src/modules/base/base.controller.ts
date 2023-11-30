import {
  ArgumentMetadata,
  Body,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  SetMetadata,
  UseGuards,
  ValidationPipe as ValidationPipe1,
} from '@nestjs/common';
import {
  InstanceEntities,
  PageQueryType,
  PageResModel,
} from 'src/typinng/global';
import { BaseService } from './base.service';
import { AuthLoginResponseVo } from '../auth/dto/response.vo';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { generateBaseResponseVo } from './dto/response.vo';
import { BASE_REQUEST_DTO, BASE_RESPONSE_VO } from 'src/typinng/enum';
import { generateBaseRequestDto } from './dto/request.dto';
import { ApiProperty } from './dto/ApiProperty';
import { ValidationPipe } from 'src/pipe';
import { IsEmail, IsString } from 'class-validator';

type BaseController<T> = {
  page(query?: PageQueryType<InstanceEntities<T>>): Promise<any>;
  create(createUserDto: any): Promise<any>;
  findAll(): Promise<any>;
  findOne(id: number): Promise<any>;
  update(id: number, updateUserDto: any): Promise<any>;
  remove(id: number): Promise<any>;
  batchDelete(ids: number[]): Promise<any>;
};

export function generateDtoClass(dtoProperties: Record<string, any>): any {
  const dynamicDtoClass = class {};

  for (const key in dtoProperties) {
    if (dtoProperties.hasOwnProperty(key)) {
      const value = dtoProperties[key];
      ApiProperty({ required: value.required })(dynamicDtoClass.prototype, key);
    }
  }

  return dynamicDtoClass;
}

class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
// const CreateUserDto = generateDtoClass(dtoProperties);

export const generateBaseController = <T>(
  entity: new () => T,
): new <T>(service: BaseService<T>) => BaseController<T> => {
  const name = entity.name;

  const baseResponseVo = generateBaseResponseVo(entity);
  const baseRequestDto = generateBaseRequestDto(entity);

  class BaseController<T> {
    constructor(private readonly service: BaseService<T>) {}

    @ApiOkResponse({ type: baseResponseVo[`${name}${BASE_RESPONSE_VO.PAGE}`] })
    @ApiOperation({ summary: `${name}模块-分页列表` })
    @ApiQuery({
      type: baseRequestDto[`${name}${BASE_REQUEST_DTO.PAGE}`],
    })
    @Get('page')
    async page(
      @Query() query?: PageQueryType<T>,
    ): Promise<PageResModel<InstanceEntities<T>>> {
      return await this.service.page(query as any);
    }

    @ApiOkResponse({
      type: baseResponseVo[`${name}${BASE_RESPONSE_VO.CREATE}`],
    })
    @ApiOperation({ summary: `${name}模块-创建` })
    @ApiBody({
      type: baseRequestDto[`${name}${BASE_REQUEST_DTO.CREATE}`],
    })
    @Post()
    async create(
      @Body()
      createDto: InstanceEntities<T>,
    ) {
      const validationPipe = new ValidationPipe();
      await validationPipe.transform(createDto, {
        metatype: baseRequestDto[`${name}${BASE_REQUEST_DTO.CREATE}`],
      } as ArgumentMetadata);
      return this.service.saveOne(createDto);
    }

    @ApiOkResponse({ type: baseResponseVo[`${name}${BASE_RESPONSE_VO.ALL}`] })
    @ApiOperation({ summary: `${name}模块-获取所有的数据` })
    @Get()
    async findAll() {
      return this.service.findAll();
    }

    @ApiOkResponse({
      type: baseResponseVo[`${name}${BASE_RESPONSE_VO.DETAIL}`],
    })
    @ApiOperation({ summary: `${name}模块-获取详情` })
    @Get(':id')
    async findOne(@Param('id') id: number) {
      return this.service.findOne();
    }

    @ApiOkResponse({
      type: baseResponseVo[`${name}${BASE_RESPONSE_VO.UPDATE}`],
    })
    @ApiOperation({ summary: `${name}模块-更新数据` })
    @ApiBody({
      type: baseRequestDto[`${name}${BASE_REQUEST_DTO.UPDATE}`],
    })
    @Patch(':id')
    async update(
      @Param('id') id: number,
      @Body() updateUserDto: InstanceEntities<T>,
    ) {
      return this.service.update(id, updateUserDto);
    }

    @ApiOkResponse({
      type: baseResponseVo[`${name}${BASE_RESPONSE_VO.DELETE}`],
    })
    @ApiOperation({ summary: `${name}模块-删除数据` })
    @Delete(':id')
    async remove(@Param('id') id: number) {
      return this.service.delete(+id);
    }

    @ApiOkResponse({
      type: baseResponseVo[`${name}${BASE_RESPONSE_VO.DELETE_BATCH}`],
    })
    @ApiOperation({ summary: `${name}模块-批量删除数据` })
    @ApiBody({
      type: baseRequestDto[`${name}${BASE_REQUEST_DTO.DELETE_BATCH}`],
    })
    @Delete('batch')
    async batchDelete(@Body('ids') ids: number[]) {
      return this.service.batchDelete(ids, { isDelete: 1 } as object);
    }
  }
  return BaseController as new <T>(
    service: BaseService<T>,
  ) => BaseController<T>;
};
