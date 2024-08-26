'use client';
import { Header } from '@/components/layouts/Header';
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

			<Box px={{ md: '60px' }}>{children}</Box>
		</>
	);
}
