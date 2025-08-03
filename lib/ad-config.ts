// Universal Ad Platform Configuration
// Supports multiple ad networks: AdSense, Adsterra, Clickadu, Clickadilla, and custom ads

export type AdPlatform = 'adsense' | 'adsterra' | 'clickadu' | 'clickadilla' | 'custom';

// AdSense Configuration
export const ADSENSE_CONFIG = {
  CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXXX',
  AD_SLOTS: {
    BANNER_TOP: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || 'XXXXXXXXXX',
    SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || 'YYYYYYYYYY',
    FOOTER: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || 'ZZZZZZZZZZ',
  },
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== 'false',
};

// Adsterra Configuration
export const ADSTERRA_CONFIG = {
  BANNER_KEY: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY || 'XXXXXXXXXX',
  SIDEBAR_KEY: process.env.NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY || 'YYYYYYYYYY',
  FOOTER_KEY: process.env.NEXT_PUBLIC_ADSTERRA_FOOTER_KEY || 'ZZZZZZZZZZ',
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSTERRA_ENABLED !== 'false',
};

// Clickadu Configuration
export const CLICKADU_CONFIG = {
  BANNER_ZONE: process.env.NEXT_PUBLIC_CLICKADU_BANNER_ZONE || 'XXXXXXXXXX',
  SIDEBAR_ZONE: process.env.NEXT_PUBLIC_CLICKADU_SIDEBAR_ZONE || 'YYYYYYYYYY',
  FOOTER_ZONE: process.env.NEXT_PUBLIC_CLICKADU_FOOTER_ZONE || 'ZZZZZZZZZZ',
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CLICKADU_ENABLED !== 'false',
};

// Clickadilla Configuration
export const CLICKADILLA_CONFIG = {
  BANNER_ZONE: process.env.NEXT_PUBLIC_CLICKADILLA_BANNER_ZONE || 'XXXXXXXXXX',
  SIDEBAR_ZONE: process.env.NEXT_PUBLIC_CLICKADILLA_SIDEBAR_ZONE || 'YYYYYYYYYY',
  FOOTER_ZONE: process.env.NEXT_PUBLIC_CLICKADILLA_FOOTER_ZONE || 'ZZZZZZZZZZ',
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CLICKADILLA_ENABLED !== 'false',
};

// Universal Ad Configuration
export const AD_CONFIG = {
  // Primary platform to use for banner ads
  PRIMARY_PLATFORM: (process.env.NEXT_PUBLIC_PRIMARY_AD_PLATFORM as AdPlatform) || 'adsense',
  
  // Fallback platforms if primary fails
  FALLBACK_PLATFORMS: [
    process.env.NEXT_PUBLIC_FALLBACK_AD_PLATFORM_1 as AdPlatform,
    process.env.NEXT_PUBLIC_FALLBACK_AD_PLATFORM_2 as AdPlatform,
  ].filter(Boolean),
  
  // Global ad settings
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADS_ENABLED !== 'false',
  
  // Banner dimensions
  BANNER_DIMENSIONS: {
    DESKTOP: { width: 728, height: 90 },
    MOBILE: { width: 320, height: 50 },
    TABLET: { width: 468, height: 60 },
  },
};

// Helper functions
export const shouldShowAds = (): boolean => {
  return AD_CONFIG.ENABLED;
};

export const shouldShowAdSense = (): boolean => {
  return ADSENSE_CONFIG.ENABLED && 
         ADSENSE_CONFIG.CLIENT_ID !== 'ca-pub-XXXXXXXXXXXXXXXXX' &&
         ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP !== 'XXXXXXXXXX';
};

export const shouldShowAdsterra = (): boolean => {
  return ADSTERRA_CONFIG.ENABLED && 
         ADSTERRA_CONFIG.BANNER_KEY !== 'XXXXXXXXXX';
};

export const shouldShowClickadu = (): boolean => {
  return CLICKADU_CONFIG.ENABLED && 
         CLICKADU_CONFIG.BANNER_ZONE !== 'XXXXXXXXXX';
};

export const shouldShowClickadilla = (): boolean => {
  return CLICKADILLA_CONFIG.ENABLED && 
         CLICKADILLA_CONFIG.BANNER_ZONE !== 'XXXXXXXXXX';
};

// Get the best available platform
export const getBestAvailablePlatform = (): AdPlatform | null => {
  if (!shouldShowAds()) return null;
  
  // Check primary platform first
  switch (AD_CONFIG.PRIMARY_PLATFORM) {
    case 'adsense':
      if (shouldShowAdSense()) return 'adsense';
      break;
    case 'adsterra':
      if (shouldShowAdsterra()) return 'adsterra';
      break;
    case 'clickadu':
      if (shouldShowClickadu()) return 'clickadu';
      break;
    case 'clickadilla':
      if (shouldShowClickadilla()) return 'clickadilla';
      break;
  }
  
  // Check fallback platforms
  for (const platform of AD_CONFIG.FALLBACK_PLATFORMS) {
    switch (platform) {
      case 'adsense':
        if (shouldShowAdSense()) return 'adsense';
        break;
      case 'adsterra':
        if (shouldShowAdsterra()) return 'adsterra';
        break;
      case 'clickadu':
        if (shouldShowClickadu()) return 'clickadu';
        break;
      case 'clickadilla':
        if (shouldShowClickadilla()) return 'clickadilla';
        break;
    }
  }
  
  return null;
};

// Get configuration for specific platform
export const getPlatformConfig = (platform: AdPlatform, placement: 'banner' | 'sidebar' | 'footer' = 'banner') => {
  switch (platform) {
    case 'adsense':
      return {
        clientId: ADSENSE_CONFIG.CLIENT_ID,
        adSlot: placement === 'banner' ? ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP :
                placement === 'sidebar' ? ADSENSE_CONFIG.AD_SLOTS.SIDEBAR :
                ADSENSE_CONFIG.AD_SLOTS.FOOTER,
      };
    case 'adsterra':
      return {
        key: placement === 'banner' ? ADSTERRA_CONFIG.BANNER_KEY :
             placement === 'sidebar' ? ADSTERRA_CONFIG.SIDEBAR_KEY :
             ADSTERRA_CONFIG.FOOTER_KEY,
      };
    case 'clickadu':
      return {
        zone: placement === 'banner' ? CLICKADU_CONFIG.BANNER_ZONE :
              placement === 'sidebar' ? CLICKADU_CONFIG.SIDEBAR_ZONE :
              CLICKADU_CONFIG.FOOTER_ZONE,
      };
    case 'clickadilla':
      return {
        zone: placement === 'banner' ? CLICKADILLA_CONFIG.BANNER_ZONE :
              placement === 'sidebar' ? CLICKADILLA_CONFIG.SIDEBAR_ZONE :
              CLICKADILLA_CONFIG.FOOTER_ZONE,
      };
    default:
      return {};
  }
};