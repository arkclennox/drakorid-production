'use client'

import {
  StarIcon,
  PlayIcon,
  GlobeIcon,
  CalendarIcon,
  ArrowLeftIcon,
  ClockIcon,
  TvIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import Image from 'next/image'
import { useDrama } from '@/lib/hooks/use-dramas'
import { SearchParams } from '@/lib/url-state'

// Import drama components
import { CastSection } from '@/components/drama/cast-section'
import { CrewSection } from '@/components/drama/crew-section'
import { EpisodesSection } from '@/components/drama/episodes-section'
import { ExternalLinks } from '@/components/drama/external-links'
import { ImagesGallery } from '@/components/drama/images-gallery'
import { KeywordsSection } from '@/components/drama/keywords-section'
import { RecommendationsSection } from '@/components/drama/recommendations-section'
import { VideosSection } from '@/components/drama/videos-section'

interface DramaDetailClientProps {
  id: string
  searchParams: SearchParams
}

function getCountryLabel(country: string): string {
  const COUNTRIES = [
    { label: 'South Korea', value: 'south-korea' },
    { label: 'China', value: 'china' },
    { label: 'Japan', value: 'japan' },
    { label: 'Thailand', value: 'thailand' },
    { label: 'Taiwan', value: 'taiwan' },
  ]
  const countryObj = COUNTRIES.find((c) => c.label.toLowerCase() === country.toLowerCase())
  return countryObj ? countryObj.label : country
}

export function DramaDetailClient({ id, searchParams }: DramaDetailClientProps) {
  const { drama, error, isLoading } = useDrama(id)

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h1 className="text-2xl font-bold mb-4">Error Loading Drama</h1>
        <p className="text-muted-foreground mb-4">Failed to load drama details. Please try again.</p>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Dramas
            </Button>
          </Link>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-10 w-32 mb-4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

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
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Dramas
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
              <Image
                src={drama.poster || '/placeholder-poster.jpg'}
                alt={drama.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Basic Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{drama.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <span>{drama.year}</span>
              <span>•</span>
              <span>{getCountryLabel(drama.country || 'Unknown')}</span>
              {drama.rating && drama.rating > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {drama.rating.toFixed(1)}
                  </div>
                </>
              )}
            </div>
            {drama.overview && (
              <p className="text-muted-foreground leading-relaxed">
                {drama.overview}
              </p>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {drama.genre && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TvIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Genre</span>
                </div>
                <p className="text-sm text-muted-foreground">{drama.genre}</p>
              </div>
            )}
            
            {drama.status && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Status</span>
                </div>
                <p className="text-sm text-muted-foreground">{drama.status}</p>
              </div>
            )}
            
            {drama.duration && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Duration</span>
                </div>
                <p className="text-sm text-muted-foreground">{drama.duration}</p>
              </div>
            )}
            
            {drama.episodes && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <PlayIcon className="w-4 h-4 mr-2" />
                  <span className="font-medium">Episodes</span>
                </div>
                <p className="text-sm text-muted-foreground">{drama.episodes}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button size="lg" className="flex-1" asChild>
              <Link href="https://www.ini-link-contoh.com" target="_blank" rel="noopener noreferrer">
                <PlayIcon className="w-4 h-4 mr-2" />
                Watch Now
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://www.ini-link-contoh.com" target="_blank" rel="noopener noreferrer">
                Add to Watchlist
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="mt-12 space-y-8">
        {/* Cast Section */}
        {drama.cast && drama.cast.length > 0 && (
          <CastSection cast={drama.cast} />
        )}
        
        {/* Crew Section */}
        {drama.crew && drama.crew.length > 0 && (
          <CrewSection crew={drama.crew} />
        )}
        
        {/* Episodes Section */}
          {drama.seasons && drama.seasons.length > 0 && drama.seasons.some(season => season.episodes && season.episodes.length > 0) && (
            <EpisodesSection seasons={drama.seasons} />
          )}

          {/* Images Gallery */}
          {drama.images && (drama.images.posters?.length > 0 || drama.images.backdrops?.length > 0) && (
            <ImagesGallery images={drama.images} />
          )}

          {/* Videos Section */}
          {drama.videos && drama.videos.length > 0 && (
            <VideosSection videos={drama.videos} />
          )}

          {/* Keywords Section */}
          {drama.keywords && drama.keywords.length > 0 && (
            <KeywordsSection keywords={drama.keywords} />
          )}

          {/* External Links */}
          {drama.external_ids && Object.keys(drama.external_ids).length > 0 && (
            <ExternalLinks externalIds={drama.external_ids} />
          )}

          {/* Recommendations */}
          <RecommendationsSection recommendations={[]} />
      </div>
    </div>
  )
}