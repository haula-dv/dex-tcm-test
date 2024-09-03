'use client';
import { themeSelectorState } from '@/common/stores/common';
import { ThemeSettings } from '@/utils';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import React from 'react';
import { useStore } from 'zustand';

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const themeSelector = useStore(themeSelectorState, (state) => state.value);
	const theme = ThemeSettings(themeSelector);

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
