import { getImageNextwork, ITokenType } from '@/common';
import { createZustandStore } from 'nes-zustand';

export const isTransactionSubmittedState = createZustandStore<boolean>({
	key: 'isTransactionSubmittedState',
	default: false,
});

export const tokenInputState = createZustandStore<ITokenType | null>({
	key: 'tokenInputState',
	default: {
		token: 'ETH',
		token_account_id: 'aurora',
		decimals: 18,
		minimum_increment: 0.00000001,
		amount: 0,
		isInputting: true,
		logoURI: getImageNextwork('ETH', 'symbol_logo'),
	},
});

export const tokenOutputState = createZustandStore<ITokenType | null>({
	key: 'tokenOutputState',
	default: null,
});

export const tokenPancakeswapBnbListState = createZustandStore<ITokenType[]>({
	key: 'tokenPancakeswapBnbListState',
	default: [],
});

export const tokenCoingeckoListState = createZustandStore<ITokenType[]>({
	key: 'tokenCoingeckoListState',
	default: [],
});

export const tokenPancakeswapExtendedListState = createZustandStore<ITokenType[]>({
	key: 'tokenPancakeswapExtendedListState',
	default: [],
});
