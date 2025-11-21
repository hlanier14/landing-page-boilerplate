import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/Common/SEO';
import HeroSection from '../components/Home/Hero';
import HowItWorks from '../components/Home/HowItWorks';
import FAQ from '../components/Home/FAQ';
import Pricing from '../components/Home/Pricing';
import SecondaryCTA from '../components/Home/SecondaryCTA';
import { trackSectionView, trackScrollDepth, trackTimeOnPage, trackEngagement, trackPageView } from '../services/AnalyticsService';

function FadeInSection({ children, delay = 0, sectionId, sectionName }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const hasTracked = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Track section view only once
                    if (sectionId && sectionName && !hasTracked.current) {
                        hasTracked.current = true;
                        trackSectionView(sectionId, sectionName);
                    }
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [sectionId, sectionName]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function Home() {
    const pageLoadTime = useRef(Date.now());
    const hasTrackedEngagement = useRef(false);

    // Track page view
    useEffect(() => {
        
        // Track initial engagement
        const handleEngagement = () => {
            if (!hasTrackedEngagement.current) {
                hasTrackedEngagement.current = true;
                trackEngagement();
            }
        };
        
        // Track engagement on any user interaction
        ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            window.addEventListener(event, handleEngagement, { once: true });
        });
        
        // Track scroll depth
        let lastScrollDepth = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.round((scrollTop / docHeight) * 100);
            
            if (scrollPercent > lastScrollDepth) {
                trackScrollDepth(scrollPercent);
                lastScrollDepth = scrollPercent;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Track time on page
        const timeInterval = setInterval(() => {
            const timeSpent = Math.floor((Date.now() - pageLoadTime.current) / 1000);
            trackTimeOnPage(timeSpent);
        }, 10000); // Check every 10 seconds
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(timeInterval);
            ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(event => {
                window.removeEventListener(event, handleEngagement);
            });
        };
    }, []);

    const faqData = [
        { question: 'What is this product/service?', answer: 'This is a placeholder answer. Replace with information about what your product or service does and its main purpose.' },
        { question: 'How does it work?', answer: 'This is a placeholder answer. Explain the process or mechanism of how your product or service functions.' },
        { question: 'What are the key features?', answer: 'This is a placeholder answer. List and describe the main features that make your offering valuable.' },
        { question: 'Is there a free trial?', answer: 'This is a placeholder answer. Explain your trial policy, pricing, or how users can get started.' },
        { question: 'How do I get started?', answer: 'This is a placeholder answer. Provide clear steps on how users can begin using your product or service.' },
        { question: 'What platforms are supported?', answer: 'This is a placeholder answer. List the platforms, browsers, or devices your product supports.' },
        { question: 'Is my data secure?', answer: 'This is a placeholder answer. Address security, privacy, and data protection concerns.' },
        { question: 'What kind of support do you offer?', answer: 'This is a placeholder answer. Explain your support channels, response times, and available help resources.' }
    ];

    return (
        <>
            <SEO
                faqData={faqData}
            />
            <div className="grid grid-cols-1 mb-24">
                <FadeInSection sectionId="hero" sectionName="Hero">
                    <HeroSection />
                </FadeInSection>
            
                <FadeInSection delay={100} sectionId="how-it-works" sectionName="How It Works">
                    <HowItWorks />
                </FadeInSection>
            
                <FadeInSection delay={200} sectionId="pricing" sectionName="Pricing">
                    <Pricing />
                </FadeInSection>
            
                <FadeInSection delay={400} sectionId="faq" sectionName="FAQ">
                    <FAQ />
                </FadeInSection>
            
                <FadeInSection delay={500} sectionId="secondaryCTA" sectionName="Secondary CTA">
                    <SecondaryCTA />
                </FadeInSection>
            </div>
        </>
    );
}

export default Home;
