import React, { useState } from 'react';
import { trackFAQOpen, trackFAQClose } from '../../services/AnalyticsService';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'Question 1: What is this product/service?',
            answer: 'Answer to the first question. Provide clear, helpful information that addresses common concerns or questions your visitors might have.'
        },
        {
            question: 'Question 2: How does it work?',
            answer: 'Answer explaining how your product or service works. Keep it simple and easy to understand.'
        },
        {
            question: 'Question 3: What are the key features?',
            answer: 'Answer highlighting the main features or benefits. Focus on what makes your offering unique.'
        },
        {
            question: 'Question 4: Is there a free trial?',
            answer: 'Answer about pricing, trials, or getting started. Be transparent about what users can expect.'
        },
        {
            question: 'Question 5: How do I get started?',
            answer: 'Answer with clear next steps. Guide users on how to begin using your product or service.'
        }
    ];

    const toggleFAQ = (index) => {
        if (openIndex === index) {
            // Closing the FAQ
            trackFAQClose(faqs[index].question);
            setOpenIndex(null);
        } else {
            // Opening a new FAQ (close previous if any)
            if (openIndex !== null) {
                trackFAQClose(faqs[openIndex].question);
            }
            setOpenIndex(index);
            trackFAQOpen(faqs[index].question);
        }
    };

    return (
        <section id="faq" className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-semibold text-neutral-900 dark:text-neutral-50 pr-4">
                                {faq.question}
                            </span>
                            <svg
                                className={`w-5 h-5 text-neutral-500 dark:text-neutral-400 flex-shrink-0 transition-transform ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
                                <p className="text-neutral-600 dark:text-neutral-400">
                                    {faq.answer}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
