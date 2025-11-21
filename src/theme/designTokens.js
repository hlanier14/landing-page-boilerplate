// Design Tokens - Centralized color scheme and design elements
// Change these values to update the entire site's appearance

export const designTokens = {
    // Primary brand colors
    primary: {
        light: {
            main: '#171717',      // neutral-900
            hover: '#404040',     // neutral-700
            active: '#0a0a0a',    // neutral-950
            text: '#ffffff',
        },
        dark: {
            main: '#ffffff',
            hover: '#f5f5f5',     // neutral-100
            active: '#e5e5e5',    // neutral-200
            text: '#171717',      // neutral-900
        },
    },

    // Secondary/Accent colors (for buttons, links, etc.)
    secondary: {
        light: {
            main: '#2563eb',      // blue-600
            hover: '#3b82f6',      // blue-500
            active: '#1d4ed8',     // blue-700
            text: '#ffffff',
        },
        dark: {
            main: '#3b82f6',      // blue-500
            hover: '#60a5fa',      // blue-400
            active: '#2563eb',      // blue-600
            text: '#ffffff',
        },
    },

    // Background colors
    background: {
        light: {
            default: '#ffffff',
            secondary: '#fafafa',  // neutral-50
            tertiary: '#f5f5f5',  // neutral-100
        },
        dark: {
            default: '#0a0a0a',   // neutral-950
            secondary: '#171717',  // neutral-900
            tertiary: '#262626',  // neutral-800
        },
    },

    // Surface colors (cards, panels, etc.)
    surface: {
        light: {
            default: '#ffffff',
            elevated: '#ffffff',
            border: '#e5e5e5',    // neutral-200
            borderHover: '#d4d4d4', // neutral-300
        },
        dark: {
            default: '#171717',   // neutral-900
            elevated: '#262626',  // neutral-800
            border: '#404040',    // neutral-700
            borderHover: '#525252', // neutral-600
        },
    },

    // Text colors
    text: {
        light: {
            primary: '#171717',   // neutral-900
            secondary: '#525252', // neutral-600
            tertiary: '#737373', // neutral-500
            inverse: '#ffffff',
        },
        dark: {
            primary: '#fafafa',   // neutral-50
            secondary: '#d4d4d4', // neutral-300
            tertiary: '#a3a3a3', // neutral-400
            inverse: '#171717',  // neutral-900
        },
    },

    // Border colors
    border: {
        light: {
            default: '#e5e5e5',  // neutral-200
            hover: '#d4d4d4',    // neutral-300
            focus: '#171717',    // neutral-900
        },
        dark: {
            default: '#404040',  // neutral-700
            hover: '#525252',    // neutral-600
            focus: '#fafafa',    // neutral-50
        },
    },

    // Status colors
    status: {
        success: {
            light: '#16a34a',   // green-600
            dark: '#22c55e',     // green-500
        },
        error: {
            light: '#dc2626',    // red-600
            dark: '#ef4444',     // red-500
        },
        warning: {
            light: '#d97706',    // amber-600
            dark: '#f59e0b',     // amber-500
        },
        info: {
            light: '#2563eb',    // blue-600
            dark: '#3b82f6',     // blue-500
        },
    },

    // Shadow
    shadow: {
        light: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06)',
        dark: '0 1px 2px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3)',
    },

    // Border radius
    radius: {
        sm: '0.5rem',   // rounded-lg
        md: '0.75rem',  // rounded-xl
        lg: '1rem',     // rounded-2xl
    },
};

// Helper function to get theme-aware color
export function getThemeColor(category, variant, theme = 'light') {
    const token = designTokens[category];
    if (!token) return null;
    
    if (variant.includes('.')) {
        const [key, subKey] = variant.split('.');
        return token[key]?.[theme]?.[subKey] || null;
    }
    
    return token[theme]?.[variant] || token[variant] || null;
}

// Helper to generate Tailwind-compatible color classes
export function getColorClasses(type, theme = 'light') {
    const tokens = designTokens[type];
    if (!tokens) return {};
    
    if (type === 'primary' || type === 'secondary') {
        return {
            bg: tokens[theme].main,
            'bg-hover': tokens[theme].hover,
            'bg-active': tokens[theme].active,
            text: tokens[theme].text,
        };
    }
    
    return tokens[theme] || {};
}

