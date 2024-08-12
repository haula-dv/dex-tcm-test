import { ITokenType } from "@/common/types";
import { createZustandStore } from "nes-zustand";

export const tokenParamsState = createZustandStore<any>({
  key: "tokenParamsState",
  default: {},
});

export const tokensState = createZustandStore<ITokenType[]>({
  key: "tokensState",
  default: [],
});

export const tokensSearchState = createZustandStore<ITokenType[]>({
  key: "tokensSearchState",
  default: [],
});

export const isTokenSearchState = createZustandStore<boolean>({
  key: "isTokenSearchState",
  default: false,
});

export const tokenLoadingState = createZustandStore<boolean>({
  key: "tokenLoadingState",
  default: true,
});
