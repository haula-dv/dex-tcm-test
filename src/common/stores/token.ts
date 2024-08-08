import { ITokenParamsType } from "@/common/types";
import { createZustandStore } from "nes-zustand";

export const tokenParamsState = createZustandStore<ITokenParamsType>({
  key: "tokenParamsState",
  default: {
    page: 1,
    per_page: 10,
    sparkline: false,
    vs_currency: "usd",
    order: "market_cap_desc",
  },
});
