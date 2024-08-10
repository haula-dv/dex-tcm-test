import axios from "axios";
import { IExchangePrice } from "./type";

export const exchangePriceAPI = async (payload: IExchangePrice) => {
  await axios
    .post("https://canoe.icarus.tools/market/zeroex/swap_quote", payload)
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
