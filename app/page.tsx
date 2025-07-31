'use client'

import { Suspense } from 'react'
import { DramasGridClient } from '@/components/grid-client'
import { PaginationClient } from '@/components/pagination-client'
import { FiltersClient } from '@/components/filters-client'

import { ITEMS_PER_PAGE } from '@/lib/api/drama-queries'
import { parseSearchParams } from '@/lib/url-state'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const urlSearchParams = useSearchParams()
  const searchParamsObj = Object.fromEntries(urlSearchParams.entries())
  const parsedSearchParams = parseSearchParams(searchParamsObj)

  // Convert SearchParams to DramaSearchParams
  const dramaSearchParams = {
    query: parsedSearchParams.search,
    page: Number(parsedSearchParams.page) || 1,
    limit: ITEMS_PER_PAGE,
    genre: parsedSearchParams.genre,
    rating: parsedSearchParams.rtg,
    year: parsedSearchParams.yr
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Korean Dramas</h1>
        <p className="text-muted-foreground">
          Discover amazing Korean dramas with real-time updates
        </p>
      </div>
      

      {/* Filters */}
      <div className="mb-6">
        <Suspense fallback={<div>Loading filters...</div>}>
          <FiltersClient />
        </Suspense>
      </div>
      
      {/* Drama Grid with Real-time Updates */}
      <Suspense fallback={<div>Loading dramas...</div>}>
        <DramasGridClient 
          searchParams={parsedSearchParams} 
          dramaSearchParams={dramaSearchParams}
        />
      </Suspense>
      
      {/* Pagination */}
      <PaginationClient
        searchParams={parsedSearchParams}
        dramaSearchParams={dramaSearchParams}
      />
    </div>
  )
}
