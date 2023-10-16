// BaseService.ts
import {
  Repository,
  DeleteResult,
  SaveOptions,
  RemoveOptions,
  FindOperator,
  FindOneOptions,
  FindOptionsWhere,
  FindManyOptions,
  ObjectId,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Global, Injectable } from '@nestjs/common';
import { InstanceEntities, PageQueryType } from 'src/typinng/global';
import Page from 'src/common/Page';

export type ConditionsType<T> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<T>;

/**
 * 服务基类,实现一些共有的基本方法,这样就不用每个服务类在写一遍了,直接继承该类即可
 *
 */

export abstract class BaseService<T> {
  constructor(readonly repository: Repository<T>) {}
  /**
   * 构造查询条件的钩子函数
   * @param query
   */
  abstract generateWhere(
    query: PageQueryType<T>,
    qb: SelectQueryBuilder<T>,
  ): void;

  async saveOne(entity: T, options?: SaveOptions): Promise<T> {
    return this.repository.save(entity, options);
  }

  async page(query: PageQueryType<T>): Promise<Page<T>> {
    // // 因为我需要的功能用mapper.find实现不了，所以采用createQueryBuilder
    let queryBuilder = this.repository.createQueryBuilder('t');
    // // 引用传递
    this.generateWhere(query, queryBuilder);
    const { current, pageSize } = query;
    queryBuilder = queryBuilder.skip((current - 1) * pageSize).take(pageSize);
    const [records, total] = await queryBuilder.getManyAndCount();
    return new Page(current, pageSize, total, records);
  }

  async saveMany(entities: T[], options?: SaveOptions): Promise<T[]> {
    return this.repository.save(entities, options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }
  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async removeOne(entity: T, options?: RemoveOptions): Promise<T> {
    return this.repository.remove(entity, options);
  }

  async removeMany(entities: T[], options?: RemoveOptions): Promise<T[]> {
    return this.repository.remove(entities, options);
  }

  async delete(options?: ConditionsType<T>): Promise<DeleteResult> {
    return this.repository.delete(options);
  }

  async update(
    conditions: ConditionsType<T>,
    newValue: QueryDeepPartialEntity<T>,
  ): Promise<number> {
    let updateResult = 1;
    await this.repository
      .update(conditions, newValue)
      .catch((e) => (updateResult = 0));
    return updateResult;
  }

  // 批量逻辑删除
  async batchDelete(
    ids: number[],
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    // for循环 - 修改标记字段
    return await this.repository.update(ids, partialEntity);
  }
}
