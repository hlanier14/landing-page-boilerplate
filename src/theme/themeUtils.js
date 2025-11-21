// Utility functions for applying theme classes consistently

import { designTokens } from './designTokens';

/**
 * Get button classes based on variant and theme
 */
export function getButtonClasses(variant = 'primary', theme = 'light', options = {}) {
    const {
        size = 'md',
        disabled = false,
        fullWidth = false,
    } = options;

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-base',
    };

    const token = designTokens[variant] || designTokens.primary;
    const colors = token[theme];
    
    const baseClasses = [
        'rounded-xl',
        'font-medium',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
    ].filter(Boolean).join(' ');

    const colorClasses = disabled
        ? `bg-neutral-400 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400`
        : `bg-[${colors.main}] text-[${colors.text}] hover:bg-[${colors.hover}] active:bg-[${colors.active}] focus:ring-[${colors.main}]`;

    // Use Tailwind classes instead of arbitrary values for better performance
    if (variant === 'primary') {
        const primaryClasses = theme === 'light'
            ? 'bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 focus:ring-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 dark:active:bg-neutral-200 dark:focus:ring-neutral-200'
            : 'bg-white text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-200';
        return `${baseClasses} ${primaryClasses}`;
    }
    
    if (variant === 'secondary') {
        const secondaryClasses = theme === 'light'
            ? 'bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 focus:ring-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400 dark:active:bg-blue-600 dark:focus:ring-blue-500'
            : 'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600 focus:ring-blue-500';
        return `${baseClasses} ${secondaryClasses}`;
    }

    return baseClasses;
}

/**
 * Get input classes based on theme
 */
export function getInputClasses(theme = 'light', options = {}) {
    const {
        hasError = false,
        disabled = false,
    } = options;

    const border = designTokens.border[theme];
    const text = designTokens.text[theme];
    const bg = designTokens.background[theme];

    const baseClasses = [
        'w-full',
        'rounded-xl',
        'border',
        'px-4',
        'py-3',
        'outline-none',
        'transition-colors',
        disabled ? 'opacity-60 cursor-not-allowed' : '',
    ].filter(Boolean).join(' ');

    if (hasError) {
        const errorColor = designTokens.status.error[theme];
        return `${baseClasses} border-[${errorColor}] focus:ring-2 focus:ring-[${errorColor}] bg-[${bg.default}] text-[${text.primary}]`;
    }

    // Use Tailwind classes
    const themeClasses = theme === 'light'
        ? 'border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-neutral-800 focus:border-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:focus:ring-neutral-200 dark:focus:border-neutral-200'
        : 'border-neutral-700 bg-neutral-900 text-neutral-50 focus:ring-2 focus:ring-neutral-200 focus:border-neutral-200';

    return `${baseClasses} ${themeClasses}`;
}

/**
 * Get surface/card classes
 */
export function getSurfaceClasses(theme = 'light', elevated = false) {
    const surface = designTokens.surface[theme];
    const bg = elevated ? surface.elevated : surface.default;

    return `bg-[${bg}] border border-[${surface.border}] rounded-2xl`;
}

/**
 * Get text color classes
 */
export function getTextClasses(variant = 'primary', theme = 'light') {
    const text = designTokens.text[theme];
    const color = text[variant] || text.primary;

    if (variant === 'primary') {
        return theme === 'light'
            ? 'text-neutral-900 dark:text-neutral-50'
            : 'text-neutral-50 dark:text-neutral-900';
    }
    if (variant === 'secondary') {
        return theme === 'light'
            ? 'text-neutral-600 dark:text-neutral-300'
            : 'text-neutral-300 dark:text-neutral-600';
    }
    if (variant === 'tertiary') {
        return theme === 'light'
            ? 'text-neutral-500 dark:text-neutral-400'
            : 'text-neutral-400 dark:text-neutral-500';
    }

    return `text-[${color}]`;
}

