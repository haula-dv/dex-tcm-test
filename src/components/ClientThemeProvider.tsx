'use client';
import { themeSelectorState } from '@/common/stores/common';
import { ThemeSettings } from '@/utils';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import React, { useEffect } from 'react';
import { useStore } from 'zustand';

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const themeSelector = useStore(themeSelectorState, (state) => state.value);
	const theme = ThemeSettings(themeSelector);

	// Apply theme to document
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const themeMode = themeSelector?.activeMode || 'dark';
			document.documentElement.setAttribute('data-theme', themeMode);
		}
	}, [themeSelector?.activeMode]);

	return (
		<AppRouterCacheProvider options={{ key: 'css' }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<main>{children}</main>
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
};

export default ClientThemeProvider;

