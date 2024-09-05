'use client';
import { MainContainer } from '@/components/container/MainContainer';
import Logo from '@/components/icons/Logo';
import { Box } from '@mui/material';
import React from 'react';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<MainContainer maxWidth="md">
			<Box pt={'80px'} maxWidth="586px" mx={'auto'}>
				<Box display={'flex'} justifyContent={'center'} pb={'64px'}>
					<Logo />
				</Box>

				{children}
			</Box>
		</MainContainer>
	);
}
