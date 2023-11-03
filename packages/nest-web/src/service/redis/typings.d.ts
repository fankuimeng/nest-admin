declare namespace NESTADMIN {
  type RedisControllerDelValueParams = {
    key: string;
  };

  type RedisControllerGetAllHashFieldsParams = {
    key: string;
  };

  type RedisControllerGetHashFieldParams = {
    key: string;
    field: string;
  };

  type RedisControllerGetValueParams = {
    key: string;
  };

  type RedisControllerSetHashFieldParams = {
    key: string;
    field: string;
    value: string;
  };

  type RedisControllerSetKeyParams = {
    key: string;
    value: string;
  };
}
