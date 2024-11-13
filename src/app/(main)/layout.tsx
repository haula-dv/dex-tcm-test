"use client";
import { Header } from "@/components/layouts/Header";
import HeaderMobile from "@/components/layouts/HeaderMobile";
import "@/styles/global.scss";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import React, { useEffect } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = useTheme();
	const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

	// Apply theme mode to the body element
	useEffect(() => {
		document.body.classList.add(theme.palette.mode);

		return () => {
			document.body.classList.remove(theme.palette.mode);
		};
	}, [theme.palette.mode]);

	return (
		<div className={theme.palette.mode}>
			{lgUp ? <Header /> : <HeaderMobile />}

			<Box position={"relative"}>{children}</Box>
		</div>
	);
}
