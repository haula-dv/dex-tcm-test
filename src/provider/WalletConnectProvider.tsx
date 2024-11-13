"use client";
import { themeSelectorState } from "@/common/stores/common";
import { OrderlyConfig } from "@/utils/config/orderly";
import { useMediaQuery, useTheme } from "@mui/material";
import { ConnectorProvider } from "@orderly.network/web3-onboard";
import { useStore } from "zustand";
import OrderlyConfigProviderRoot from "./OrderlyConfigProviderRoot";

export default function Web3OnboardProviderRoot({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { web3Onboard } = OrderlyConfig();
	const themeSelect = useStore(themeSelectorState, (state) => state.value);
	const theme = useTheme();
	const uplg = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<ConnectorProvider
			options={
				{
					...web3Onboard,
					theme: themeSelect.activeMode,
					appMetadata: {
						...web3Onboard.appMetadata,
						icon: uplg ? "/Orderly.svg" : "/OrderlyMobile.svg",
					},
				} as any
			}>
			<OrderlyConfigProviderRoot>{children}</OrderlyConfigProviderRoot>
		</ConnectorProvider>
	);
}
