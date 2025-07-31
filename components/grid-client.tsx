'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useDramas } from '@/lib/hooks/use-dramas'
import { DramaSearchParams } from '@/lib/api/drama-queries'
import { SearchParams, stringifySearchParams } from '@/lib/url-state'
import { Skeleton } from '@/components/ui/skeleton'

interface DramasGridClientProps {
  searchParams: SearchParams
  dramaSearchParams: DramaSearchParams
}

// Function to create slug from title
function createSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
  return `sinopsis-${slug}-${id}`
}

export function DramasGridClient({ searchParams, dramaSearchParams }: DramasGridClientProps) {
  const { data, error, isLoading } = useDramas(dramaSearchParams)

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-2">Error Loading Dramas</h2>
        <p className="text-muted-foreground mb-4">Failed to load drama data. Please try again.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  const dramas = data?.dramas || []

  if (!dramas.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-2">No Dramas Found</h2>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {dramas.map((drama) => {
        const slug = createSlug(drama.title, drama.id)
        const href = `/${slug}?${stringifySearchParams(searchParams)}`
        
        return (
          <Link key={drama.id} href={href} className="group">
            <div className="space-y-2">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={drama.poster || '/placeholder-poster.jpg'}
                  alt={drama.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16.66vw, 14.28vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                {drama.rating > 0 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    ⭐ {drama.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {drama.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {drama.year} • {drama.country}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}