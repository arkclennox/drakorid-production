import Image from 'next/image';
import Link from 'next/link';
import { Drama } from '@/lib/supabase/schema';
import { StarIcon, CalendarIcon, HeartIcon } from 'lucide-react';

/**
 * Recommendations Section Component
 * Displays similar dramas as clickable cards linking to their detail pages
 * 
 * Props:
 * - recommendations: Array of Drama objects for recommended shows
 * - maxDisplay: Maximum number of recommendations to display (default: 8)
 */

interface RecommendationsSectionProps {
  recommendations: Drama[];
  maxDisplay?: number;
}

export function RecommendationsSection({ recommendations, maxDisplay = 8 }: RecommendationsSectionProps) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <HeartIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">No recommendations available</p>
      </div>
    );
  }

  const displayRecommendations = recommendations.slice(0, maxDisplay);

  const formatYear = (dateString: string) => {
    if (!dateString) return 'TBA';
    try {
      return new Date(dateString).getFullYear().toString();
    } catch {
      return dateString;
    }
  };

  const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">You Might Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {displayRecommendations.map((drama) => (
          <Link
            key={drama.id}
            href={`/${drama.id}`}
            className="group block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-800">
              {drama.poster ? (
                <Image
                  src={drama.poster.startsWith('http') ? drama.poster : `https://image.tmdb.org/t/p/w342${drama.poster}`}
                  alt={drama.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <HeartIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              
              {/* Rating overlay */}
              {drama.rating > 0 && (
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{formatRating(drama.rating)}</span>
                </div>
              )}
              
              {/* Status badge */}
              {drama.status && (
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {drama.status}
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h3 className="font-medium text-sm line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {drama.title}
              </h3>
              
              <div className="space-y-1">
                {/* Release year */}
                {drama.release_date && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{formatYear(drama.release_date)}</span>
                  </div>
                )}
                
                {/* Country */}
                {drama.country && (
                  <p className="text-xs text-muted-foreground">
                    {drama.country}
                  </p>
                )}
                
                {/* Genres */}
                {drama.genre && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {drama.genre.split(',').slice(0, 2).map((g: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {g.trim()}
                      </span>
                    ))}
                    {drama.genre.split(',').length > 2 && (
                      <span className="text-xs text-muted-foreground">+{drama.genre.split(',').length - 2}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Overview preview */}
              {drama.overview && (
                <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                  {drama.overview}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {recommendations.length > maxDisplay && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          And {recommendations.length - maxDisplay} more recommendations...
        </p>
      )}
    </div>
  );
}