import React from 'react';
import { Logo } from './Common/Logo';
import { BRAND_CONFIG } from '../config/brand';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="border-t border-neutral-200/70 bg-white backdrop-blur-md dark:bg-neutral-900 dark:border-neutral-800">
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <a href="/" className="flex items-center gap-3" aria-label={`${BRAND_CONFIG.name} - Home`}>
                            <Logo size={42} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{BRAND_CONFIG.name}</span>
                        </a>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                        © {currentYear}{' '}
                        <a href="/" className="hover:underline text-neutral-700 dark:text-neutral-300">
                            {BRAND_CONFIG.name}
                        </a>
                        . All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
