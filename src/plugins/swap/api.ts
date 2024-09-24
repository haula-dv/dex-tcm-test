import { tokenLoadingState, tokensState } from '@/common';
import axios from 'axios';
import { setZustandValue } from 'nes-zustand';
import { tokenCoingeckoListState } from './store';
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

export const getTokensCoingeckoAPI = async () => {
	const urls = [
		'https://tokens.pancakeswap.finance/coingecko.json',
		'https://tokens.pancakeswap.finance/pancakeswap-bnb-mm.json',
		'https://tokens.pancakeswap.finance/pancakeswap-extended.json',
	];
	setZustandValue(tokenLoadingState, true);

	try {
		const res1 = await axios.get(urls[0]);
		// const res2 = await axios.get(urls[1]);
		// const res3 = await axios.get(urls[2]);

		setZustandValue(tokenCoingeckoListState, remapToken(res1.data.tokens));
		setZustandValue(tokensState, (prev) => [...prev, ...remapToken(res1.data.tokens)]);
		// setZustandValue(tokenPancakeswapBnbListState, remap(res2.data.tokens));
		// setZustandValue(tokenPancakeswapExtendedListState, remap(res3.data.tokens));
	} catch (error) {
		console.log(error);
	} finally {
		setZustandValue(tokenLoadingState, false);
	}
};

export function remapToken(tokens: any[]): any {
	return tokens.map((item: any) => {
		const cleanedToken = item.symbol.replace('$', '');

		return {
			token: cleanedToken,
			token_account_id: item.address,
			decimals: item.decimals,
			minimum_increment: 0.00000001,
			amount: 0,
			isInputting: false,
			logoURI: item.logoURI,
		};
	});
}
