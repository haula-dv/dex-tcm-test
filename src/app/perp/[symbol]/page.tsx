'use client';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ORDERLY_SDK_DEMO_TITLE_KEY } from '@/src/app/config';
import { _orderlySymbolKey } from '@/src/app/constant';
import '@orderly.network/react/dist/styles.css';
import MainViewContainer from '@/src/plugins/main-view/MainView';

export default function PerpPage({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [symbol, setSymbol] = useState(params.slug);

	useEffect(() => {
		if (symbol === undefined) {
			setSymbol(localStorage?.getItem(_orderlySymbolKey)!);
		}
	}, [symbol]);

	const updateTitle = useCallback((title) => {
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
