'use client'

import { DramaDetailClient } from '@/components/drama-detail-client'
import { parseSearchParams } from '@/lib/url-state'
import { useSearchParams } from 'next/navigation'
import type { Metadata } from 'next'



export default function Page({
  params,
}: {
  params: { id: string }
}) {
  const searchParams = useSearchParams()
  const parsedSearchParams = parseSearchParams(searchParams)

  return (
    <DramaDetailClient 
      id={params.id} 
      searchParams={parsedSearchParams}
    />
  )
}
