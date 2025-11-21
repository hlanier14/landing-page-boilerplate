import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { designTokens } from './designTokens';

const ThemeContext = createContext(undefined);

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
    return ctx;
}

export default function ThemeProvider({ children }) {
    // Always use dark mode
    const theme = 'dark';

    // Inject CSS variables for design tokens
    useEffect(() => {
        const root = document.documentElement;
        const tokens = designTokens;
        
        // Set CSS variables for current theme
        Object.entries(tokens).forEach(([category, values]) => {
            if (typeof values === 'object' && (values.light || values.dark)) {
                const themeValues = values[theme];
                if (themeValues) {
                    Object.entries(themeValues).forEach(([key, value]) => {
                        if (typeof value === 'string' && value.startsWith('#')) {
                            root.style.setProperty(`--color-${category}-${key}`, value);
                        }
                    });
                }
            }
        });

        // Always apply dark mode class
        root.classList.add('dark');
        
        localStorage.setItem('theme', 'dark');
    }, []);

    const value = useMemo(() => ({
        theme: 'dark',
        tokens: designTokens,
    }), []);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
