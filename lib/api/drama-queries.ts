import { Drama, DramaGridItem } from '@/lib/supabase/schema';
import { getSupabaseClient } from '@/lib/supabase/client';

export const ITEMS_PER_PAGE = 28;

export interface DramaSearchParams {
  query?: string;
  page?: number;
  limit?: number;
  genre?: string;
  country?: string;
  rating?: string;
  status?: string;
  year?: string;
}

export interface DramaSearchResponse {
  dramas: DramaGridItem[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export async function fetchDramasWithPagination(
  searchParams: DramaSearchParams
): Promise<DramaSearchResponse> {
  const { query = '', page = 1, limit = 28, genre, country, rating, status, year } = searchParams;
  const filters = { genre, country, rating, status, year };
  
  try {
    const supabase = getSupabaseClient(false); // Use anon client for reading public data
    
    // Build query - using basic columns that should exist
    let queryBuilder = supabase
      .from('korean_dramas')
      .select('*', { count: 'exact' });
    
    // Apply text search if query exists
    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,overview.ilike.%${query}%`);
    }
    
    // Apply filters
    if (filters.genre) {
      queryBuilder = queryBuilder.ilike('genre', `%${filters.genre}%`);
    }
    if (filters.year) {
      queryBuilder = queryBuilder.eq('year', parseInt(filters.year));
    }
    if (filters.country) {
      queryBuilder = queryBuilder.eq('country', filters.country);
    }
    if (filters.status) {
      queryBuilder = queryBuilder.eq('status', filters.status);
    }
    if (filters.rating) {
      const ratingValue = parseFloat(filters.rating);
      queryBuilder = queryBuilder.gte('rating', ratingValue);
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    queryBuilder = queryBuilder.range(offset, offset + limit - 1);
    
    const { data, error, count } = await queryBuilder;
    
    if (error) {
      console.error('Supabase query error:', error);
      throw new Error('Failed to fetch dramas');
    }
    
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);
    
    // Transform data to DramaGridItem format
    const dramas: DramaGridItem[] = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title || item.name || '',
      poster: item.poster_path || item.poster || item.image || '',
      year: item.year || item.release_year || 0,
      rating: item.rating || item.vote_average || 0,
      country: item.country || item.origin_country || '',
      genre: item.genre || item.genres || '',
      status: item.status || ''
    }));
    
    return {
      dramas,
      total,
      page,
      totalPages,
      limit
    };
  } catch (error) {
    console.error('Error fetching dramas:', error);
    throw error;
  }
}

export async function estimateTotalDramas(query?: string): Promise<number> {
  try {
    const supabase = getSupabaseClient(false); // Use anon client for reading public data
    
    let queryBuilder = supabase
      .from('korean_dramas')
      .select('*', { count: 'exact', head: true });
    
    if (query) {
      queryBuilder = queryBuilder.or(`title.ilike.%${query}%,overview.ilike.%${query}%`);
    }
    
    const { count, error } = await queryBuilder;
    
    if (error) {
      console.error('Error estimating total dramas:', error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error estimating total dramas:', error);
    return 0;
  }
}

export async function fetchDramaById(id: string): Promise<Drama | null> {
  try {
    const supabase = getSupabaseClient(false); // Use anon client for reading public data
    
    const { data, error } = await supabase
      .from('korean_dramas')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Error fetching drama by ID:', error);
      return null;
    }
    
    // Transform Supabase data to Drama format
    const drama: Drama = {
      id: data.id,
      title: data.title || '',
      poster: data.poster_path || '',
      overview: data.overview || '',
      year: data.year || 0,
      rating: data.rating || 0,
      country: data.country || '',
      genre: data.genre || '',
      status: data.status || '',
      release_date: data.release_date || '',
      episodes: data.episodes || 0,
      duration: data.duration || '',
      director: data.director || '',
      artis: data.artis || '',
      direktur: data.direktur || '',
      penulis: data.penulis || '',
      cast: data.cast || [],
      crew: data.crew || [],
      videos: data.videos || [],
      images: data.images || [],
      seasons: data.seasons || [],
      external_ids: data.external_ids || {},
      keywords: data.keywords || [],
      recommendations: data.recommendations || [],
      language: data.language || '',
      tags: data.tags || []
    };
    
    return drama;
  } catch (error) {
    console.error('Error fetching drama by ID:', error);
    return null;
  }
}

export function buildSearchUrl(searchParams: DramaSearchParams): string {
  const params = new URLSearchParams();
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
}