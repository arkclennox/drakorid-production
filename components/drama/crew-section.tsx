import Image from 'next/image';
import { CrewMember } from '@/lib/supabase/schema';
import { UserIcon } from 'lucide-react';

/**
 * Crew Section Component
 * Displays key crew members like directors, writers, producers, etc.
 * 
 * Props:
 * - crew: Array of CrewMember objects containing crew information
 * - keyJobs: Array of job titles to prioritize (default: ['Director', 'Writer', 'Producer'])
 */

interface CrewSectionProps {
  crew: CrewMember[];
  keyJobs?: string[];
}

export function CrewSection({ crew, keyJobs = ['Director', 'Writer', 'Producer', 'Executive Producer'] }: CrewSectionProps) {
  if (!crew || crew.length === 0) {
    return (
      <div className="text-center py-8">
        <UserIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Crew information not available</p>
      </div>
    );
  }

  // Filter and group crew by key jobs
  const keyCrew = crew.filter(member => keyJobs.includes(member.job));
  
  // Group by job
  const groupedCrew = keyCrew.reduce((acc, member) => {
    if (!acc[member.job]) {
      acc[member.job] = [];
    }
    acc[member.job].push(member);
    return acc;
  }, {} as Record<string, CrewMember[]>);

  if (Object.keys(groupedCrew).length === 0) {
    return (
      <div className="text-center py-8">
        <UserIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Key crew information not available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Crew</h2>
      <div className="space-y-6">
        {keyJobs.map(job => {
          const members = groupedCrew[job];
          if (!members || members.length === 0) return null;
          
          return (
            <div key={job}>
              <h3 className="text-lg font-medium mb-3">{job}{members.length > 1 ? 's' : ''}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {members.map((member) => (
                  <div key={`${member.id}-${member.job}`} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800 flex-shrink-0">
                      {member.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w92${member.profile_path}`}
                          alt={member.name}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}