import { Drama, DramaGridItem } from '@/lib/firebase/schema';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';

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
    // Import Firebase Admin here to avoid issues with server-side rendering
    const { db } = await import('@/lib/firebase/admin');
    
    const dramasCollection = db.collection('drama_korea');
    
    // Build query with proper typing
    let baseQuery: Query<DocumentData> | CollectionReference<DocumentData> = dramasCollection;
    
    // Apply filters
    if (filters.genre) {
      baseQuery = (baseQuery as CollectionReference<DocumentData>).where('genres', 'array-contains', filters.genre);
    }
    if (filters.year) {
      baseQuery = (baseQuery as Query<DocumentData>).where('year', '==', parseInt(filters.year));
    }
    if (filters.country) {
      baseQuery = (baseQuery as Query<DocumentData>).where('country', '==', filters.country);
    }
    if (filters.status) {
      baseQuery = (baseQuery as Query<DocumentData>).where('status', '==', filters.status);
    }
    if (filters.rating) {
      const ratingValue = parseFloat(filters.rating);
      baseQuery = (baseQuery as Query<DocumentData>).where('rating', '>=', ratingValue);
    }
    
    // Apply search filter if provided
    if (query) {
      // For simplicity, search in title field
      // In production, you might want to use full-text search
      baseQuery = (baseQuery as Query<DocumentData>)
        .where('title', '>=', query)
        .where('title', '<=', query + '\uf8ff');
    }
    
    // Apply pagination
    const offset = (page - 1) * limit;
    const querySnapshot = await (baseQuery as Query<DocumentData>)
      .offset(offset)
      .limit(limit + 1)
      .get(); // Get one extra to check if there are more
    
    const dramas: DramaGridItem[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      dramas.push({
        id: doc.id,
        title: data.title || '',
        poster: data.poster || '',
        year: data.year || 0,
        rating: data.rating || 0,
        country: data.country || '',
        genre: data.genre || ''
      });
    });
    
    // Check if there are more results by seeing if we got the extra item
    const hasMore = querySnapshot.size > limit;
    if (hasMore) {
      dramas.pop(); // Remove the extra item
    }
    
    // Estimate total based on current page and whether there are more results
    const estimatedTotal = hasMore ? (page * limit) + 1 : (page - 1) * limit + dramas.length;
    
    return {
      dramas,
      total: estimatedTotal,
      page,
      limit,
      totalPages: hasMore ? page + 1 : page // Conservative estimate
    };
  } catch (error) {
    console.error('Error fetching dramas:', error);
    // Return empty result on error
    return {
      dramas: [],
      total: 0,
      page,
      limit,
      totalPages: 0
    };
  }
}

export async function estimateTotalDramas(query?: string): Promise<number> {
  try {
    // Return a conservative estimate to avoid quota usage
    // In a real app, you might cache this value or use collection group queries
    if (query) {
      // For search queries, return a smaller estimate
      return 50;
    }
    // For all dramas, return a reasonable estimate
    // You can update this number based on your actual collection size
    return 1000;
  } catch (error) {
    console.error('Error estimating total dramas:', error);
    return 0;
  }
}

export async function fetchDramaById(id: string): Promise<Drama | null> {
  try {
    // Import Firebase Admin here to avoid issues with server-side rendering
    const { db } = await import('@/lib/firebase/admin');
    
    const dramaDoc = await db.collection('drama_korea').doc(id).get();
    
    if (!dramaDoc.exists) {
      return null;
    }
    
    const data = dramaDoc.data();
    
    return {
      id: dramaDoc.id,
      title: data?.title || '',
      poster: data?.poster || '',
      backdrop_path: data?.backdrop_path,
      overview: data?.overview || '',
      release_date: data?.release_date || '',
      year: data?.year || 0,
      rating: data?.rating || 0,
      vote_count: data?.vote_count,
      genre: data?.genre || '',
      country: data?.country || '',
      duration: data?.duration || '',
      status: data?.status || '',
      episodes: data?.episodes || 0,
      seasons: data?.seasons || []
    };
  } catch (error) {
    console.error('Error fetching drama by ID:', error);
    return null;
  }
}

// Helper function to build search URL with parameters
export function buildSearchUrl(searchParams: DramaSearchParams): string {
  const params = new URLSearchParams();
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
}