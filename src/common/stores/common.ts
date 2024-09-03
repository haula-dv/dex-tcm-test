import { createZustandStore } from 'nes-zustand';
import { IThemeSelector } from '../types';

export const themeSelectorState = createZustandStore<IThemeSelector>({
	key: 'themeSelectorState',
	default: {
		activeMode: 'light',
		activeDir: 'lt',
	},
});
