import { HttpException } from '@nestjs/common';
import { RES_CODE, RES_MSG } from 'src/typinng/enum';
import { ResponseModel } from 'src/typinng/global';
import {
  Connection,
  EntityManager,
  EntityTarget,
  QueryRunner,
  Repository,
  getConnection,
  getConnectionManager,
} from 'typeorm';

/**
 * @description: 统一返回体
 * @return {*}
 */
export const responseMessage = (
  data = {},
  msg: string = RES_MSG.SUCCESS,
  code: number = RES_CODE.SUCCESS,
): ResponseModel<any> => {
  return { data, msg, code };
};

//  抛错自动事务回滚
export const getRepositoryTransaction = async <T>(
  manager: EntityManager,
  entity: EntityTarget<T>,
): Promise<
  (
    queryRunnerCallback: (
      connectionTransaction: Repository<T>,
    ) => ResponseModel<T>,
  ) => ResponseModel<T>
> => {
  return manager.transaction((entityManager) => {
    return Promise.resolve(
      (
        queryRunnerCallback: (
          connectionTransaction: Repository<T>,
        ) => ResponseModel<T>,
      ) => {
        try {
          const {
            data,
            code = 200,
            msg = '数据操作成功',
          } = queryRunnerCallback(entityManager.getRepository(entity));
          return responseMessage(data, msg, code);
        } catch (error) {
          new Excep();
        }
      },
    );
  });
};

//  手动动事务回滚
export const getConnectionTransaction = async <T = any>(
  queryRunnerCallback: (connectionTransaction: QueryRunner) => ResponseModel<T>,
): Promise<ResponseModel<T>> => {
  const connection = getConnection();
  const connectionTransaction = connection.createQueryRunner();
  await connectionTransaction.connect();
  await connectionTransaction.startTransaction();
  try {
    const {
      data,
      code = 200,
      msg = '数据操作成功',
    } = queryRunnerCallback(connectionTransaction);
    await connectionTransaction.commitTransaction();
    return responseMessage(data, msg, code);
  } catch (error) {
    return responseMessage(-1, '操作数据库失败');
  }
};
