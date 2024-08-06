export interface ITokenValue {
  token: {
    name: string;
    symbol: string;
    image: string;
  } | null;
  amount: number;
}
