'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Images, ImageData } from '@/lib/supabase/schema';
import { ImageIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Images Gallery Component
 * Displays backdrops, posters, and logos in a grid layout with lightbox functionality
 * 
 * Props:
 * - images: Images object containing arrays of backdrops, posters, and logos
 * - maxDisplay: Maximum number of images to display per category initially (default: 8)
 */

interface ImagesGalleryProps {
  images: Images;
  maxDisplay?: number;
}

type ImageCategory = 'backdrops' | 'posters' | 'logos';

export function ImagesGallery({ images, maxDisplay = 8 }: ImagesGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [activeCategory, setActiveCategory] = useState<ImageCategory>('backdrops');
  const [showAll, setShowAll] = useState<Record<ImageCategory, boolean>>({
    backdrops: false,
    posters: false,
    logos: false
  });

  if (!images || (!images.backdrops?.length && !images.posters?.length && !images.logos?.length)) {
    return (
      <div className="text-center py-8">
        <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Images not available</p>
      </div>
    );
  }

  const categories = [
    { key: 'backdrops' as ImageCategory, label: 'Backdrops', images: images.backdrops || [] },
    { key: 'posters' as ImageCategory, label: 'Posters', images: images.posters || [] },
    { key: 'logos' as ImageCategory, label: 'Logos', images: images.logos || [] }
  ].filter(category => category.images.length > 0);

  const getImageUrl = (imagePath: string, size: string = 'w500') => {
    return `https://image.tmdb.org/t/p/${size}${imagePath}`;
  };

  const getImageAspectRatio = (category: ImageCategory) => {
    switch (category) {
      case 'backdrops':
        return 'aspect-video'; // 16:9
      case 'posters':
        return 'aspect-[2/3]'; // 2:3
      case 'logos':
        return 'aspect-video'; // Variable, but use 16:9 as default
      default:
        return 'aspect-square';
    }
  };

  const toggleShowAll = (category: ImageCategory) => {
    setShowAll(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const getDisplayImages = (categoryImages: ImageData[], category: ImageCategory) => {
    return showAll[category] ? categoryImages : categoryImages.slice(0, maxDisplay);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Images</h2>
      
      {/* Category tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeCategory === category.key
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {category.label} ({category.images.length})
          </button>
        ))}
      </div>

      {/* Images grid */}
      {categories.map((category) => {
        if (activeCategory !== category.key) return null;
        
        const displayImages = getDisplayImages(category.images, category.key);
        const aspectRatio = getImageAspectRatio(category.key);
        
        return (
          <div key={category.key}>
            <div className={`grid gap-4 ${
              category.key === 'posters' 
                ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
                : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
            }`}>
              {displayImages.map((image, index) => (
                <div
                  key={`${image.file_path}-${index}`}
                  className="group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className={`relative ${aspectRatio} bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden`}>
                    <Image
                      src={getImageUrl(image.file_path)}
                      alt={`${category.label} ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                      sizes={category.key === 'posters' ? '(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw' : '(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    {image.vote_average && image.vote_average > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        ★ {image.vote_average.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show more/less button */}
            {category.images.length > maxDisplay && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => toggleShowAll(category.key)}
                >
                  {showAll[category.key] 
                    ? 'Show Less' 
                    : `Show All ${category.images.length} ${category.label}`
                  }
                </Button>
              </div>
            )}
          </div>
        );
      })}

      {/* Lightbox modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <XIcon className="w-8 h-8" />
            </button>
            <div className="relative max-h-[90vh] max-w-[90vw]">
              <Image
                src={getImageUrl(selectedImage.file_path, 'original')}
                alt="Full size image"
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-h-[90vh] max-w-[90vw] object-contain"
                loading="lazy"
              />
            </div>
            {selectedImage.vote_average && selectedImage.vote_average > 0 && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded">
                Rating: ★ {selectedImage.vote_average.toFixed(1)} ({selectedImage.vote_count} votes)
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}