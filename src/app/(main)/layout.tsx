'use client';
import { Header } from '@/components/layouts/Header';
import { Box, useTheme } from '@mui/material';
import React from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = useTheme();

	return (
		<div className={theme.palette.mode}>
			<Header />

			<Box position={'relative'}>{children}</Box>
		</div>
	);
}
