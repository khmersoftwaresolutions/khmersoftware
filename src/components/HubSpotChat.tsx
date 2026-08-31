'use client';

import { useEffect } from 'react';

export default function HubSpotChat() {
  useEffect(() => {
    let loaded = false;

    const loadHubSpot = () => {
      if (loaded || typeof window === 'undefined') return;
      loaded = true;

      const script = document.createElement('script');
      script.src = 'https://js-na2.hs-scripts.com/246983131.js';
      script.async = true;
      script.defer = true;
      script.id = 'hs-script-loader';
      document.body.appendChild(script);

      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('scroll', loadHubSpot);
      window.removeEventListener('mousemove', loadHubSpot);
      window.removeEventListener('touchstart', loadHubSpot);
    };

    window.addEventListener('scroll', loadHubSpot, { passive: true, once: true });
    window.addEventListener('mousemove', loadHubSpot, { passive: true, once: true });
    window.addEventListener('touchstart', loadHubSpot, { passive: true, once: true });

    // Fallback timer if no interaction after 5 seconds
    const timer = setTimeout(loadHubSpot, 5000);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  return null;
}
