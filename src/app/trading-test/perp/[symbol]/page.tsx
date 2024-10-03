"use client";
import { HeadPage } from "@/components/HeadPage";
import "@/styles/abstracts/variables-test.scss";
import { OrderlyConfig } from "@/utils/config/orderly";
import { TCMP_ORDERLY_SDK_TITLE_KEY } from "@/utils/constants/key_store";
import { _orderlySymbolKey } from "@/utils/constants/orderly";
import { Box } from "@mui/material";
import { TradingPage } from "@orderly.network/react";
import "@orderly.network/react/dist/styles.css";
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

	const { tradingViewConfig } = OrderlyConfig();

	return (
		<Box bgcolor={"#262626"}>
			<HeadPage title={`${symbol || "PERP_ETH_USDC"}`} />
			<TradingPage
				symbol={"PERP_ETH_USDC"}
				tradingViewConfig={tradingViewConfig}
				onSymbolChange={() => {
					//
				}}
			/>
		</Box>
	);
}
