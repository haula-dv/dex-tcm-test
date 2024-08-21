"use client";
import { OrderlyConfig } from "@/utils/config/orderly";
import { ConnectorProvider } from "@orderly.network/web3-onboard";

export default function Web3OnboardProviderRoot({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { web3Onboard } = OrderlyConfig();
	return <ConnectorProvider options={web3Onboard}>{children}</ConnectorProvider>;
}
