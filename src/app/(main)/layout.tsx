'use client';
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

			{children}
		</>
	);
}
