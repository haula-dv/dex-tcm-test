import { tokenInputState } from "@/plugins/swap/store";
import { TDotEnv } from "@/utils/constants/dotenv";
import { toQueryString } from "@/utils/helpers/format";
import { axiosClient } from "@/utils/lib/axios-client";
import axios from "axios";
import { getZustandValue, setZustandValue } from "nes-zustand";
import { tokenLoadingState, tokenParamsState, tokensState } from "../stores";
import { ITokenParamsType } from "../types";

export const fetchCoinGeckoTokens = async (params: ITokenParamsType) => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?${toQueryString(
    params
  )}`;

  setZustandValue(tokenLoadingState, true);
  return await axios
    .get(url)
    .then((res: any) => {
      setZustandValue(tokensState, res.data);
    })
    .catch((err) => {
      console.log(err.error);
    })
    .finally(() => {
      setZustandValue(tokenLoadingState, false);
    });
};

// All list
export const fetchTopTokensAPI = async (params: ITokenParamsType) => {
  const url = TDotEnv.TOKEN_API_URL;
  const tokens = getZustandValue(tokensState);

  if (tokens.length > 0) {
    return; // Stop load api if has tokens
  }

  setZustandValue(tokenLoadingState, tokens.length > 0 ? false : true);
  return await axios
    .post(url, params)
    .then((res: any) => {
      setZustandValue(tokensState, res.data.data.topTokens);
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
  const params = getZustandValue(tokenParamsState);

  params.operationName = "TokenSpotPrice";
  params.variables = { address: null, chain: "ETHEREUM" };
  params.query = `query TokenSpotPrice($chain: Chain!, $address: String = null) {\n  token(chain: $chain, address: $address) {\n    id\n    address\n    chain\n    name\n    symbol\n    project {\n      id\n      markets(currencies: [USD]) {\n        id\n        price {\n          id\n          value\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}`;

  const url = TDotEnv.TOKEN_API_URL;

  return await axios
    .post(url, params)
    .then((res: any) => {
      setZustandValue(tokenInputState, res.data.data.token);
    })
    .catch((err) => {
      console.log(err.error);
    })
    .finally(() => {
      //
    });
};

export const getTokensAPI = async () => {
  setZustandValue(tokenLoadingState, true);
  return await axiosClient
    .get("/token")
    .then((res: any) => {
      console.log(res);
      // setZustandValue(tokensState, res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setZustandValue(tokenLoadingState, false);
    });
};
