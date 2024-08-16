'use client';
import MainViewContainer from '@/src/plugins/main-view/MainView';
import { ORDERLY_SDK_DEMO_TITLE_KEY } from '@/src/utils/config/orderly/config';
import { _orderlySymbolKey } from '@/src/utils/constant';
import '@orderly.network/react/dist/styles.css';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function PerpPage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [symbol, setSymbol] = useState(params.slug);

	useEffect(() => {
		if (symbol === undefined) {
			setSymbol(localStorage?.getItem(_orderlySymbolKey)!);
		}
	}, [symbol]);

	const updateTitle = useCallback((title: string) => {
		var titleElement = document.getElementById(ORDERLY_SDK_DEMO_TITLE_KEY);
		if (titleElement) {
			titleElement.textContent = title ?? symbol.toString();
		}
	}, []);

	return (
		<MainViewContainer
			symbol={symbol || 'PERP_ETH_USDC'}
			onSymbolChange={(symbol) => {
				console.log('update symbol', symbol);
				localStorage.setItem(_orderlySymbolKey, symbol.symbol);
				router.push(`/perp/${symbol.symbol}`);

				updateTitle(symbol.symbol);
			}}
		/>
	);
}
