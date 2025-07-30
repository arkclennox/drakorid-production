import { Suspense } from 'react';
import { DramasGrid } from '@/components/grid';
import { DramaPagination } from '@/components/book-pagination';
import {
  estimateTotalDramas,
  fetchDramasWithPagination,
  ITEMS_PER_PAGE,
} from '@/lib/api/drama-queries';
import { parseSearchParams } from '@/lib/url-state';

export default async function Page(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const parsedSearchParams = parseSearchParams(searchParams);

  // Convert SearchParams to DramaSearchParams
  const dramaSearchParams = {
    query: parsedSearchParams.search,
    page: Number(parsedSearchParams.page) || 1,
    limit: ITEMS_PER_PAGE,
    genre: parsedSearchParams.genre,
    rating: parsedSearchParams.rtg,
    year: parsedSearchParams.yr
  };

  const [dramaResponse, estimatedTotal] = await Promise.all([
    fetchDramasWithPagination(dramaSearchParams),
    estimateTotalDramas(parsedSearchParams.search),
  ]);

  const totalPages = Math.ceil(estimatedTotal / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto min-h-[200px]">
        <div className="group-has-[[data-pending]]:animate-pulse p-4">
          <DramasGrid dramas={dramaResponse.dramas} searchParams={parsedSearchParams} />
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <Suspense fallback={null}>
          <DramaPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={estimatedTotal}
            searchParams={parsedSearchParams}
          />
        </Suspense>
      </div>
    </div>
  );
}
