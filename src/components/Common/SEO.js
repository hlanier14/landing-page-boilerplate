import { useEffect, useMemo } from 'react';
import { BRAND_CONFIG } from '../../config/brand';

const SEO = ({
  title = `${BRAND_CONFIG.name} - ${BRAND_CONFIG.meta.defaultDescription}`,
  description = BRAND_CONFIG.meta.defaultDescription,
  keywords = BRAND_CONFIG.meta.defaultKeywords,
  image = BRAND_CONFIG.logo.path,
  url = BRAND_CONFIG.url,
  type = 'website',
  structuredData = null,
  faqData = null
}) => {

  const fullTitle = title.includes(BRAND_CONFIG.name) ? title : `${title} | ${BRAND_CONFIG.name}`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;

  const defaultStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND_CONFIG.name,
    description: BRAND_CONFIG.meta.defaultDescription,
    url: url
  }), [url]);

  const organizationStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_CONFIG.name,
    url: url,
    logo: `${url}${BRAND_CONFIG.logo.path}`,
    description: BRAND_CONFIG.meta.defaultDescription,
    sameAs: [
      BRAND_CONFIG.social.twitter,
      BRAND_CONFIG.social.linkedin
    ].filter(Boolean)
  }), [url]);

  const productStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: BRAND_CONFIG.name,
    description: BRAND_CONFIG.meta.defaultDescription,
    brand: {
      '@type': 'Brand',
      name: BRAND_CONFIG.name
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free (beta)',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
        description: 'Try it free while we\'re in beta.'
      }
    ]
  }), []);

  const faqStructuredData = useMemo(() => {
    if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
      return null;
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }, [faqData]);

  const finalStructuredData = structuredData || defaultStructuredData;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (attribute, value, content) => {
      const selector = attribute === 'property' 
        ? `meta[property="${value}"]` 
        : `meta[name="${value}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (attribute === 'property') {
          element.setAttribute('property', value);
        } else {
          element.setAttribute('name', value);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Primary Meta Tags
    updateMetaTag('name', 'title', fullTitle);
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'keywords', keywords);
    updateMetaTag('name', 'author', BRAND_CONFIG.meta.author);
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'language', 'English');
    updateMetaTag('name', 'revisit-after', '7 days');
    
    // Open Graph / Facebook
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('property', 'og:site_name', BRAND_CONFIG.name);
    updateMetaTag('property', 'og:locale', 'en_US');
    
    // Twitter
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:url', url);
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', fullImageUrl);
    
    // Additional SEO
    updateMetaTag('name', 'theme-color', '#1F75FE');
    updateLinkTag('canonical', url);
    updateLinkTag('icon', fullImageUrl);
    updateLinkTag('apple-touch-icon', fullImageUrl);

    // Structured Data - Remove old scripts and add new ones
    const removeStructuredData = () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        const text = script.textContent || '';
        if (text.includes('"@type":"WebSite"') || text.includes('"@type":"Organization"') || text.includes('"@type":"FAQPage"') || text.includes('"@type":"Product"')) {
          script.remove();
        }
      });
    };

    removeStructuredData();

    // Add WebSite structured data
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.textContent = JSON.stringify(finalStructuredData);
    document.head.appendChild(websiteScript);

    // Add Organization structured data
    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(organizationStructuredData);
    document.head.appendChild(orgScript);

    // Add Product structured data
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.textContent = JSON.stringify(productStructuredData);
    document.head.appendChild(productScript);

    // Add FAQ structured data if provided
    if (faqStructuredData) {
      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqStructuredData);
      document.head.appendChild(faqScript);
    }

    return () => {
    };
  }, [fullTitle, description, keywords, fullImageUrl, url, type, finalStructuredData, organizationStructuredData, productStructuredData, faqStructuredData]);

  return null;
};

export default SEO;
