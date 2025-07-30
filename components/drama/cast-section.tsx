import Image from 'next/image';
import { CastMember } from '@/lib/supabase/schema';
import { UsersIcon } from 'lucide-react';

/**
 * Cast Section Component
 * Displays the main cast members with their profile images, names, and characters
 * 
 * Props:
 * - cast: Array of CastMember objects containing actor information
 * - maxDisplay: Maximum number of cast members to display (default: 10)
 */

interface CastSectionProps {
  cast: CastMember[];
  maxDisplay?: number;
}

export function CastSection({ cast, maxDisplay = 10 }: CastSectionProps) {
  if (!cast || cast.length === 0) {
    return (
      <div className="text-center py-8">
        <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Cast information not available</p>
      </div>
    );
  }

  const displayCast = cast.slice(0, maxDisplay);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayCast.map((member) => (
          <div key={member.id} className="text-center">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 mb-2">
              {member.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                  alt={member.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UsersIcon className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <h3 className="font-medium text-sm mb-1 line-clamp-2">{member.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2">{member.character}</p>
          </div>
        ))}
      </div>
      {cast.length > maxDisplay && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          And {cast.length - maxDisplay} more cast members...
        </p>
      )}
    </div>
  );
}