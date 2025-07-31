'use client'

import { useDramas } from '@/lib/hooks/use-dramas'
import { DramaSearchParams } from '@/lib/api/drama-queries'
import { SearchParams } from '@/lib/url-state'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationClientProps {
  searchParams: SearchParams
  dramaSearchParams: DramaSearchParams
}

export function PaginationClient({ searchParams, dramaSearchParams }: PaginationClientProps) {
  const { data, isLoading } = useDramas(dramaSearchParams)
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  
  if (isLoading || !data) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse bg-muted h-10 w-64 rounded"></div>
      </div>
    )
  }

  const { pagination } = data
  const { currentPage, totalPages, totalResults } = pagination

  if (totalPages <= 1) {
    return null
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(urlSearchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    return `?${params.toString()}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="text-sm text-muted-foreground">
        Showing {((currentPage - 1) * dramaSearchParams.limit!) + 1} to{' '}
        {Math.min(currentPage * dramaSearchParams.limit!, totalResults)} of{' '}
        {totalResults.toLocaleString()} results
      </div>
      
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                href={createPageUrl(currentPage - 1)}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(createPageUrl(currentPage - 1))
                }}
              />
            </PaginationItem>
          )}
          
          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={createPageUrl(page as number)}
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    router.push(createPageUrl(page as number))
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                href={createPageUrl(currentPage + 1)}
                onClick={(e) => {
                  e.preventDefault()
                  router.push(createPageUrl(currentPage + 1))
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}