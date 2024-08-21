import { TDotEnv } from '@/utils/constants/dotenv';
import { axiosClient } from '@/utils/lib/axios-client';
import axios from 'axios';
import { getZustandValue, setZustandValue } from 'nes-zustand';
import { tokenLoadingState, tokensState } from '../stores';

export type IImageNextworkType = 'network_logo' | 'symbol_logo';

// GET IMAGE NEXTWORK
export const getImageNextwork = (
	chain_id: number | string | undefined,
	type: IImageNextworkType = 'network_logo',
) => {
	return `${TDotEnv.NEXTWORK_URL}static/${type}/${chain_id}.png`;
};

export const getTokensAPI = async () => {
	// fetchTopTokensAPI();

	const tokens = getZustandValue(tokensState);
	if (tokens.length > 0) {
		return;
	}

	setZustandValue(tokenLoadingState, true);
	return await axiosClient
		.get('/token')
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

// All list
export const fetchTopTokensAPI = async () => {
	const params = {
		operationName: 'TopTokens',
		variables: {
			page: 1,
			pageSize: 100,
			orderBy: 'POPULARITY',
			chain: 'ETHEREUM',
		},
		query:
			'query TopTokens($chain: Chain, $page: Int = 1, $pageSize: Int = 100, $orderBy: TokenSortableField = POPULARITY) {\n  topTokens(chain: $chain, page: $page, pageSize: $pageSize, orderBy: $orderBy) {\n    id\n    address\n    chain\n    symbol\n    name\n    decimals\n    standard\n    project {\n      id\n      name\n      logo {\n        id\n        url\n        __typename\n      }\n      safetyLevel\n      logoUrl\n      isSpam\n      __typename\n    }\n    __typename\n  }\n}',
	};

	const url = TDotEnv.TOKEN_API_URL;
	const tokens = getZustandValue(tokensState);

	setZustandValue(tokenLoadingState, tokens.length > 0 ? false : true);
	return await axios
		.post(url, params)
		.then((res: any) => {
			// const data = res.data.data.topTokens.filter((it) => it.symbol === "NEAR");
			// console.log(data);
		})
		.catch((err) => {
			console.log(err.error);
		})
		.finally(() => {
			setZustandValue(tokenLoadingState, false);
		});
};
