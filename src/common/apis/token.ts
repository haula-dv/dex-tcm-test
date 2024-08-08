import { toQueryString } from "@/utils/helpers/format";
import { axiosClient } from "@/utils/lib/axios-client";
import { ITokenParamsType } from "../types";

export const fetchCoinGeckoTokenInfo = async (params: ITokenParamsType) => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?${toQueryString(params)}`
  );
  const data = await response.json();
  console.log(data);
};

export const getTokensAPI = async () => {
  return await axiosClient
    .get("/token")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //
    });
};
