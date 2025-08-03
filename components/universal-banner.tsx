'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { ADSENSE_CONFIG, shouldShowAdSense } from '@/lib/ad-config';

// Universal banner types
export type BannerPlatform = 'adsense' | 'adsterra' | 'clickadu' | 'clickadilla' | 'custom';

interface UniversalBannerProps {
  platform: BannerPlatform;
  className?: string;
  // AdSense specific props
  adClient?: string;
  adSlot?: string;
  // Custom HTML/Script props
  customHtml?: string;
  customScript?: string;
  // Adsterra props
  adsterraKey?: string;
  adsterraFormat?: string;
  // Clickadu props
  clickaduZone?: string;
  // Clickadilla props
  clickadillaZone?: string;
  // General props
  width?: number;
  height?: number;
  responsive?: boolean;
}

export function UniversalBanner({
  platform,
  className = '',
  adClient = ADSENSE_CONFIG.CLIENT_ID,
  adSlot = ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP,
  customHtml,
  customScript,
  adsterraKey,
  adsterraFormat = 'banner',
  clickaduZone,
  clickadillaZone,
  width = 728,
  height = 90,
  responsive = true,
}: UniversalBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (platform === 'adsense') {
      try {
        if (typeof window !== 'undefined' && (window as any).adsbygoogle && shouldShowAdSense()) {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [platform]);

  // Development mode placeholder
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`w-full flex justify-center ${className}`}>
        <div 
          className="bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500"
          style={{
            width: responsive ? '100%' : `${width}px`,
            maxWidth: responsive ? `${width}px` : undefined,
            height: `${height}px`,
          }}
        >
          <div className="text-center">
            <div className="font-medium">{platform.toUpperCase()} Banner</div>
            <div className="text-xs opacity-75">({width}x{height}) - Development Mode</div>
          </div>
        </div>
      </div>
    );
  }

  // AdSense implementation
  if (platform === 'adsense') {
    if (!shouldShowAdSense()) return null;

    return (
      <>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className={`w-full flex justify-center overflow-hidden ${className}`}>
          {responsive ? (
            <>
              {/* Desktop Banner */}
              <ins
                className="adsbygoogle hidden md:block"
                style={{
                  display: 'block',
                  width: `${width}px`,
                  height: `${height}px`,
                }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="banner"
              />
              
              {/* Mobile Banner */}
              <ins
                className="adsbygoogle block md:hidden"
                style={{
                  display: 'block',
                  width: '100%',
                  height: `${height}px`,
                  maxWidth: '320px',
                }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </>
          ) : (
            <ins
              className="adsbygoogle"
              style={{
                display: 'block',
                width: `${width}px`,
                height: `${height}px`,
              }}
              data-ad-client={adClient}
              data-ad-slot={adSlot}
              data-ad-format="banner"
            />
          )}
        </div>
      </>
    );
  }

  // Adsterra implementation
  if (platform === 'adsterra' && adsterraKey) {
    return (
      <>
        <Script
          async
          src="https://www.adsterra.com/js/adsterra.js"
          strategy="afterInteractive"
        />
        <div className={`w-full flex justify-center ${className}`}>
          <div
            ref={bannerRef}
            style={{
              width: responsive ? '100%' : `${width}px`,
              maxWidth: responsive ? `${width}px` : undefined,
              height: `${height}px`,
            }}
          >
            <ins
              className="adsterra-banner"
              data-ad-client={adsterraKey}
              data-ad-format={adsterraFormat}
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </>
    );
  }

  // Clickadu implementation
  if (platform === 'clickadu' && clickaduZone) {
    return (
      <>
        <Script
          async
          src="https://a.clickadu.com/static/advert.js"
          strategy="afterInteractive"
        />
        <div className={`w-full flex justify-center ${className}`}>
          <div
            style={{
              width: responsive ? '100%' : `${width}px`,
              maxWidth: responsive ? `${width}px` : undefined,
              height: `${height}px`,
            }}
          >
            <div
              id={`clickadu-${clickaduZone}`}
              data-zone={clickaduZone}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </>
    );
  }

  // Clickadilla implementation
  if (platform === 'clickadilla' && clickadillaZone) {
    return (
      <>
        <Script
          async
          src="https://www.clickadilla.com/static/advert.js"
          strategy="afterInteractive"
        />
        <div className={`w-full flex justify-center ${className}`}>
          <div
            style={{
              width: responsive ? '100%' : `${width}px`,
              maxWidth: responsive ? `${width}px` : undefined,
              height: `${height}px`,
            }}
          >
            <div
              data-zone={clickadillaZone}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </>
    );
  }

  // Custom HTML/Script implementation
  if (platform === 'custom' && (customHtml || customScript)) {
    return (
      <>
        {customScript && (
          <Script
            id="custom-ad-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: customScript }}
          />
        )}
        <div className={`w-full flex justify-center ${className}`}>
          <div
            style={{
              width: responsive ? '100%' : `${width}px`,
              maxWidth: responsive ? `${width}px` : undefined,
              height: `${height}px`,
            }}
            dangerouslySetInnerHTML={customHtml ? { __html: customHtml } : undefined}
          />
        </div>
      </>
    );
  }

  return null;
}

// Preset components for easy usage
export function AdSenseBanner(props: Omit<UniversalBannerProps, 'platform'>) {
  return <UniversalBanner platform="adsense" {...props} />;
}

export function AdsterraBanner(props: Omit<UniversalBannerProps, 'platform'>) {
  return <UniversalBanner platform="adsterra" {...props} />;
}

export function ClickaduBanner(props: Omit<UniversalBannerProps, 'platform'>) {
  return <UniversalBanner platform="clickadu" {...props} />;
}

export function ClickadillaBanner(props: Omit<UniversalBannerProps, 'platform'>) {
  return <UniversalBanner platform="clickadilla" {...props} />;
}

export function CustomBanner(props: Omit<UniversalBannerProps, 'platform'>) {
  return <UniversalBanner platform="custom" {...props} />;
}