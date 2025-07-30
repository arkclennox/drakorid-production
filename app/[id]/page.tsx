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
  const dramaResponse = await fetchDramasWithPagination({ page: 1, limit: 10 });

  return dramaResponse.dramas.map((drama) => ({
    id: drama.id.toString(),
  }));
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
                src={drama.poster}
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

              {/* Quick Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Genres */}
                {drama.genre && (
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-1">
                      {drama.genre.split(',').slice(0, 3).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                        >
                          {genre.trim()}
                        </span>
                      ))}
                      {drama.genre.split(',').length > 3 && (
                        <span className="text-xs text-blue-600 dark:text-blue-400">+{drama.genre.split(',').length - 3}</span>
                      )}
                    </div>
                  </div>
                )}



                {/* Episodes/Seasons */}
                {((drama.seasons && drama.seasons.length > 0) || (drama.episodes && drama.episodes > 0)) && (
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-200 mb-2">Series Info</h3>
                    <div className="space-y-1">
                      {drama.seasons && drama.seasons.length > 0 && (
                        <div className="flex items-center text-sm">
                          <TvIcon className="w-4 h-4 mr-1 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-800 dark:text-purple-200">{drama.seasons.length} Seasons</span>
                        </div>
                      )}
                      {drama.episodes && drama.episodes > 0 && (
                        <div className="flex items-center text-sm">
                          <PlayIcon className="w-4 h-4 mr-1 text-purple-600 dark:text-purple-400" />
                          <span className="text-purple-800 dark:text-purple-200">{drama.episodes} Episodes</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Language & Origin */}
                {(drama.original_language || drama.origin_country) && (
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200 mb-2">Origin</h3>
                    <div className="space-y-1">
                      {drama.original_language && (
                        <div className="text-sm text-orange-800 dark:text-orange-200">
                          <span className="font-medium">Language:</span> {drama.original_language.toUpperCase()}
                        </div>
                      )}
                      {drama.origin_country && drama.origin_country.length > 0 && (
                        <div className="text-sm text-orange-800 dark:text-orange-200">
                          <span className="font-medium">Country:</span> {drama.origin_country[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Production Info Cards */}
              {(drama.production_companies || drama.created_by) && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Production</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drama.production_companies && drama.production_companies.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Production Companies</h3>
                        <div className="space-y-2">
                          {drama.production_companies.slice(0, 3).map((company: any, index: number) => (
                            <div key={index} className="text-sm font-medium">
                              {company.name}
                            </div>
                          ))}
                          {drama.production_companies.length > 3 && (
                            <div className="text-xs text-muted-foreground">+{drama.production_companies.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {drama.created_by && drama.created_by.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Created By</h3>
                        <div className="space-y-2">
                          {drama.created_by.slice(0, 3).map((creator: any, index: number) => (
                            <div key={index} className="text-sm font-medium">
                              {creator.name}
                            </div>
                          ))}
                          {drama.created_by.length > 3 && (
                            <div className="text-xs text-muted-foreground">+{drama.created_by.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cast Section */}
              {drama.cast && drama.cast.length > 0 && (
                <CastSection cast={drama.cast} />
              )}

              {/* Crew Section */}
              {drama.crew && drama.crew.length > 0 && (
                <CrewSection crew={drama.crew} />
              )}

              {/* Episodes Section */}
              {drama.seasons && drama.seasons.length > 0 && (
                <EpisodesSection seasons={drama.seasons} />
              )}

              {/* Videos Section */}
              {drama.videos && drama.videos.length > 0 && (
                <VideosSection videos={drama.videos} />
              )}

              {/* Images Gallery */}
              {drama.images && (
                <ImagesGallery images={drama.images} />
              )}

              {/* Keywords Section */}
              {drama.keywords && drama.keywords.length > 0 && (
                <KeywordsSection keywords={drama.keywords} />
              )}

              {/* External Links */}
              {(drama.external_ids || drama.homepage) && (
                <ExternalLinks 
                  externalIds={drama.external_ids || {}} 
                  homepage={drama.homepage}
                />
              )}

              {/* Recommendations Section */}
              {drama.recommendations && drama.recommendations.length > 0 && (
                <RecommendationsSection recommendations={drama.recommendations} />
              )}

              {/* Series Information */}
              {((drama.seasons && drama.seasons.length > 0) || (drama.episodes && drama.episodes > 0) || drama.status) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Series Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {drama.status && (
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Status</p>
                        <span className="px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                          {drama.status}
                        </span>
                      </div>
                    )}

                    {/* Genres */}
                     {drama.genre && (
                       <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                         <p className="text-sm text-muted-foreground mb-2">Genres</p>
                         <div className="flex flex-wrap justify-center gap-1">
                           {drama.genre.split(',').slice(0, 3).map((genre: string, index: number) => (
                             <span
                               key={index}
                               className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium"
                             >
                               {genre.trim()}
                             </span>
                           ))}
                           {drama.genre.split(',').length > 3 && (
                             <span className="text-xs text-muted-foreground">+{drama.genre.split(',').length - 3}</span>
                           )}
                         </div>
                       </div>
                     )}

                    {/* Crew */}
                    {drama.crew && drama.crew.length > 0 && (
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Key Crew</p>
                        <div className="space-y-1">
                          {drama.crew.filter((member: any) => ['Director', 'Producer', 'Writer'].includes(member.job)).slice(0, 3).map((member: any, index: number) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{member.name}</span>
                              <span className="text-muted-foreground text-xs block">{member.job}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {drama.seasons && drama.seasons.length > 0 && (
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Seasons</p>
                        <div className="flex items-center justify-center text-lg font-semibold">
                          <TvIcon className="w-5 h-5 mr-2" />
                          <span>{drama.seasons.length}</span>
                        </div>
                      </div>
                    )}
                    
                    {drama.episodes && drama.episodes > 0 && (
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Episodes</p>
                        <div className="flex items-center justify-center text-lg font-semibold">
                          <PlayIcon className="w-5 h-5 mr-2" />
                          <span>{drama.episodes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Production Information */}
              {(drama.production_companies || drama.created_by) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Production Information</h2>
                  <div className="space-y-4">
                    {drama.production_companies && drama.production_companies.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Production Companies</h3>
                        <div className="flex flex-wrap gap-2">
                          {drama.production_companies.map((company: any, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                            >
                              {company.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    

                    
                    {drama.created_by && drama.created_by.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-2">Created By</h3>
                        <div className="flex flex-wrap gap-2">
                          {drama.created_by.map((creator: any, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm"
                            >
                              {creator.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Language & Origin Information */}
              {(drama.languages || drama.origin_country || drama.original_language) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Language & Origin</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {drama.original_language && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Original Language</p>
                        <p className="font-medium">{drama.original_language.toUpperCase()}</p>
                      </div>
                    )}
                    
                    {drama.languages && drama.languages.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Spoken Languages</p>
                        <div className="flex flex-wrap gap-1">
                          {drama.languages.map((lang: string, index: number) => (
                            <span key={index} className="text-sm font-medium">
                              {lang.toUpperCase()}{index < drama.languages!.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {drama.origin_country && drama.origin_country.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Origin Countries</p>
                        <div className="flex flex-wrap gap-1">
                          {drama.origin_country.map((country: string, index: number) => (
                            <span key={index} className="text-sm font-medium">
                              {country.toUpperCase()}{index < drama.origin_country!.length - 1 && ', '}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              {(drama.adult !== undefined || drama.homepage) && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Additional Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drama.adult !== undefined && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Content Rating</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          drama.adult 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {drama.adult ? 'Adult Content' : 'General Audience'}
                        </span>
                      </div>
                    )}
                    

                  </div>
                </div>
              )}




            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
