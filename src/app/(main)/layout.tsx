'use client';
import { MainContainer } from '@/components/container/MainContainer';
import { Header } from '@/components/layouts/Header';
import React from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />

			<MainContainer maxWidth="xl">{children}</MainContainer>
		</>
	);
}
