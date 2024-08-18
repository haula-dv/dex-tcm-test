import "@/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";

import ClientThemeProvider from "@/components/ClientThemeProvider";
import { Loading } from "@/components/loading/loading";
import Web3OnboardProviderRoot from "@/provider/WalletConnectProvider";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Dex",
	description: "Dex",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head />
			<body>
				<ClientThemeProvider>
					<Web3OnboardProviderRoot>{children}</Web3OnboardProviderRoot>

					<Loading />
					<Toaster closeButton position="top-right" />
				</ClientThemeProvider>
			</body>
		</html>
	);
}
