import * as React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

export const withSuspense = (
  Component: React.ElementType,
  Fallback?: React.ReactNode
) => {
  return (props: any) => (
    <React.Suspense fallback={Fallback || <LoadingIndicator />}>
      <Component {...props} />
    </React.Suspense>
  );
};
