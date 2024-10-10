"use client";
import { Header } from "@/components/layouts/Header";
import "@/styles/global.scss";
import { Box, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import React, { useEffect } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = useTheme();

	// Apply theme mode to the body element
	useEffect(() => {
		document.body.classList.add(theme.palette.mode);

		return () => {
			document.body.classList.remove(theme.palette.mode);
		};
	}, [theme.palette.mode]);

	return (
		<div className={theme.palette.mode}>
			<Header />

			<Box position={"relative"}>{children}</Box>
		</div>
	);
}
