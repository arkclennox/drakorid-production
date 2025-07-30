'use client';

import { useState } from 'react';
import { Video } from '@/lib/supabase/schema';
import { PlayIcon, VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Videos Section Component
 * Displays trailers and other videos with YouTube embeds
 * 
 * Props:
 * - videos: Array of Video objects containing video information
 * - maxDisplay: Maximum number of videos to display initially (default: 6)
 */

interface VideosSectionProps {
  videos: Video[];
  maxDisplay?: number;
}

export function VideosSection({ videos, maxDisplay = 6 }: VideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-8">
        <VideoIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Videos not available</p>
      </div>
    );
  }

  // Filter and sort videos - prioritize trailers and official content
  const sortedVideos = videos
    .filter(video => video.site === 'YouTube')
    .sort((a, b) => {
      // Prioritize trailers
      if (a.type === 'Trailer' && b.type !== 'Trailer') return -1;
      if (b.type === 'Trailer' && a.type !== 'Trailer') return 1;
      
      // Then prioritize official content
      if (a.official && !b.official) return -1;
      if (b.official && !a.official) return 1;
      
      // Finally sort by published date (newest first)
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });

  const displayVideos = showAll ? sortedVideos : sortedVideos.slice(0, maxDisplay);

  const getVideoThumbnail = (videoKey: string) => {
    return `https://img.youtube.com/vi/${videoKey}/hqdefault.jpg`;
  };

  const getYouTubeEmbedUrl = (videoKey: string) => {
    return `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Videos & Trailers</h2>
      
      {/* Main video player */}
      {selectedVideo && (
        <div className="mb-6">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src={getYouTubeEmbedUrl(selectedVideo.key)}
              title={selectedVideo.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium">{selectedVideo.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedVideo.type} • {selectedVideo.official ? 'Official' : 'Fan-made'}
            </p>
          </div>
        </div>
      )}

      {/* Video thumbnails grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayVideos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={getVideoThumbnail(video.key)}
                alt={video.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                <div className="bg-red-600 rounded-full p-2 group-hover:scale-110 transition-transform duration-200">
                  <PlayIcon className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              {video.type === 'Trailer' && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Trailer
                </div>
              )}
              {video.official && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Official
                </div>
              )}
            </div>
            <div className="mt-2">
              <h4 className="font-medium text-sm line-clamp-2">{video.name}</h4>
              <p className="text-xs text-muted-foreground">{video.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show more/less button */}
      {sortedVideos.length > maxDisplay && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `Show All ${sortedVideos.length} Videos`}
          </Button>
        </div>
      )}
    </div>
  );
}