import {
  Body,
  Controller,
  Delete,
  Get,
  Global,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { InstanceEntities, PageQueryType } from 'src/typinng/global';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import Page from 'src/common/Page';
import { BaseService } from './base.service';

export class BaseController<T> {
  constructor(private readonly service: BaseService<T>) {}

  @Get('page')
  async page(
    @Query() query: PageQueryType<InstanceEntities<T>>,
  ): Promise<Page<InstanceEntities<T>>> {
    return await this.service.page(query);
  }
  @Post()
  async create(@Body() createUserDto: InstanceEntities<T>) {
    return this.service.saveOne(createUserDto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne();
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateUserDto: QueryDeepPartialEntity<InstanceEntities<T>>,
  // ) {
  //   return this.service.update(id, updateUserDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.service.delete(+id);
  }

  @Delete(':ids')
  async batchDelete(@Param('ids') ids: number[]) {
    return this.service.batchDelete(ids, { isDelete: 1 } as object);
  }
}
