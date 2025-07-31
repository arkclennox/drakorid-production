import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';

import { cn } from '@/lib/utils';
import { Filter, FilterFallback } from '@/components/filters';
import { Search, SearchFallback } from '@/components/search';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'DraKorid - Korean Drama Collection & Discovery Platform',
  description: 'Discover and explore the best Korean dramas. Browse by genre, year, and rating. Find your next favorite K-drama with detailed information and reviews.',
  keywords: ['Korean drama', 'K-drama', 'Korean series', 'drama collection', 'Korean entertainment', 'drama discovery', 'Korean shows'],
  authors: [{ name: 'DraKorid Team' }],
  creator: 'DraKorid',
  publisher: 'DraKorid',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://drakorid.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DraKorid - Korean Drama Collection & Discovery Platform',
    description: 'Discover and explore the best Korean dramas. Browse by genre, year, and rating. Find your next favorite K-drama with detailed information and reviews.',
    url: 'https://drakorid.vercel.app',
    siteName: 'DraKorid',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DraKorid - Korean Drama Discovery Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DraKorid - Korean Drama Collection & Discovery Platform',
    description: 'Discover and explore the best Korean dramas. Browse by genre, year, and rating.',
    images: ['/og-image.jpg'],
    creator: '@drakorid',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://nmjuvpujhxmtunkcwkdb.supabase.co" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://nmjuvpujhxmtunkcwkdb.supabase.co" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          'bg-gray-100 font-sans antialiased dark:bg-black dark:text-white',
          GeistSans.variable
        )}
      >
        <div className="group flex w-full">
          <div className="hidden md:block w-[300px] h-screen sticky top-0 p-8">
            <div className="h-full rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="h-full overflow-y-auto p-4">
                <Suspense fallback={<FilterFallback />}>
                  <Filter />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-h-screen">
            <div className="sticky top-0 z-10 bg-gray-100 dark:bg-black">
              <div className="mx-8 py-4">
                <Suspense fallback={<SearchFallback />}>
                  <Search />
                </Suspense>
              </div>
            </div>
            <div className="flex-1 flex flex-col p-4">{children}</div>
          </div>
        </div>
        <Toaster closeButton />
      </body>
    </html>
  );
}
