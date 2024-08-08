import { tokenInputState } from "@/plugins/swap/store";
import { TDotEnv } from "@/utils/constants/dotenv";
import axios from "axios";
import { getZustandValue, setZustandValue } from "nes-zustand";
import { tokenLoadingState, tokenSpotPriceState, tokensState } from "../stores";
import { ITokenParamsType } from "../types";

// All list
export const fetchTopTokensAPI = async (params: ITokenParamsType) => {
  const url = TDotEnv.TOKEN_API_URL;
  const tokens = getZustandValue(tokensState);
  const tokenSpotPrice = getZustandValue(tokenSpotPriceState);

  if (tokens.length > 0) {
    return; // Stop load api if has tokens
  }

  setZustandValue(tokenLoadingState, tokens.length > 0 ? false : true);
  return await axios
    .post(url, params)
    .then((res: any) => {
      setZustandValue(
        tokensState,
        tokenSpotPrice !== null
          ? [tokenSpotPrice, ...res.data.data.topTokens]
          : res.data.data.topTokens
      );
    })
    .catch((err) => {
      console.log(err.error);
    })
    .finally(() => {
      setZustandValue(tokenLoadingState, false);
    });
};

// Signal item
export const fetchTokenSpotPriceAPI = async () => {
  const params = {
    operationName: "TokenSpotPrice",
    variables: { address: null, chain: "ETHEREUM" },
    query: `query TokenSpotPrice($chain: Chain!, $address: String = null) {\n  token(chain: $chain, address: $address) {\n    id\n    address\n    chain\n    name\n    symbol\n    project {\n      id\n      markets(currencies: [USD]) {\n        id\n        price {\n          id\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}`,
  };

  const url = TDotEnv.TOKEN_API_URL;

  return await axios
    .post(url, params)
    .then((res: any) => {
      const tokenSpotPrice = {
        ...res.data.data.token,
        project: {
          ...res.data.data.token.project,
          logoUrl: "/images/token.png",
        },
      };
      setZustandValue(tokenInputState, tokenSpotPrice);
      setZustandValue(tokenSpotPriceState, tokenSpotPrice);
    })
    .catch((err) => {
      console.log(err.error);
    })
    .finally(() => {
      //
    });
};
