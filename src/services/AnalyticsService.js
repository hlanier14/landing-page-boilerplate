import { GA_TRACKING_ID } from '../config/constants';
import { BRAND_CONFIG } from '../config/brand';

const isGAAvailable = () => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (!isGAAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Event]', eventName, eventParams);
    }
    return;
  }

  window.gtag('event', eventName, eventParams);
};

export const trackPageView = (pagePath, pageTitle) => {
  if (!isGAAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[GA Page View]', pagePath, pageTitle);
    }
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    event_category: 'Page',
    event_label: pageTitle
  });
};

export const trackSignupFormStart = (location) => {
  trackEvent('signup_form_start', {
    event_category: 'Signup',
    event_label: 'Signup Form Started',
    location: location || 'unknown'
  });
};

export const trackSignupFormSubmit = ({ email, location, status = 'attempt', timeToSubmit = null, errorMessage = null }) => {
  
  const params = {
    event_category: 'Signup',
    event_label: 'Signup Form Submit',
    status: status,
    location: location || 'unknown'
  };

  if (email) {
    params.has_email = true;
  }

  if (timeToSubmit !== null) {
    params.time_to_submit = timeToSubmit;
  }

  if (status === 'success') {
    params.value = 1;
    params.currency = 'USD';

    trackEvent('conversion', {
      send_to: GA_TRACKING_ID,
      value: 1,
      currency: 'USD',
      event_category: 'Signup',
      event_label: 'Signup Success',
      location: location || 'unknown'
    });
  }

  if (errorMessage) {
    params.error_message = errorMessage;
  }

  trackEvent('signup_form_submit', params);
};

export const trackCTAClick = (location) => {
  trackEvent('cta_click', {
    event_category: 'CTA',
    event_label: `CTA Click: ${location}`,
    location: location
  });
};

export const trackButtonClick = (buttonText, buttonLocation, buttonType = 'default') => {
  trackEvent('button_click', {
    event_category: 'Interaction',
    event_label: `Button Clicked: ${buttonText}`,
    button_text: buttonText,
    button_location: buttonLocation,
    button_type: buttonType
  });
};

export const trackPricingTierSelected = (tier) => {
  trackEvent('pricing_tier_selected', {
    event_category: 'Pricing',
    event_label: `Tier Selected: ${tier}`,
    tier: tier
  });
};

export const trackPricingCardHover = (tier) => {
  trackEvent('pricing_card_hover', {
    event_category: 'Pricing',
    event_label: `Pricing Card Hovered: ${tier}`,
    tier: tier
  });
};

export const trackFAQOpen = (question) => {
  trackEvent('faq_open', {
    event_category: 'FAQ',
    event_label: 'FAQ Question Opened',
    question: question
  });
};

export const trackFAQClose = (question) => {
  trackEvent('faq_close', {
    event_category: 'FAQ',
    event_label: 'FAQ Question Closed',
    question: question
  });
};

export const trackSectionView = (sectionId, sectionName) => {
  trackEvent('section_view', {
    event_category: 'Engagement',
    event_label: `Section Viewed: ${sectionName}`,
    section_id: sectionId,
    section_name: sectionName
  });
};

export const trackScrollDepth = (depth) => {
  const milestones = [25, 50, 75, 100];
  const milestone = milestones.find(m => depth >= m && depth < m + 25);
  
  if (milestone && !window._scrollDepthTracked?.[milestone]) {
    if (!window._scrollDepthTracked) {
      window._scrollDepthTracked = {};
    }
    window._scrollDepthTracked[milestone] = true;
    
    trackEvent('scroll_depth', {
      event_category: 'Engagement',
      event_label: `Scrolled ${milestone}%`,
      scroll_depth: milestone,
      value: milestone
    });
  }
};

export const trackTimeOnPage = (seconds) => {
  const milestones = [30, 60, 120, 300];
  const milestone = milestones.find(m => seconds >= m && seconds < m + 30);
  
  if (milestone && !window._timeOnPageTracked?.[milestone]) {
    if (!window._timeOnPageTracked) {
      window._timeOnPageTracked = {};
    }
    window._timeOnPageTracked[milestone] = true;
    
    trackEvent('time_on_page', {
      event_category: 'Engagement',
      event_label: `Time on Page: ${milestone}s`,
      time_seconds: milestone,
      value: milestone
    });
  }
};

export const trackEngagement = () => {
  if (!window._engagementTracked) {
    window._engagementTracked = true;
    trackEvent('user_engagement', {
      event_category: 'Engagement',
      event_label: 'User Engaged',
      engagement_time_msec: 1000
    });
  }
};

export const trackLinkClick = (linkText, linkUrl, linkLocation) => {
  trackEvent('link_click', {
    event_category: 'Navigation',
    event_label: `Link Clicked: ${linkText}`,
    link_text: linkText,
    link_url: linkUrl,
    link_location: linkLocation
  });
};

export const trackError = (errorMessage, errorLocation, errorType = 'general') => {
  trackEvent('exception', {
    description: errorMessage,
    fatal: false,
    error_location: errorLocation,
    error_type: errorType,
    event_category: 'Error',
    event_label: `Error: ${errorType}`
  });
};

export const addUTMParameters = (url, options = {}) => {
  if (!url) return url;

  try {
    const urlObj = new URL(url);
    const {
      source = BRAND_CONFIG.name.toLowerCase().replace(/\s+/g, '-'),
      content
    } = options;

    urlObj.searchParams.set('utm_source', source);

    return urlObj.toString();

  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Analytics] Failed to parse URL for UTM parameters:', url, error);
    }
    
    const separator = url.includes('?') ? '&' : '?';
    const params = new URLSearchParams({
      utm_source: options.source || BRAND_CONFIG.name.toLowerCase().replace(/\s+/g, '-'),
    });
    
    return `${url}${separator}${params.toString()}`;
  }
};
