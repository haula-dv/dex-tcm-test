"use client";
import { Header } from "@/components/layouts/Header";
import "@/styles/global.scss";
import { Box, useTheme } from "@mui/material";
import "@orderly.network/react/dist/styles.css";
import React from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = useTheme();

	return (
		<div className={theme.palette.mode}>
			<Header />

			<Box position={"relative"}>{children}</Box>
		</div>
	);
}
