import { NextRequest, NextResponse } from 'next/server';
import { db, Drama } from '@/lib/firebase/admin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get reference to drama_korea collection
    const dramasRef = db.collection('drama_korea');
    
    // Build query based on search parameters
    let querySnapshot;
    let totalSnapshot;
    
    if (query) {
      // Firestore doesn't support full-text search natively, so we'll use array-contains for tags
      // For better search, consider using Algolia or similar service
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      const searchQuery = dramasRef.where('tags', 'array-contains-any', searchTerms);
      
      // Get total count for pagination
      totalSnapshot = await searchQuery.get();
      
      // Apply pagination
      const offset = (page - 1) * limit;
      querySnapshot = await searchQuery.offset(offset).limit(limit).get();
    } else {
      // No search query - get all dramas
      totalSnapshot = await dramasRef.get();
      
      // Apply pagination
      const offset = (page - 1) * limit;
      querySnapshot = await dramasRef.offset(offset).limit(limit).get();
    }
    
    const total = totalSnapshot.size;
    
    // Transform Firestore documents to drama objects
    const dramas: Drama[] = [];
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
    console.error('Error fetching dramas from Firestore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dramas' },
      { status: 500 }
    );
  }
}