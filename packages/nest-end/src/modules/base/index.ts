import { HttpException } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository,
  getConnection,
} from 'typeorm';

export type GetRepositoryTransactionReturnType<T> = <U>(
  connectionTransaction: (Repository: Repository<T>) => Promise<U>,
) => Promise<U>;

//  抛错自动事务回滚
export const getRepositoryTransaction = async <T>(
  manager: EntityManager,
  entity: EntityTarget<T>,
): Promise<GetRepositoryTransactionReturnType<T>> => {
  return manager.transaction((entityManager) => {
    return Promise.resolve(async (queryRunnerCallback) => {
      try {
        const repository = entityManager.getRepository(entity);
        return queryRunnerCallback(repository);
      } catch (error) {
        throw new HttpException('数据库异常', -1);
      }
    });
  });
};

//  手动动事务回滚
export const getConnectionTransaction = async <T>(
  entity?: EntityTarget<T>,
): Promise<QueryRunner | GetRepositoryTransactionReturnType<T>> => {
  const connection = getConnection();
  const connectionTransaction = connection.createQueryRunner();
  await connectionTransaction.connect();

  if (!entity) {
    return Promise.resolve(connectionTransaction);
  } else
    return Promise.resolve(async (queryRunnerCallback) => {
      await connectionTransaction.startTransaction();
      try {
        const repository = connectionTransaction.manager.getRepository(entity);
        const result = await queryRunnerCallback(repository);
        await connectionTransaction.commitTransaction();
        return result;
      } catch (error) {
        throw new HttpException('数据库异常', -1);
      }
    });
};
