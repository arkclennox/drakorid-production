// Firebase Firestore schema types for drama data

// Cast member interface
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  order?: number;
}

// Crew member interface
export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string;
}

// Video interface
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

// Image data interface
export interface ImageData {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

// Images interface
export interface Images {
  backdrops: ImageData[];
  logos: ImageData[];
  posters: ImageData[];
}

// Episode interface
export interface Episode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

// Season interface
export interface Season {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_count: number;
  poster_path?: string;
  season_number: number;
  episodes?: Episode[];
}

// Keyword interface
export interface Keyword {
  id: number;
  name: string;
}

// External IDs interface
export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
}

// Main Drama interface
export interface Drama {
  id: string;
  title: string;
  poster: string;
  overview: string;
  year: number;
  rating: number;
  country: string;
  genre: string;
  status: string;
  release_date?: string;
  episodes?: number;
  duration?: string;
  director?: string;
  cast?: CastMember[];
  crew?: CrewMember[];
  language?: string;
  tags?: string[];
  videos?: Video[];
  images?: Images;
  seasons?: Season[];
  keywords?: Keyword[];
  external_ids?: ExternalIds;
  recommendations?: Drama[];
  backdrop_path?: string;
  original_title?: string;
  original_language?: string;
  popularity?: number;
  vote_count?: number;
  adult?: boolean;
  homepage?: string;
  tagline?: string;
  production_companies?: any[];
  production_countries?: any[];
  spoken_languages?: any[];
  created_by?: any[];
  languages?: any[];
  origin_country?: any[];
}

// Grid item interface for listing views
export interface DramaGridItem {
  id: string;
  title: string;
  poster: string;
  year: number;
  rating: number;
  country: string;
  genre: string;
}

// Search response interface
export interface DramaSearchResponse {
  dramas: DramaGridItem[];
  total: number;
  page: number;
  totalPages: number;
}

// Search parameters interface
export interface DramaSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  genre?: string;
  country?: string;
  rating?: string;
  status?: string;
}