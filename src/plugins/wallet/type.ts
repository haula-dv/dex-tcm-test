import type { TokenSymbol } from "@web3-onboard/common";
export interface IAccountWallet {
  address: string;
  balance: Record<TokenSymbol, string> | null;
  ens: { name: string | undefined; avatar: string | undefined };
}

export interface ISupportedChain {
  name: string;
  public_rpc_url: string;
  chain_id: string;
  currency_symbol: string;
  explorer_base_url: string;
  vault_address: string;
  broker_ids: string[];
}
