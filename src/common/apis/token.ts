import { TDotEnv } from "@/utils/constants/dotenv";
import { axiosClient } from "@/utils/lib/axios-client";
import { getZustandValue, setZustandValue } from "nes-zustand";
import { tokenLoadingState, tokensState } from "../stores";

export type IImageNextworkType = "network_logo" | "symbol_logo";

// GET IMAGE NEXTWORK
export const getImageNextwork = (
  chain_id: number | string,
  type: IImageNextworkType = "network_logo"
) => {
  return `${TDotEnv.NEXTWORK_URL}static/${type}/${chain_id}.png`;
};

export const getTokensAPI = async () => {
  const tokens = getZustandValue(tokensState);
  if (tokens.length > 0) {
    return;
  }

  setZustandValue(tokenLoadingState, true);
  return await axiosClient
    .get("/token")
    .then((res) => {
      setZustandValue(tokensState, res.data?.rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setZustandValue(tokenLoadingState, false);
    });
};
