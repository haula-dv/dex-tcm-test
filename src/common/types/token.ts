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

export interface ITokenType {
  id: string;
  address: string;
  chain: string;
  symbol: string;
  name: string;
  decimals: number;
  standard: string;
  project: Project;
  __typename: string;
}
export interface Project {
  id: string;
  name: string;
  logo: Logo;
  safetyLevel: string;
  logoUrl: string;
  isSpam: boolean;
  __typename: string;
}

export interface Logo {
  id: string;
  url: string;
  __typename: string;
}
