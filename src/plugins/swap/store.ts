import { ITokenType } from "@/common";
import { createZustandStore } from "nes-zustand";

export const isTransactionSubmittedState = createZustandStore<boolean>({
  key: "isTransactionSubmittedState",
  default: false,
});

export const tokenInputState = createZustandStore<ITokenType | null>({
  key: "tokenInputState",
  default: {
    token: "ETH",
    token_account_id: "aurora",
    decimals: 18,
    minimum_increment: 0.00000001,
  },
});

export const tokenOutputState = createZustandStore<ITokenType | null>({
  key: "tokenOutputState",
  default: null,
});
