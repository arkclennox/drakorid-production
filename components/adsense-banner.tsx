'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { ADSENSE_CONFIG, shouldShowAds } from '@/lib/adsense-config';

interface AdSenseBannerProps {
  adSlot: string;
  adClient: string;
  className?: string;
}

export function AdSenseBanner({ adSlot, adClient, className = '' }: AdSenseBannerProps) {
  useEffect(() => {
    try {
      // Push ads after component mounts
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className={`w-full flex justify-center ${className}`}>
        <ins
          className="adsbygoogle block"
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '728px',
            height: '90px',
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}

// Responsive banner that adjusts for mobile
export function ResponsiveAdSenseBanner({ 
  adSlot = ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP, 
  adClient = ADSENSE_CONFIG.CLIENT_ID, 
  className = '' 
}: Partial<AdSenseBannerProps>) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle && shouldShowAds()) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // Don't render ads in development or if not properly configured
  if (!shouldShowAds()) {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div className="hidden md:block w-[728px] h-[90px] bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500">
          AdSense Banner (728x90) - Development Mode
        </div>
        <div className="block md:hidden w-full max-w-[320px] h-[90px] bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500">
          AdSense Banner - Mobile
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <div className={`w-full flex justify-center overflow-hidden ${className}`}>
        {/* Desktop Banner - 728x90 */}
        <ins
          className="adsbygoogle hidden md:block"
          style={{
            display: 'block',
            width: '728px',
            height: '90px',
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="banner"
        />
        
        {/* Mobile Banner - Responsive */}
        <ins
          className="adsbygoogle block md:hidden"
          style={{
            display: 'block',
            width: '100%',
            height: '90px',
            maxWidth: '320px',
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}