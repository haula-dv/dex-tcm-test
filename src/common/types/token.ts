export interface ITokenParamsType {
  operationName: string;
  variables: {
    page?: number;
    pageSize?: number;
    orderBy?: string;
    chain?: string;
    address?: string | null;
  };
  query: string;
}
