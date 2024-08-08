import { ITokenParamsType } from "@/common/types";
import { createZustandStore } from "nes-zustand";
import { ITokenType } from "./../../plugins/swap/type";

export const tokenParamsState = createZustandStore<ITokenParamsType>({
  key: "tokenParamsState",
  default: {
    operationName: "TopTokens",
    variables: {
      page: 1,
      pageSize: 100,
      orderBy: "POPULARITY",
      chain: "ETHEREUM",
    },
    query:
      "query TopTokens($chain: Chain, $page: Int = 1, $pageSize: Int = 100, $orderBy: TokenSortableField = POPULARITY) {\n  topTokens(chain: $chain, page: $page, pageSize: $pageSize, orderBy: $orderBy) {\n    id\n    address\n    chain\n    symbol\n    name\n    decimals\n    standard\n    project {\n      id\n      name\n      logo {\n        id\n        url\n        __typename\n      }\n      safetyLevel\n      logoUrl\n      isSpam\n      __typename\n    }\n    __typename\n  }\n}",
  },
});

export const tokensState = createZustandStore<ITokenType[]>({
  key: "tokensState",
  default: [],
});

export const tokenLoadingState = createZustandStore<boolean>({
  key: "tokensState",
  default: true,
});
