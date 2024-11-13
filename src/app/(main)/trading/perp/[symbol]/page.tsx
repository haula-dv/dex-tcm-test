"use client";
import { MainViewContainer } from "@/plugins/trade/components/MainViewContainer";
import MainViewMobileContainer from "@/plugins/trade/components/MainViewMobileContainer";
import { TCMP_ORDERLY_SDK_TITLE_KEY } from "@/utils/constants/key_store";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function PerpPage({ params }: { params: { symbol: string } }) {
	const router = useRouter();
	const [symbol, setSymbol] = useState(params.symbol);

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

	const onSymbolChange = (symbol: string) => {
		localStorage.setItem(_orderlySymbolKey, symbol);
		router.push(`/trading/perp/${symbol}`);
		updateTitle(symbol);
	};

	const theme = useTheme();
	const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<>
			{lgUp ? (
				<MainViewContainer symbol={symbol || "PERP_ETH_USDC"} onSymbolChange={onSymbolChange} />
			) : (
				<MainViewMobileContainer
					symbol={symbol || "PERP_ETH_USDC"}
					onSymbolChange={onSymbolChange}
				/>
			)}
		</>
	);
}
