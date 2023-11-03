declare namespace NESTADMIN {
  type CommonControllerDelValueParams = {
    key: string;
  };

  type CommonControllerGetAllHashFieldsParams = {
    key: string;
  };

  type CommonControllerGetHashFieldParams = {
    key: string;
    field: string;
  };

  type CommonControllerGetValueParams = {
    key: string;
  };

  type CommonControllerSetHashFieldParams = {
    key: string;
    field: string;
    value: string;
  };

  type CommonControllerSetKeyParams = {
    key: string;
    value: string;
  };
}
