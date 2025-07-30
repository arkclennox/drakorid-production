'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Season, Episode } from '@/lib/supabase/schema';
import { ChevronDownIcon, ChevronRightIcon, CalendarIcon, StarIcon, TvIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/**
 * Episodes Section Component
 * Displays episodes grouped by seasons with collapsible functionality
 * 
 * Props:
 * - seasons: Array of Season objects containing episode information
 * - defaultOpenSeasons: Number of seasons to keep open by default (default: 1)
 */

interface EpisodesSectionProps {
  seasons: Season[];
  defaultOpenSeasons?: number;
}

export function EpisodesSection({ seasons, defaultOpenSeasons = 1 }: EpisodesSectionProps) {
  const [openSeasons, setOpenSeasons] = useState<Set<number>>(
    new Set(seasons.slice(0, defaultOpenSeasons).map(s => s.season_number))
  );

  if (!seasons || seasons.length === 0) {
    return (
      <div className="text-center py-8">
        <TvIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Episode information not available</p>
      </div>
    );
  }

  const toggleSeason = (seasonNumber: number) => {
    const newOpenSeasons = new Set(openSeasons);
    if (newOpenSeasons.has(seasonNumber)) {
      newOpenSeasons.delete(seasonNumber);
    } else {
      newOpenSeasons.add(seasonNumber);
    }
    setOpenSeasons(newOpenSeasons);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
      <div className="space-y-4">
        {seasons
          .sort((a, b) => a.season_number - b.season_number)
          .map((season) => {
            const isOpen = openSeasons.has(season.season_number);
            const episodes = season.episodes || [];
            
            return (
              <div key={season.id} className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
                <Collapsible open={isOpen} onOpenChange={() => toggleSeason(season.season_number)}>
                  <CollapsibleTrigger asChild>
                    <div className="cursor-pointer hover:bg-muted/50 transition-colors p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {season.poster_path && (
                            <div className="relative w-16 h-24 overflow-hidden rounded bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                              <Image
                                src={`https://image.tmdb.org/t/p/w154${season.poster_path}`}
                                alt={season.name}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="64px"
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold">{season.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>{season.episode_count} episodes</span>
                              {season.air_date && (
                                <div className="flex items-center space-x-1">
                                  <CalendarIcon className="w-4 h-4" />
                                  <span>{formatDate(season.air_date)}</span>
                                </div>
                              )}
                            </div>
                            {season.overview && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {season.overview}
                              </p>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          {isOpen ? (
                            <ChevronDownIcon className="w-4 h-4" />
                          ) : (
                            <ChevronRightIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-6">
                      {episodes.length > 0 ? (
                        <div className="space-y-3">
                          {episodes
                            .sort((a, b) => a.episode_number - b.episode_number)
                            .map((episode) => (
                              <div key={episode.id} className="flex space-x-4 p-3 rounded-lg border">
                                {episode.still_path && (
                                  <div className="relative w-24 h-14 overflow-hidden rounded bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                                    <Image
                                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                                      alt={episode.name}
                                      fill
                                      className="object-cover"
                                      loading="lazy"
                                      sizes="96px"
                                    />
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-medium text-sm">
                                        {episode.episode_number}. {episode.name}
                                      </h4>
                                      <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                                        {episode.air_date && (
                                          <div className="flex items-center space-x-1">
                                            <CalendarIcon className="w-3 h-3" />
                                            <span>{formatDate(episode.air_date)}</span>
                                          </div>
                                        )}
                                        {episode.vote_average && episode.vote_average > 0 && (
                                          <div className="flex items-center space-x-1">
                                            <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            <span>{episode.vote_average.toFixed(1)}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  {episode.overview && (
                                    <p className="text-xs text-muted-foreground mt-2 line-clamp-3">
                                      {episode.overview}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No episode details available for this season
                        </p>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
      </div>
    </div>
  );
}