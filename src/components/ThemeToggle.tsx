'use client';

import { themeSelectorState } from '@/common/stores/common';
import { TLocalStorage } from '@/utils/constants/key_store';
import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useStore } from 'zustand';

export const ThemeToggle: React.FC = () => {
    const theme = useStore(themeSelectorState, (state) => state.value);
    const setTheme = useStore(themeSelectorState, (state) => state.setValue);

    const toggleTheme = () => {
        const newMode: 'dark' | 'light' = theme.activeMode === 'dark' ? 'light' : 'dark';
        const newTheme: typeof theme = {
            ...theme,
            activeMode: newMode,
        };
        setTheme(newTheme);

        // Save to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem(TLocalStorage.DEX_THEME_MODE, newMode);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title={`Switch to ${theme.activeMode === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme.activeMode === 'dark' ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
};
