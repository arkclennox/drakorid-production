'use client'

import { DramaDetailClient } from '@/components/drama-detail-client'
import { parseSearchParams } from '@/lib/url-state'
import { useSearchParams } from 'next/navigation'
import type { Metadata } from 'next'

// Function to extract ID from slug
function extractIdFromSlug(slug: string): string {
  // If it's already just an ID (for backward compatibility)
  if (!slug.includes('-')) {
    return slug
  }
  
  // Extract ID from slug format: sinopsis-title-id
  const parts = slug.split('-')
  return parts[parts.length - 1] // Get the last part which should be the ID
}

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const searchParams = useSearchParams()
  const parsedSearchParams = parseSearchParams(searchParams)
  const dramaId = extractIdFromSlug(params.id)

  return (
    <DramaDetailClient 
      id={dramaId} 
      searchParams={parsedSearchParams}
    />
  )
}
