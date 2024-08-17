'use client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from 'react';
import { ThemeSettings } from '../utils';

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const theme = ThemeSettings();

	return (
		<AppRouterCacheProvider options={{ key: 'css' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<main className={theme.palette.mode}>{children}</main>
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
};

export default ClientThemeProvider;
