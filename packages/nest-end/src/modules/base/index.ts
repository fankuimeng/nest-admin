import { HttpException } from '@nestjs/common';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

export type GetRepositoryTransactionReturnType<T> = <U>(
  connectionTransaction: (entityManager: Repository<T>) => Promise<U>,
  options?: {
    successCallback?: () => void;
    errorCallback?: (error?: any) => any;
    finallyCallback?: () => void;
  },
) => Promise<U>;

//  抛错自动事务回滚
export const getRepositoryTransaction = async <T>(
  manager: EntityManager,
  entity: EntityTarget<T>,
): Promise<GetRepositoryTransactionReturnType<T>> => {
  return Promise.resolve(async (queryRunnerCallback, options) => {
    const repository = manager.getRepository(entity);
    const queryRunner = manager.connection.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const result = queryRunnerCallback(repository);
      await queryRunner.commitTransaction();
      options?.successCallback?.();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const errorCallbackResult = options?.errorCallback?.();
      throw new HttpException(
        errorCallbackResult?.msg || '数据库异常',
        errorCallbackResult?.code || -1,
      );
    } finally {
      await queryRunner.release();
      options?.finallyCallback?.();
    }
  });
};



//  手动动事务回滚
// export const getConnectionTransaction = async <T>(
//   entity?: EntityTarget<T>,
// ): Promise<QueryRunner | GetRepositoryTransactionReturnType<T>> => {
//   const connection = getConnection();
//   const connectionTransaction = connection.createQueryRunner();
//   await connectionTransaction.connect();

//   if (!entity) {
//     return Promise.resolve(connectionTransaction);
//   } else
//     return Promise.resolve(async (queryRunnerCallback) => {
//       await connectionTransaction.startTransaction();
//       try {
//         const repository = connectionTransaction.manager.getRepository(entity);
//         const result = await queryRunnerCallback(repository);
//         await connectionTransaction.commitTransaction();
//         return result;
//       } catch (error) {
//         throw new HttpException('数据库异常', -1);
//       }
//     });
// };
