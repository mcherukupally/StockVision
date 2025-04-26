import React from 'react';
import ErrorBoundary from './stock/ErrorBoundary';
import StockPage from './StockPage';
import Signup from './Signup';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <StockPage />
      </ErrorBoundary>
      <Signup />
    </>
  );
}
