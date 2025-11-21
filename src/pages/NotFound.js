import React from 'react';
import ErrorHandler from '../components/Common/ErrorHandler';
import SEO from '../components/Common/SEO';
import { BRAND_CONFIG } from '../config/brand';

const NotFound = () => {
  return (
    <>
      <SEO
        title={`Page Not Found | ${BRAND_CONFIG.name}`}
        description={`The page you're looking for doesn't exist. Return to ${BRAND_CONFIG.name}.`}
        url={`${BRAND_CONFIG.url}/404`}
      />
      <ErrorHandler status={404} />
    </>
  );
};

export default NotFound;
