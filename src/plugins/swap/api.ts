import axios from 'axios';
import { IExchangePrice } from './type';

export const exchangePriceAPI = async (payload: IExchangePrice) => {
	await axios
		.post('https://canoe.icarus.tools/market/zeroex/swap_quote', payload)
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

// await exchangePriceAPI({
//   chain: "ethereum",
//   account: "0x0000000000000000000000000000000000000000",
//   inTokenAddress: tokenInput?.address ?? "",
//   outTokenAddress: tokenOutput?.address ?? "",
//   isExactIn: true,
//   slippage: slippageAmount,
//   inTokenAmount: inputAmount.toString(),
// });
