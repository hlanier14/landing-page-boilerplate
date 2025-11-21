import React, { useState } from 'react';
import SignUpInput from '../Common/SignUpInput';
import { HeroAnimation } from '../Animation/HeroAnimation';
import { trackCTAClick } from '../../services/AnalyticsService';

export default function Hero() {
    const [showSuccess, setShowSuccess] = useState(false);

    async function handleSubmit(email) {
        try {
            trackCTAClick('hero');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Error joining waitlist:', error);
            throw error;
        }
    }

    return (
        <section id="hero" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="flex flex-col gap-12 md:gap-16 items-center">
                <div className="text-center space-y-6 w-full">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
                        Your compelling{' '}
                        <span className="text-blue-600 dark:text-blue-400">headline here{' '}</span>
                        that captures attention.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                        Your value proposition goes here. Explain what makes your product or service unique and why visitors should care.
                    </p>
                    
                    <div className="w-full max-w-md mx-auto">
                        {showSuccess ? (
                            <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4 text-center">
                                <p className="text-green-800 dark:text-green-200 font-medium">
                                    ✓ You're on the list! We'll be in touch soon.
                                </p>
                            </div>
                        ) : (
                            <SignUpInput
                                placeholder="you@email.com"
                                buttonText="Join the beta"
                                loadingText="Joining…"
                                onSubmit={handleSubmit}
                                formName="waitlist"
                                formLocation="hero"
                            />
                        )}
                    </div>
                </div>

                <div className="relative w-full">
                    <div 
                        className="relative w-full flex items-center justify-center overflow-hidden rounded-2xl p-4 md:p-8"
                        style={{
                            background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.5) 0%, rgba(16, 24, 32, 0.5) 100%)'
                        }}
                    >
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3BA3FF] rounded-full opacity-10 blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3BA3FF] rounded-full opacity-5 blur-[100px] pointer-events-none" />
                        
                        <HeroAnimation />
                    </div>
                </div>
            </div>
        </section>
    );
}
