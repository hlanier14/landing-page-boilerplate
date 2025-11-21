import React from 'react';
import Button from './Common/Button';
import { Logo } from './Common/Logo';
import { BRAND_CONFIG } from '../config/brand';
import { trackCTAClick } from '../services/AnalyticsService';

const Header = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleCTAClick = () => {
        trackCTAClick('header');
        scrollToSection('secondaryCTA');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/70 bg-white/70 backdrop-blur-md dark:bg-neutral-900/70 dark:border-neutral-800 shadow-sm">
            <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <a href="/" className="flex items-center gap-3" aria-label={`${BRAND_CONFIG.name} - Home`}>
                    <Logo
                        size={BRAND_CONFIG.logo.defaultSize}
                        className="text-blue-600 dark:text-blue-400"
                    />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">{BRAND_CONFIG.name}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">{BRAND_CONFIG.tagline}</span>
                    </div>
                </a>

                <div className="flex items-center gap-4">
                    <Button 
                        onClick={handleCTAClick}
                        text="Join the beta" 
                        fontSize="md"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Header;
