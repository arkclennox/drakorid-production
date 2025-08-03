// AdSense Configuration
// Replace these values with your actual AdSense publisher ID and ad slot IDs

export const ADSENSE_CONFIG = {
  // Your AdSense publisher ID (starts with ca-pub-)
  CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXXX',
  
  // Ad slot IDs for different ad placements
  AD_SLOTS: {
    BANNER_TOP: process.env.NEXT_PUBLIC_ADSENSE_BANNER_SLOT || 'XXXXXXXXXX',
    // Add more ad slots as needed
    // SIDEBAR: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT || 'YYYYYYYYYY',
    // FOOTER: process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT || 'ZZZZZZZZZZ',
  },
  
  // Enable/disable ads (useful for development)
  ENABLED: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== 'false',
};

// Helper function to check if ads should be displayed
export const shouldShowAds = (): boolean => {
  return ADSENSE_CONFIG.ENABLED && 
         ADSENSE_CONFIG.CLIENT_ID !== 'ca-pub-XXXXXXXXXXXXXXXXX' &&
         ADSENSE_CONFIG.AD_SLOTS.BANNER_TOP !== 'XXXXXXXXXX';
};