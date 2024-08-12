import { TDotEnv } from "@/utils/constants/dotenv";
import { axiosClient } from "@/utils/lib/axios-client";
import { setZustandValue } from "nes-zustand";
import { supportedChainsLoadingState, supportedChainsState } from "./store";

export const getAccount = () => {
  // account
};

// GET NETWORKS
export const getChainsInfoAPI = async () => {
  setZustandValue(supportedChainsLoadingState, true);
  return await axiosClient
    .get(`/chain_info?broker_id=${TDotEnv.BROKER_ID}`)
    .then((res) => {
      console.log(res);
      setZustandValue(supportedChainsState, res.data.rows);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setZustandValue(supportedChainsLoadingState, false);
    });
};
