'use client';

import { UniversalBanner, type BannerPlatform } from './universal-banner';
import { 
  getBestAvailablePlatform, 
  getPlatformConfig, 
  AD_CONFIG,
  ADSENSE_CONFIG,
  ADSTERRA_CONFIG,
  CLICKADU_CONFIG,
  CLICKADILLA_CONFIG
} from '@/lib/ad-config';

interface SmartBannerProps {
  placement?: 'banner' | 'sidebar' | 'footer';
  className?: string;
  width?: number;
  height?: number;
  responsive?: boolean;
  // Override platform selection
  forcePlatform?: BannerPlatform;
}

export function SmartBanner({
  placement = 'banner',
  className = '',
  width = AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.width,
  height = AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.height,
  responsive = true,
  forcePlatform,
}: SmartBannerProps) {
  // Use forced platform or auto-detect best available
  const platform = forcePlatform || getBestAvailablePlatform();
  
  if (!platform) {
    // Show placeholder in development or when no ads are configured
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
              <div className="font-medium">Smart Banner</div>
              <div className="text-xs opacity-75">No ad platform configured</div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  const config = getPlatformConfig(platform, placement);

  // Render appropriate banner based on platform
  switch (platform) {
    case 'adsense':
      return (
        <UniversalBanner
          platform="adsense"
          adClient={(config as any).clientId}
          adSlot={(config as any).adSlot}
          width={width}
          height={height}
          responsive={responsive}
          className={className}
        />
      );
      
    case 'adsterra':
      return (
        <UniversalBanner
          platform="adsterra"
          adsterraKey={(config as any).key}
          width={width}
          height={height}
          responsive={responsive}
          className={className}
        />
      );
      
    case 'clickadu':
      return (
        <UniversalBanner
          platform="clickadu"
          clickaduZone={(config as any).zone}
          width={width}
          height={height}
          responsive={responsive}
          className={className}
        />
      );
      
    case 'clickadilla':
      return (
        <UniversalBanner
          platform="clickadilla"
          clickadillaZone={(config as any).zone}
          width={width}
          height={height}
          responsive={responsive}
          className={className}
        />
      );
      
    default:
      return null;
  }
}

// Preset components for different placements
export function TopBanner(props: Omit<SmartBannerProps, 'placement'>) {
  return (
    <SmartBanner 
      placement="banner" 
      width={AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.width}
      height={AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.height}
      {...props} 
    />
  );
}

export function SidebarBanner(props: Omit<SmartBannerProps, 'placement'>) {
  return (
    <SmartBanner 
      placement="sidebar" 
      width={300}
      height={250}
      responsive={false}
      {...props} 
    />
  );
}

export function FooterBanner(props: Omit<SmartBannerProps, 'placement'>) {
  return (
    <SmartBanner 
      placement="footer" 
      width={AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.width}
      height={AD_CONFIG.BANNER_DIMENSIONS.DESKTOP.height}
      {...props} 
    />
  );
}

// Legacy compatibility - maintains the same API as ResponsiveAdSenseBanner
export function ResponsiveAdSenseBanner({ className = '' }: { className?: string }) {
  return <TopBanner className={className} />;
}