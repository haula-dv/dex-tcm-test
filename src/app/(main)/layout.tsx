'use client';
import { Header } from '@/components/layouts/Header';
import { tradeBodyHeight } from '@/utils/themes/custom-theme/sizes';
import { Box } from '@mui/material';
import React from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />

			<Box pt="48px" px={{ xs: '16px', xl: '60px' }} position={'relative'} height={tradeBodyHeight}>
				{children}
			</Box>
		</>
	);
}
