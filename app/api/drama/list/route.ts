import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '28');
    const query = searchParams.get('query') || '';

    // Get reference to drama_korea collection
    const dramasRef = db.collection('drama_korea');
    
    // Build query based on search parameters
    let baseQuery: any = dramasRef;
    
    if (query) {
      // Search in title field
      baseQuery = dramasRef.where('title', '>=', query)
                           .where('title', '<=', query + '\uf8ff');
    }
    
    // Get total count for pagination
    const totalSnapshot = await baseQuery.get();
    const total = totalSnapshot.size;
    
    // Apply pagination
    const offset = (page - 1) * limit;
    const querySnapshot = await baseQuery.offset(offset).limit(limit).get();
    
    // Transform Firestore documents to drama objects
    const dramas: any[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      dramas.push({
        id: doc.id,
        title: data.title || '',
        poster: data.poster || '',
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
        cast: data.cast || [],
        language: data.language || '',
        tags: data.tags || []
      });
    });

    return NextResponse.json({
      dramas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error('Error fetching dramas from drama_korea collection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dramas' },
      { status: 500 }
    );
  }
}