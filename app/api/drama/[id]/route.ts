import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Drama ID is required' },
        { status: 400 }
      );
    }

    // Get drama document from Firestore
    const dramaDoc = await db.collection('drama_korea').doc(id).get();
    
    if (!dramaDoc.exists) {
      return NextResponse.json(
        { error: 'Drama not found' },
        { status: 404 }
      );
    }

    const data = dramaDoc.data();
    
    const drama = {
      id: dramaDoc.id,
      title: data?.title || '',
      poster: data?.poster || '',
      backdrop_path: data?.backdrop_path || '',
      overview: data?.overview || '',
      release_date: data?.release_date || '',
      first_air_date: data?.first_air_date || '',
      last_air_date: data?.last_air_date || '',
      rating: data?.rating || data?.vote_average || 0,
      vote_average: data?.vote_average || 0,
      vote_count: data?.vote_count || 0,
      genre: data?.genre || data?.genres || [],
      country: data?.country || '',
      duration: data?.duration || data?.runtime || 0,
      status: data?.status || '',
      tagline: data?.tagline || '',
      number_of_seasons: data?.number_of_seasons || 0,
      number_of_episodes: data?.number_of_episodes || 0,
      production_companies: data?.production_companies || [],
      networks: data?.networks || [],
      created_by: data?.created_by || [],
      languages: data?.languages || data?.spoken_languages || [],
      origin_country: data?.origin_country || [],
      original_language: data?.original_language || '',
      popularity: data?.popularity || 0,
      adult: data?.adult || false,
      homepage: data?.homepage || '',
      // Cast and Crew
      cast: data?.cast || data?.credits?.cast || [],
      crew: data?.crew || data?.credits?.crew || [],
      // Episodes by season
      episodes: data?.episodes || data?.seasons || [],
      // Media content
      videos: data?.videos || data?.videos?.results || [],
      images: data?.images || {
        backdrops: data?.images?.backdrops || [],
        posters: data?.images?.posters || [],
        logos: data?.images?.logos || []
      },
      // Additional metadata
      keywords: data?.keywords || data?.keywords?.results || [],
      recommendations: data?.recommendations || data?.recommendations?.results || [],
      external_ids: data?.external_ids || {
        imdb_id: data?.external_ids?.imdb_id || '',
        facebook_id: data?.external_ids?.facebook_id || '',
        instagram_id: data?.external_ids?.instagram_id || '',
        twitter_id: data?.external_ids?.twitter_id || ''
      }
    };

    return NextResponse.json({ drama });

  } catch (error) {
    console.error('Error fetching drama by ID from Firestore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch drama' },
      { status: 500 }
    );
  }
}