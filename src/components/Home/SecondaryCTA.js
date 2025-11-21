import React, { useState } from 'react';
import SignUpInput from '../Common/SignUpInput';
import { trackCTAClick } from '../../services/AnalyticsService';

export default function SecondaryCTA() {
    const [showSuccess, setShowSuccess] = useState(false);

    async function handleSubmit(email) {
        try {
            trackCTAClick('secondary');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Error joining waitlist:', error);
            throw error;
        }
    }

    return (
        <section id="secondaryCTA" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 pb-24 md:pb-32">
            <div className="relative overflow-hidden rounded-2xl border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 via-blue-100/50 to-white dark:from-blue-900/30 dark:via-blue-800/20 dark:to-neutral-800 p-8 md:p-12 text-center shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/40 dark:bg-blue-900/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/40 dark:bg-blue-900/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                        Ready to get started?
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6">
                        Join thousands of users who are already benefiting from our solution. No credit card required.
                    </p>
                    {showSuccess ? (
                        <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-4 max-w-md mx-auto">
                            <p className="text-green-800 dark:text-green-200 font-medium">
                                ✓ You're on the list! We'll be in touch soon.
                            </p>
                        </div>
                    ) : (
                        <div className="max-w-md mx-auto">
                            <SignUpInput
                                placeholder="you@email.com"
                                buttonText="Join the beta"
                                loadingText="Joining…"
                                onSubmit={handleSubmit}
                                formName="waitlist"
                                formLocation="secondary"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

