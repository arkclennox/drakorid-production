import {
  StarIcon,
  PlayIcon,
  GlobeIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ClockIcon,
  TvIcon,
  TrendingUpIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchDramaById, fetchDramasWithPagination } from '@/lib/api/drama-queries';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
// Import new drama components
import { CastSection } from '@/components/drama/cast-section';
import { CrewSection } from '@/components/drama/crew-section';
import { EpisodesSection } from '@/components/drama/episodes-section';
import { VideosSection } from '@/components/drama/videos-section';
import { ImagesGallery } from '@/components/drama/images-gallery';
import { RecommendationsSection } from '@/components/drama/recommendations-section';
import { KeywordsSection } from '@/components/drama/keywords-section';
import { ExternalLinks } from '@/components/drama/external-links';
import { SearchParams, stringifySearchParams } from '@/lib/url-state';

const COUNTRIES = [
  { value: 'kr', label: 'South Korea' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'th', label: 'Thailand' },
  { value: 'tw', label: 'Taiwan' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
];

function getCountryLabel(country: string): string {
  const countryObj = COUNTRIES.find((c) => c.label.toLowerCase() === country.toLowerCase());
  return countryObj ? countryObj.label : country;
}

// Prerender the first page of dramas
export async function generateStaticParams() {
  try {
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not available during build, skipping static generation');
      return [];
    }
    
    const dramaResponse = await fetchDramasWithPagination({ page: 1, limit: 10 });

    return dramaResponse.dramas.map((drama) => ({
      id: drama.id.toString(),
    }));
  } catch (error) {
    console.warn('Failed to generate static params, falling back to dynamic rendering:', error);
    return [];
  }
}

