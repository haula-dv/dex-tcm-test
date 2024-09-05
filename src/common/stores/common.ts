import { TLocalStorage } from '@/utils/constants/key_store';
import { createZustandStore } from 'nes-zustand';
import { IThemeSelector } from '../types';

const themeLocal: any = typeof window === 'object' ? localStorage.getItem(TLocalStorage.DEX_THEME_MODE) : 'light';

export const themeSelectorState = createZustandStore<IThemeSelector>({
	key: 'themeSelectorState',
	default: {
		activeMode: themeLocal ? themeLocal : 'light',
		activeDir: 'lt',
	},
});
