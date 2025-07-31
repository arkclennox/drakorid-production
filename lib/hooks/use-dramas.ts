'use client'

import useSWR from 'swr'
import { useEffect } from 'react'
import { supabaseBrowser } from '@/lib/supabase/client-browser'
import { DramaSearchParams, DramaSearchResponse } from '@/lib/api/drama-queries'
import { Drama } from '@/lib/supabase/schema'

// Fetcher function for SWR
const fetchDramas = async (params: DramaSearchParams): Promise<DramaSearchResponse> => {
  const { query = '', page = 1, limit = 28, genre, country, rating, status, year } = params
  
  try {
    // Build query
    let queryBuilder = supabaseBrowser
      .from('korean_dramas')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
    
    // Apply search filter
    if (query) {
      queryBuilder = queryBuilder.ilike('title', `%${query}%`)
    }
    
    // Apply filters
    if (genre) {
      queryBuilder = queryBuilder.ilike('genre', `%${genre}%`)
    }
    if (country) {
      queryBuilder = queryBuilder.ilike('country', `%${country}%`)
    }
    if (rating) {
      const ratingNum = parseFloat(rating)
      queryBuilder = queryBuilder.gte('rating', ratingNum)
    }
    if (status) {
      queryBuilder = queryBuilder.ilike('status', `%${status}%`)
    }
    if (year) {
      queryBuilder = queryBuilder.eq('year', parseInt(year))
    }
    
    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    queryBuilder = queryBuilder.range(from, to)
    
    const { data, error, count } = await queryBuilder
    
    if (error) {
      console.error('Supabase query error:', error)
      throw new Error('Failed to fetch dramas')
    }
    
    const total = count || 0
    const totalPages = Math.ceil(total / limit)
    
    // Transform data to DramaGridItem format
    const dramas = (data || []).map((item: any) => ({
      id: item.id,
      title: item.title || 'Unknown Title',
      year: item.year || new Date().getFullYear(),
      poster_url: item.poster_url || '/placeholder-poster.jpg',
      rating: item.rating || 0,
      genre: item.genre || 'Unknown',
      country: item.country || 'Unknown',
      status: item.status || 'Unknown'
    }))
    
    return {
      dramas,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    }
  } catch (error) {
    console.error('Error fetching dramas:', error)
    throw error
  }
}

// Hook for fetching dramas with real-time updates
export function useDramas(params: DramaSearchParams) {
  const key = ['dramas', JSON.stringify(params)]
  
  const { data, error, isLoading, mutate } = useSWR(
    key,
    () => fetchDramas(params),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0, // Disable polling, we'll use real-time subscriptions
      dedupingInterval: 2000
    }
  )
  
  // Set up real-time subscription
  useEffect(() => {
    const channel = supabaseBrowser
      .channel('korean_dramas_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'korean_dramas'
        },
        (payload) => {
          console.log('Real-time update:', payload)
          // Revalidate data when changes occur
          mutate()
        }
      )
      .subscribe()
    
    return () => {
      supabaseBrowser.removeChannel(channel)
    }
  }, [mutate])
  
  return {
    data,
    error,
    isLoading,
    mutate
  }
}

// Hook for fetching a single drama by ID
export function useDrama(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    ['drama', id],
    async () => {
      const { data, error } = await supabaseBrowser
        .from('korean_dramas')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error('Error fetching drama by ID:', error)
        throw error
      }
      
      return data as Drama
    },
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0
    }
  )
  
  // Set up real-time subscription for this specific drama
  useEffect(() => {
    if (!id) return
    
    const channel = supabaseBrowser
      .channel(`drama_${id}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'korean_dramas',
          filter: `id=eq.${id}`
        },
        (payload) => {
          console.log('Drama real-time update:', payload)
          mutate()
        }
      )
      .subscribe()
    
    return () => {
      supabaseBrowser.removeChannel(channel)
    }
  }, [id, mutate])
  
  return {
    drama: data,
    error,
    isLoading,
    mutate
  }
}