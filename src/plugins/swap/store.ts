import { ITokenType } from "@/common";
import { createZustandStore } from "nes-zustand";

export const isTransactionSubmittedState = createZustandStore<boolean>({
  key: "isTransactionSubmittedState",
  default: false,
});

export const tokenInputState = createZustandStore<ITokenType | null>({
  key: "tokenInputState",
  default: null,
});

export const tokenOutputState = createZustandStore<ITokenType | null>({
  key: "tokenOutputState",
  default: null,
});