// Generate dynamic metadata for each drama page
export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const drama = await fetchDramaById(params.id);
    
    if (!drama) {
      return {
        title: 'Drama Not Found - DraKorid',
        description: 'The requested Korean drama could not be found.',
      };
    }

    const title = `${drama.title} (${drama.year}) - DraKorid`;
    const description = drama.overview 
      ? `${drama.overview.slice(0, 155)}...` 
      : `Watch ${drama.title}, a ${drama.genre} Korean drama from ${drama.year}. Discover more K-dramas on DraKorid.`;

    return {
      title,
      description,
      keywords: [
        drama.title,
        'Korean drama',
        'K-drama',
        drama.genre,
        drama.year?.toString(),
        'Korean series',
        'drama streaming',
      ].filter(Boolean),
      openGraph: {
        title,
        description,
        type: 'video.tv_show',
        url: `https://drakorid.vercel.app/${params.id}`,
        siteName: 'DraKorid',
        images: drama.poster ? [
          {
            url: drama.poster,
            width: 500,
            height: 750,
            alt: `${drama.title} poster`,
          },
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: drama.poster ? [drama.poster] : [],
      },
      alternates: {
        canonical: `/${params.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Drama Details - DraKorid',
      description: 'Discover Korean dramas on DraKorid.',
    };
  }
}

export default async function Page(
  props: {
    params: Promise<{ id: string }>;
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const drama = await fetchDramaById(params.id);

  if (!drama) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h1 className="text-2xl font-bold mb-4">Drama Not Found</h1>
        <p className="text-muted-foreground mb-4">The drama you're looking for doesn't exist.</p>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dramas
          </Button>
        </Link>
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto">
      {/* Backdrop Image */}
      {drama.backdrop_path && (
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <Image
            src={drama.backdrop_path}
            alt={`${drama.title} backdrop`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-4 left-4">
            <Link href={`/?${stringifySearchParams(searchParams)}`}>
              <Button variant="secondary" size="sm">
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {/* Content without backdrop */}
      {!drama.backdrop_path && (
        <div className="p-6">
          <Link href={`/?${stringifySearchParams(searchParams)}`}>
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Results
            </Button>
          </Link>
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Drama Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 shadow-lg">
              <Image
                src={drama.poster || '/placeholder-poster.svg'}
                alt={drama.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Drama Details */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl font-bold mb-2">{drama.title}</h1>
                {drama.tagline && (
                  <p className="text-lg text-muted-foreground italic mb-4">{drama.tagline}</p>
                )}
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {drama.release_date ? 
                      new Date(drama.release_date).getFullYear() : 
                      'Not available'
                    }
                  </div>
                  
                  {drama.country && (
                    <div className="flex items-center">
                      <GlobeIcon className="w-4 h-4 mr-1" />
                      {getCountryLabel(drama.country)}
                    </div>
                  )}
                  
                  {drama.duration && (
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {drama.duration}
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {drama.rating.toFixed(1)}
                    {drama.vote_count && drama.vote_count > 0 && (
                      <span className="ml-1">({drama.vote_count.toLocaleString()} votes)</span>
                    )}
                  </div>
                  
                  {drama.popularity && drama.popularity > 0 && (
                    <div className="flex items-center">
                      <TrendingUpIcon className="w-4 h-4 mr-1" />
                      {drama.popularity.toFixed(0)} popularity
                    </div>
                  )}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {drama.overview || 'No overview available.'}
                </p>
              </div>

              {/* Detail */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Detail</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Genres */}
                {drama.genre && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <h3 className="text-sm font-semibold mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-1">
                      {(drama.genre || '').toString().split(',').slice(0, 3).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs font-medium"
                        >
                          {genre.trim()}
                        </span>
                      ))}
                      {(drama.genre || '').toString().split(',').length > 3 && (
                        <span className="text-xs text-muted-foreground">+{(drama.genre || '').toString().split(',').length - 3}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Artis */}
                {drama.artis && (drama.artis || '').toString().trim() && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <h3 className="text-sm font-semibold mb-2">Artis</h3>
                    <div className="space-y-1">
                      {(drama.artis || '').toString().split(',').slice(0, 3).map((artist, index) => (
                        <div key={index} className="text-sm font-medium">
                          {artist.trim()}
                        </div>
                      ))}
                      {(drama.artis || '').toString().split(',').length > 3 && (
                        <div className="text-xs text-muted-foreground">+{(drama.artis || '').toString().split(',').length - 3} more</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Direktur */}
                {drama.direktur && (drama.direktur || '').toString().trim() && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <h3 className="text-sm font-semibold mb-2">Direktur</h3>
                    <div className="space-y-1">
                      {(drama.direktur || '').toString().split(',').slice(0, 2).map((director, index) => (
                        <div key={index} className="text-sm font-medium">
                          {director.trim()}
                        </div>
                      ))}
                      {(drama.direktur || '').toString().split(',').length > 2 && (
                        <div className="text-xs text-muted-foreground">+{(drama.direktur || '').toString().split(',').length - 2} more</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Penulis */}
                {drama.penulis && (drama.penulis || '').toString().trim() && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    <h3 className="text-sm font-semibold mb-2">Penulis</h3>
                    <div className="space-y-1">
                      {(drama.penulis || '').toString().split(',').slice(0, 2).map((writer, index) => (
                        <div key={index} className="text-sm font-medium">
                          {writer.trim()}
                        </div>
                      ))}
                      {(drama.penulis || '').toString().split(',').length > 2 && (
                        <div className="text-xs text-muted-foreground">+{(drama.penulis || '').toString().split(',').length - 2} more</div>
                      )}
                    </div>
                  </div>
                )}
                </div>
              </div>

              {/* Links Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Links</h2>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a href="https://www.profitableratecpm.com/jj42qjfx?key=66c652973a1081790d15cdcafc035b73" target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="w-4 h-4 mr-2" />
                      Link 1
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://www.profitableratecpm.com/jj42qjfx?key=66c652973a1081790d15cdcafc035b73" target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="w-4 h-4 mr-2" />
                      Link 2
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="https://www.profitableratecpm.com/jj42qjfx?key=66c652973a1081790d15cdcafc035b73" target="_blank" rel="noopener noreferrer">
                      <GlobeIcon className="w-4 h-4 mr-2" />
                      Link 3
                    </a>
                  </Button>
                </div>
              </div>




            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
