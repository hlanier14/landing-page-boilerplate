import React from 'react';
import Button from '../Common/Button';
import { trackPricingTierSelected, trackCTAClick, trackPricingCardHover } from '../../services/AnalyticsService';

export default function Pricing() {
    const tiers = [
        {
            name: 'Free',
            price: '$0',
            period: 'month',
            description: 'Perfect for getting started.',
            features: [
                'Feature 1 included',
                'Feature 2 included',
                'Feature 3 included',
                'Basic support'
            ],
            cta: 'Get started',
            tier: 'free'
        },
        {
            name: 'Starter',
            price: '$9',
            period: 'month',
            description: 'Ideal for growing teams.',
            features: [
                'All Free features',
                'Advanced feature 1',
                'Advanced feature 2',
                'Priority support',
                'Feature 3 (Coming Soon)',
                'Feature 4 (Coming Soon)'
            ],
            cta: 'Get started',
            tier: 'starter',
            popular: true
        },
        {
            name: 'Pro',
            price: '$19',
            period: 'month',
            description: 'For power users and businesses.',
            features: [
                'All Starter features',
                'Premium feature 1',
                'Premium feature 2',
                '24/7 priority support',
                'Advanced feature (Coming Soon)'
            ],
            cta: 'Get started',
            tier: 'pro'
        }
    ];

    const handleTierClick = (tier: string) => {
        trackPricingTierSelected(tier);
        trackCTAClick('pricing');

        const secondaryCTA = document.getElementById('secondaryCTA');
        if (secondaryCTA) {
            const headerHeight = 80;
            const elementPosition = secondaryCTA.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section
            id="pricing"
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
            <div className="text-center mb-12 md:mb-16">
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50">
                    Simple, transparent pricing
                </h2>
                <p className="mt-3 text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                    Choose the plan that works best for you. All plans include a free trial.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-sm md:max-w-none mx-auto md:mx-0 items-stretch">
                {tiers.map((tier, index) => (
                    <div
                        key={index}
                        className={`group relative flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-300
                            bg-gradient-to-b from-white to-neutral-50/90 dark:from-neutral-900/80 dark:to-neutral-950/80
                            ${tier.popular
                                ? 'border-blue-500/80 shadow-[0_0_40px_rgba(59,130,246,0.35)] md:scale-105'
                                : 'border-neutral-200/80 dark:border-neutral-800/80 hover:border-blue-500/60 hover:shadow-[0_0_32px_rgba(59,130,246,0.25)] hover:-translate-y-1'
                            }`}
                        onMouseEnter={() => trackPricingCardHover(tier.tier)}
                    >
                        {tier.popular && (
                            <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-10">
                                <span className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                                    Most popular
                                </span>
                            </div>
                        )}

                        <div className="text-center mb-5 md:mb-6">
                            <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-1.5">
                                {tier.name}
                            </h3>
                            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-3">
                                {tier.description}
                            </p>
                            <div className="flex items-baseline justify-center gap-1.5 mb-1">
                                <span className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                                    {tier.price}
                                </span>
                                <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-400">
                                    /{tier.period}
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8 flex-grow">
                            {tier.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-sm md:text-sm text-neutral-700 dark:text-neutral-300"
                                >
                                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 flex-shrink-0">
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => handleTierClick(tier.tier)}
                            text={tier.cta}
                            fontSize="md"
                            variant={tier.popular ? 'primary' : 'secondary'}
                            className={`w-full mt-auto transition-transform duration-200 group-hover:translate-y-0.5 ${
                                tier.popular
                                    ? 'shadow-lg shadow-blue-500/30'
                                    : ''
                            }`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
