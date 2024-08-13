import { createZustandStore } from "nes-zustand";
import { IAccountWallet, ISupportedChain } from "./type";

export const accountWalletState = createZustandStore<IAccountWallet | null>({
  key: "accountWalletState",
  default: null,
});

export const supportedChainsLoadingState = createZustandStore<boolean>({
  key: "supportedChainsLoadingState",
  default: false,
});

export const supportedChainsState = createZustandStore<ISupportedChain[]>({
  key: "supportedChainsState",
  default: [],
});
