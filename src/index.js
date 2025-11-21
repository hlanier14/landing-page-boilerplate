import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

import { FallbackLoading } from './components/Common/FallbackLoading';
import { GA_TRACKING_ID } from './config/constants';

const initializeGoogleAnalytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (window.gtag) {
    return;
  }

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  } 
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_TRACKING_ID);
};

initializeGoogleAnalytics();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<FallbackLoading />}>
    <App />
  </Suspense>
);

reportWebVitals();
