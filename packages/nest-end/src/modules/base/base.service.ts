// BaseService.ts
import {
  Repository,
  DeleteResult,
  SaveOptions,
  RemoveOptions,
  FindOneOptions,
  FindOptionsWhere,
  FindManyOptions,
  ObjectId,
  SelectQueryBuilder,
  UpdateResult,
  ObjectLiteral,
  EntityManager,
  EntityTarget,
} from 'typeorm';
import {
  InstanceEntities,
  PageQueryType,
  PageResModel,
} from 'src/typinng/global';

import {
  GetRepositoryTransactionReturnType,
  TransactionRepositoryOptions,
  getRepositoryTransaction,
} from '.';
import { generatePageResponseVo } from './dto/response.vo';

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

export const generateBaseService = (type: string): any => {};

export abstract class BaseService<T extends ObjectLiteral> {
  transactionRepository: GetRepositoryTransactionReturnType<T>;
  repository: Repository<T>;
  constructor(
    manager: EntityManager,
    readonly entity: new () => T,
  ) {
    this.repository = manager.getRepository(entity);
    getRepositoryTransaction<T>(manager, entity).then(
      (transactionRepository) => {
        this.transactionRepository = transactionRepository;
      },
    );
  }
  /**
   * 构造查询条件的钩子函数
   * @param query
   */
  abstract generateWhere(
    query: PageQueryType<T>,
    qb: SelectQueryBuilder<T>,
  ): void;

  async saveOne(
    entity: Partial<T>,
    options?: SaveOptions & TransactionRepositoryOptions,
  ): Promise<Partial<T>> {
    return this.transactionRepository(async (entityManager) => {
      const data = entityManager.save(
        this.repository.create(entity as T),
        options,
      );
      return Promise.resolve(data);
    }, options);
  }

  async page(query: PageQueryType<T>): Promise<PageResModel<T>> {
    const Page = generatePageResponseVo(this.entity);
    //  因为我需要的功能用mapper.find实现不了，所以采用createQueryBuilder
    let queryBuilder = this.repository.createQueryBuilder('t');
    this.generateWhere(query, queryBuilder);
    const { current, pageSize } = query;
    queryBuilder = queryBuilder.skip((current - 1) * pageSize).take(pageSize);
    const [records, total] = await queryBuilder.getManyAndCount();
    return new Page({ current, pageSize, total, records });
  }

  async saveMany(
    entities: Partial<T>[],
    options?: SaveOptions & TransactionRepositoryOptions,
  ): Promise<T[]> {
    return this.transactionRepository(async (entityManager) => {
      const data = entityManager.save(
        this.repository.create(entities as T[]),
        options,
      );
      return Promise.resolve(data);
    }, options);
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

  // remove  和delete 区别：remove 查询数据在删除 删除级联关系,delete直接删表
  async delete(options?: ConditionsType<T>): Promise<DeleteResult> {
    return this.repository.delete(options);
  }

  async update(conditions: ConditionsType<T>, newValue: any): Promise<number> {
    let updateResult = 1;
    await this.repository
      .update(conditions, newValue as any)
      .catch((e) => (updateResult = 0));
    return updateResult;
  }

  // 批量逻辑删除
  async batchDelete(ids: number[], partialEntity: any): Promise<UpdateResult> {
    // for循环 - 修改标记字段
    return await this.repository.update(ids, partialEntity);
  }
}
