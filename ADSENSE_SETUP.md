# Universal Ad Platform Integration Guide

This guide explains how to set up banner ads from multiple ad networks (AdSense, Adsterra, Clickadu, Clickadilla) in your Next.js application with automatic platform selection and fallback support.

## Features

- ✅ **Multi-platform support**: AdSense, Adsterra, Clickadu, Clickadilla, and custom ads
- ✅ **Smart platform selection**: Automatic fallback to available platforms
- ✅ **Responsive design**: 728x90 on desktop, auto-responsive on mobile
- ✅ **SSR-safe implementation**: Uses `next/script` with proper loading strategies
- ✅ **Environment-based configuration**: Secure credential management
- ✅ **Development mode**: Placeholder ads with platform indicators
- ✅ **TypeScript support**: Full type safety and IntelliSense
- ✅ **Flexible placement**: Top banner, sidebar, footer support
- ✅ **Legacy compatibility**: Drop-in replacement for existing AdSense components

## Setup Instructions

### 1. Set Up Your Ad Network Accounts

#### AdSense
1. Apply for Google AdSense at [https://www.google.com/adsense/](https://www.google.com/adsense/)
2. Create ad units and note your Publisher ID and Ad Slot IDs

#### Adsterra
1. Sign up at [https://adsterra.com/](https://adsterra.com/)
2. Create banner ad zones and note your zone keys

#### Clickadu
1. Register at [https://clickadu.com/](https://clickadu.com/)
2. Create ad zones and note your zone IDs

#### Clickadilla
1. Join at [https://clickadilla.com/](https://clickadilla.com/)
2. Set up ad zones and collect zone IDs

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update the ad platform configuration in `.env.local`:
   ```env
   # Primary platform (will be tried first)
   NEXT_PUBLIC_PRIMARY_AD_PLATFORM=adsense
   
   # Fallback platforms (tried if primary fails)
   NEXT_PUBLIC_FALLBACK_AD_PLATFORM_1=adsterra
   NEXT_PUBLIC_FALLBACK_AD_PLATFORM_2=clickadu
   
   # Global ad settings
   NEXT_PUBLIC_ADS_ENABLED=true
   
   # AdSense credentials
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
   NEXT_PUBLIC_ADSENSE_BANNER_SLOT=1234567890
   NEXT_PUBLIC_ADSENSE_ENABLED=true
   
   # Adsterra credentials (optional)
   NEXT_PUBLIC_ADSTERRA_BANNER_KEY=your-adsterra-key
   NEXT_PUBLIC_ADSTERRA_ENABLED=true
   
   # Clickadu credentials (optional)
   NEXT_PUBLIC_CLICKADU_BANNER_ZONE=your-clickadu-zone
   NEXT_PUBLIC_CLICKADU_ENABLED=true
   
   # Clickadilla credentials (optional)
   NEXT_PUBLIC_CLICKADILLA_BANNER_ZONE=your-clickadilla-zone
   NEXT_PUBLIC_CLICKADILLA_ENABLED=true
   ```

### 3. Deployment Configuration

For production deployment (Vercel, Netlify, etc.), add these environment variables:

**Core Settings:**
- `NEXT_PUBLIC_PRIMARY_AD_PLATFORM`
- `NEXT_PUBLIC_ADS_ENABLED`

**AdSense (if using):**
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- `NEXT_PUBLIC_ADSENSE_BANNER_SLOT`
- `NEXT_PUBLIC_ADSENSE_ENABLED`

**Adsterra (if using):**
- `NEXT_PUBLIC_ADSTERRA_BANNER_KEY`
- `NEXT_PUBLIC_ADSTERRA_ENABLED`

**Clickadu (if using):**
- `NEXT_PUBLIC_CLICKADU_BANNER_ZONE`
- `NEXT_PUBLIC_CLICKADU_ENABLED`

**Clickadilla (if using):**
- `NEXT_PUBLIC_CLICKADILLA_BANNER_ZONE`
- `NEXT_PUBLIC_CLICKADILLA_ENABLED`

## How It Works

### Components

1. **`SmartBanner`** - Intelligent banner that auto-selects best available platform
2. **`TopBanner`** - Pre-configured top banner (728x90)
3. **`SidebarBanner`** - Sidebar banner (300x250)
4. **`FooterBanner`** - Footer banner (728x90)
5. **`UniversalBanner`** - Low-level component for specific platform control
6. **`ResponsiveAdSenseBanner`** - Legacy compatibility component

### Configuration

- **`lib/ad-config.ts`** - Universal ad platform configuration
- **`lib/adsense-config.ts`** - Legacy AdSense-specific configuration
- **Environment variables** - Secure credential storage

### Responsive Behavior

- **Desktop (≥768px)**: Shows 728x90 banner
- **Mobile (<768px)**: Shows responsive banner (max 320px width)
- **Development**: Shows placeholder with dimensions

### SSR Safety

- Uses `next/script` with `afterInteractive` strategy
- Client-side only ad initialization
- Proper error handling for failed ad loads

## Usage Examples

### Smart Banner (Recommended)

```tsx
import { TopBanner } from '@/components/smart-banner';

// Automatically selects best available platform
<TopBanner className="mx-auto" />
```

### Specific Platform Usage

```tsx
import { UniversalBanner } from '@/components/universal-banner';

// Force specific platform
<UniversalBanner 
  platform="adsterra"
  adsterraKey="your-key"
  width={728}
  height={90}
/>

<UniversalBanner 
  platform="clickadu"
  clickaduZone="your-zone"
  responsive={true}
/>
```

### Multiple Placements

```tsx
import { TopBanner, SidebarBanner, FooterBanner } from '@/components/smart-banner';

// Different placements with automatic platform selection
<TopBanner className="mb-4" />
<SidebarBanner className="my-4" />
<FooterBanner className="mt-4" />
```

### Legacy Compatibility

```tsx
import { ResponsiveAdSenseBanner } from '@/components/smart-banner';

// Drop-in replacement for existing AdSense components
<ResponsiveAdSenseBanner className="mx-auto" />
```

### Adding More Ad Placements

1. Add new placement to `lib/ad-config.ts`:
   ```ts
   // Add to each platform config
   ADSENSE_CONFIG.AD_SLOTS.HEADER = process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT || 'XXXXXXXXXX';
   ADSTERRA_CONFIG.HEADER_KEY = process.env.NEXT_PUBLIC_ADSTERRA_HEADER_KEY || 'XXXXXXXXXX';
   ```

2. Add environment variables:
   ```env
   NEXT_PUBLIC_ADSENSE_HEADER_SLOT=your-header-slot-id
   NEXT_PUBLIC_ADSTERRA_HEADER_KEY=your-header-key
   ```

3. Use in components:
   ```tsx
   <SmartBanner 
     placement="header"
     width={970}
     height={250}
   />
   ```

## Development vs Production

### Development Mode
- Shows gray placeholder boxes with platform names and dimensions
- No actual ads loaded from any platform
- Helps with layout testing and platform identification
- Smart banner shows "No ad platform configured" if none are set up

### Production Mode
- Loads real ads from configured platforms
- Automatically selects best available platform based on configuration
- Falls back to secondary platforms if primary fails
- Only enabled when `NEXT_PUBLIC_ADS_ENABLED=true`

## Troubleshooting

### Ads Not Showing

1. **Check environment variables** - Ensure platform credentials are correctly set
2. **Verify platform approval** - All ad network accounts must be approved
3. **Check browser console** - Look for platform-specific errors
4. **Ad blockers** - Test with ad blockers disabled
5. **Domain verification** - Ensure your domain is approved by the ad networks
6. **Platform priority** - Check if primary platform is configured correctly
7. **Fallback testing** - Disable primary platform to test fallbacks

### Common Issues

- **"AdSense error" in console**: AdSense configuration issues
- **"Adsterra error" in console**: Adsterra key or format problems
- **Blank ad spaces**: Pending approval or invalid credentials for any platform
- **Layout shifts**: Ensure proper CSS sizing for ad containers
- **Platform not loading**: Check if platform scripts are blocked
- **Fallback not working**: Verify fallback platform configurations

## Best Practices

1. **Test thoroughly** - Always test ads in production environment
2. **Monitor performance** - Check Core Web Vitals impact
3. **Respect user experience** - Don't overload pages with ads
4. **Follow AdSense policies** - Ensure compliance with Google's policies
5. **Use environment variables** - Never hardcode sensitive information

## File Structure

```
components/
├── adsense-banner.tsx          # Legacy AdSense components
├── universal-banner.tsx        # Multi-platform banner components
├── smart-banner.tsx           # Intelligent banner with auto-selection

lib/
├── adsense-config.ts          # Legacy AdSense configuration
├── ad-config.ts               # Universal ad platform configuration

app/
├── layout.tsx                 # Banner integration

.env.example                   # Environment variables template
ADSENSE_SETUP.md              # This setup guide
```

## Platform-Specific Support

### AdSense
- [Google AdSense Help Center](https://support.google.com/adsense/)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)

### Adsterra
- [Adsterra Support](https://adsterra.com/support/)
- [Adsterra Documentation](https://adsterra.com/blog/)

### Clickadu
- [Clickadu Help Center](https://clickadu.com/help/)
- [Clickadu API Documentation](https://clickadu.com/api/)

### Clickadilla
- [Clickadilla Support](https://clickadilla.com/support/)
- [Clickadilla Publisher Guide](https://clickadilla.com/publishers/)

### Technical
- [Next.js Script Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [React useEffect Best Practices](https://react.dev/reference/react/useEffect)