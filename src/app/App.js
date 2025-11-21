import React from 'react';
import Route from '../router';
import { LoadingProvider } from '../components/Common/LoadingContext';

export default function App() {
  return (
    <LoadingProvider>
      <Route />
    </LoadingProvider>
  );
}
