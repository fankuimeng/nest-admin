import { BusinessException } from 'src/filter/business.exception';
import { responseMessage } from 'src/utils';
import { EntityManager, EntityTarget, Repository } from 'typeorm';

export type TransactionRepositoryOptions<T = {}> = T & {
  successCallback?: (result?: any) => any;
  errorCallback?: (error?: any) => any;
  finallyCallback?: () => void;
  errorMsg?: string;
  errorLog?: string;
  successLog?: string;
  errorCode?: number;
  successCode?: number;
  successMsg?: string;
};

export type GetRepositoryTransactionReturnType<T> = <U = any>(
  connectionTransaction: (entityManager: Repository<T>) => Promise<U>,
  options?: TransactionRepositoryOptions,
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
      const result = await queryRunnerCallback(repository);
      await queryRunner.commitTransaction();
      const res = options?.successCallback
        ? options?.successCallback?.(result)
        : options.successMsg
        ? responseMessage(
            result,
            options.successLog,
            options.successMsg,
            options.successCode,
          )
        : result;
      return res;
    } catch (error) {
      const errorCallbackResult = options?.errorCallback?.(error) || {
        msg: options?.errorMsg,
        code: options?.errorCode || -1,
      };
      await queryRunner.rollbackTransaction();
      throw new BusinessException(
        errorCallbackResult.msg || error.message,
        errorCallbackResult?.code,
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
