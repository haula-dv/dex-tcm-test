export interface IExchangePrice {
  chain: string;
  account: string;
  inTokenAddress: string;
  outTokenAddress: string;
  isExactIn: boolean;
  slippage: number;
  inTokenAmount: string;
}
