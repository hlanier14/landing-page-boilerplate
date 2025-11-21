import React from 'react';
import { BRAND_CONFIG } from '../../config/brand';

/**
 * Logo Component
 * 
 * This component displays your brand logo. You can:
 * 1. Replace the placeholder SVG below with your own logo
 * 2. Or use an image by replacing the SVG with: <img src={BRAND_CONFIG.logo.path} alt={BRAND_CONFIG.logo.alt} />
 */
export function Logo({
    size = 64,
    color = 'currentColor',
    className = ''
}) {
    // Option 1: Use an image logo (uncomment to use)
    // return (
    //     <img
    //         src={BRAND_CONFIG.logo.path}
    //         alt={BRAND_CONFIG.logo.alt}
    //         width={size}
    //         height={size}
    //         className={className}
    //     />
    // );

    // Option 2: Use SVG logo (default placeholder)
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            role="img"
            aria-label={`${BRAND_CONFIG.name} logo`}
        >
            {/* PLACEHOLDER LOGO - Replace this with your brand logo */}
            <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="8"
                stroke={color}
                strokeWidth="2.5"
                fill="none"
            />
            <circle
                cx="32"
                cy="32"
                r="12"
                stroke={color}
                strokeWidth="2"
                fill="none"
                opacity="0.5"
            />
            <path
                d="M32 20 L32 32 L40 40"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

