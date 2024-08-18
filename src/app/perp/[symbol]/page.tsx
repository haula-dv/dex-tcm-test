'use client';
import { MainViewContainer } from '@/plugins/main-view/components/MainViewContainer';
import { TCMP_ORDERLY_SDK_TITLE_KEY } from '@/utils/config/orderly';
import { _orderlySymbolKey } from '@/utils/constants/orderly';
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

	const updateTitle = useCallback(
		(title: string) => {
			var titleElement = document.getElementById(TCMP_ORDERLY_SDK_TITLE_KEY);
			if (titleElement) {
				titleElement.textContent = title ?? symbol.toString();
			}
		},
		[symbol],
	);

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
