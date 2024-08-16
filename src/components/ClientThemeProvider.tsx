'use client';
import theme from '@/utils/themes/mui-theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from 'react';

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<AppRouterCacheProvider options={{ key: 'css' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
};

export default ClientThemeProvider;
