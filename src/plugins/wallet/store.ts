import { TLocalStorage } from "@/utils/constants/localstorage";
import { createZustandStore } from "nes-zustand";
import { IAccountWallet } from "./type";

const accountWallet =
  typeof window == "object" &&
  localStorage.getItem(TLocalStorage.DEX_ORDERLY_MAINNET_WALLET_KEY);
const parseAccountWallet = accountWallet ? JSON.parse(accountWallet) : null;

export const accountWalletState = createZustandStore<IAccountWallet | null>({
  key: "accountWalletState",
  default: parseAccountWallet != null ? parseAccountWallet : null,
});
