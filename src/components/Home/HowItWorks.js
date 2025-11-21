import React from 'react';
import { StepOneAnimation } from '../Animation/StepOneAnimation';
import { StepTwoAnimation } from '../Animation/StepTwoAnimation';
import { StepThreeAnimation } from '../Animation/StepThreeAnimation';

export default function HowItWorks() {
    const steps = [
        {
            number: '1',
            title: 'Step One Title',
            description: 'Describe the first step of your process. What do users do first? Make it clear and actionable.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            )
        },
        {
            number: '2',
            title: 'Step Two Title',
            description: 'Describe the second step. What happens next in your process? Explain the value or benefit.',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            number: '3',
            title: 'Step Three Title',
            description: 'Describe the final step or outcome. What do users achieve? What is the end result?',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        }
    ];

    return (
        <section id="how-it-works" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-neutral-50/30 dark:bg-neutral-900/30">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                    How It Works
                </h2>
            </div>

            <div className="space-y-10">
                <div className="rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/40 shadow-sm p-8 md:p-10 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                {steps[0].title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {steps[0].description}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0 h-[260px] md:h-[300px]">
                        <StepOneAnimation />
                    </div>
                </div>

                <div className="rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/40 shadow-sm p-8 md:p-10 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 w-full order-2 lg:order-1 flex justify-center items-center lg:justify-start">
                        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                            <StepTwoAnimation />
                        </div>
                    </div>
                    <div className="flex-1 text-center lg:text-left space-y-4 order-1 lg:order-2">
                        <div>
                            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                {steps[1].title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {steps[1].description}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/40 shadow-sm p-8 md:p-10 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 text-center lg:text-left space-y-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                                {steps[2].title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {steps[2].description}
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-2xl mx-auto">
                        <StepThreeAnimation />
                    </div>
                </div>
            </div>
        </section>
    );
}

