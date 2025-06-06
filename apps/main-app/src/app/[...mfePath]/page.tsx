'use client';

import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getMicrofrontendByPath } from '@/utils/microfrontendRegistry';
import { Microfrontend } from '@/types/microfrontend';

// A simple loading component
const LoadingComponent = () => <div>Loading microfrontend...</div>;

// A simple not found component (though notFound() from next/navigation is preferred for actual 404)
const NotFoundComponent = () => <div>Microfrontend not found for this path.</div>;

export default function MicrofrontendPage() {
  const params = useParams();
  const [mfe, setMfe] = useState<Microfrontend | undefined | null>(null); // null for initial, undefined for not found

  useEffect(() => {
    if (params && params.mfePath) {
      // mfePath will be an array of segments, e.g., ['settings', 'profile']
      // Or a single segment string if not a catch-all, but here it's an array.
      const currentPath = Array.isArray(params.mfePath) ? params.mfePath.join('/') : params.mfePath;
      
      const foundMfe = getMicrofrontendByPath(currentPath);
      
      if (foundMfe) {
        setMfe(foundMfe);
      } else {
        setMfe(undefined); // Mark as not found
      }
    } else {
      // Should not happen with a catch-all route, but good to handle
      setMfe(undefined);
    }
  }, [params]);

  if (mfe === null) {
    // Initial loading state before useEffect runs or if params are not yet available
    return <LoadingComponent />;
  }

  if (mfe === undefined) {
    // Microfrontend not found, trigger Next.js 404 page
    // This should ideally be called directly within the effect or render logic
    // but notFound() must be called during render or from a server component.
    // For client components, a common pattern is to redirect or show a custom not found UI.
    // Here, we'll use a custom component, but for a real 404, `notFound()` is better if possible.
    // For a client component, you might redirect or render a specific UI.
    // Calling notFound() here will make the whole page a 404.
    notFound(); 
    return null; // notFound() throws an error, so this won't be reached.
  }

  const ComponentToRender = mfe.component;

  // React.Suspense is needed if the component is lazily loaded
  // For now, assuming components might be lazy, wrap with Suspense.
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <ComponentToRender />
    </React.Suspense>
  );
}
