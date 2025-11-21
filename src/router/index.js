import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from '../theme/ThemeProvider';

const Header = lazy(() => import('../components/Header'));
const Home = lazy(() => import('../pages/Home'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Footer = lazy(() => import('../components/Footer'));

const RouteConfig = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-150 dark:bg-neutral-900 dark:text-neutral-100 relative overflow-x-hidden">
                    <div 
                        className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                        style={{
                            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                            backgroundSize: '32px 32px',
                        }}
                    />
                    
                    <div className="fixed inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-neutral-200/20 dark:bg-neutral-700/10 blur-3xl" />
                        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-neutral-200/10 dark:bg-neutral-700/5 blur-3xl" />
                    </div>
                    
                    <Header />
                    <main className="relative z-10 pt-20">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default RouteConfig;
