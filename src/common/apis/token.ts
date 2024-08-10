import { tokenInputState } from "@/plugins/swap/store";
import { TDotEnv } from "@/utils/constants/dotenv";
import axios from "axios";
import { getZustandValue, setZustandValue } from "nes-zustand";
import {
  tokenLoadingState,
  tokenSpotPriceState,
  tokensState,
  topTokensState,
} from "../stores";
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
      if (tokenSpotPrice != null) {
        setZustandValue(topTokensState, [
          tokenSpotPrice,
          ...res.data.data.topTokens.slice(0, 6),
        ]);

        setZustandValue(
          tokensState,
          res.data.data.topTokens
            .slice(6, res.data.data.topTokens.length) // Get the items from index 6 onward
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
        );
      }
    })
    .catch((err) => {
      console.log(err.error);
    })
    .finally(() => {
      setZustandValue(tokenLoadingState, false);
    });
};

// All list
export const searchTopTokensAPI = async (searchString: string) => {
  const url = TDotEnv.TOKEN_API_URL;

  const params = {
    operationName: "SearchTokensWeb",
    variables: { searchQuery: searchString, chains: ["ETHEREUM"] },
    query:
      "query SearchTokensWeb($searchQuery: String!, $chains: [Chain!]) {\n  searchTokens(searchQuery: $searchQuery, chains: $chains) {\n    ...SimpleTokenDetails\n    id\n    decimals\n    name\n    chain\n    standard\n    address\n    symbol\n    market(currency: USD) {\n      id\n      price {\n        id\n        value\n        currency\n        __typename\n      }\n      pricePercentChange(duration: DAY) {\n        id\n        value\n        __typename\n      }\n      volume24H: volume(duration: DAY) {\n        id\n        value\n        currency\n        __typename\n      }\n      __typename\n    }\n    project {\n      id\n      name\n      logo {\n        id\n        url\n        __typename\n      }\n      safetyLevel\n      logoUrl\n      isSpam\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment SimpleTokenDetails on Token {\n  id\n  address\n  chain\n  symbol\n  name\n  decimals\n  standard\n  project {\n    id\n    name\n    logo {\n      id\n      url\n      __typename\n    }\n    safetyLevel\n    logoUrl\n    isSpam\n    __typename\n  }\n  __typename\n}",
  };
  setZustandValue(tokenLoadingState, true);

  return await axios
    .post(url, params)
    .then((res: any) => {
      if (res?.data?.data?.searchTokens?.length > 0) {
        setZustandValue(tokensState, res.data.data.searchTokens);
      } else {
        setZustandValue(tokensState, []);
      }
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
