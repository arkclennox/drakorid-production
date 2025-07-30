'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { SearchParams, stringifySearchParams } from '@/lib/url-state';

function NavigationButton({
  searchParams,
  pageNumber,
  disabled,
  children,
}: {
  searchParams: SearchParams;
  pageNumber: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleClick = () => {
    const newParams = { ...searchParams, page: pageNumber.toString() };
    const queryString = stringifySearchParams(newParams);
    router.push(queryString ? `/?${queryString}` : '/');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

export function DramaPagination({
  currentPage,
  totalPages,
  totalResults,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  searchParams: SearchParams;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between">
        <PaginationItem>
          <NavigationButton
            searchParams={searchParams}
            pageNumber={Math.max(1, currentPage - 1)}
            disabled={currentPage <= 1}
          >
            ←
          </NavigationButton>
        </PaginationItem>

        <div className="text-sm text-muted-foreground">
          {totalResults.toLocaleString()} results (
          {currentPage.toLocaleString()} of {totalPages.toLocaleString()})
        </div>

        <PaginationItem>
          <NavigationButton
            searchParams={searchParams}
            pageNumber={Math.min(totalPages, currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            →
          </NavigationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function BookPagination({
  currentPage,
  totalPages,
  totalResults,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  searchParams: SearchParams;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between">
        <PaginationItem>
          <NavigationButton
            searchParams={searchParams}
            pageNumber={Math.max(1, currentPage - 1)}
            disabled={currentPage <= 1}
          >
            ←
          </NavigationButton>
        </PaginationItem>

        <div className="text-sm text-muted-foreground">
          {totalResults.toLocaleString()} results (
          {currentPage.toLocaleString()} of {totalPages.toLocaleString()})
        </div>

        <PaginationItem>
          <NavigationButton
            searchParams={searchParams}
            pageNumber={Math.min(totalPages, currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            →
          </NavigationButton>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
