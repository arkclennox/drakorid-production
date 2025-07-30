import Link from 'next/link';
import { DramaGridItem } from '@/lib/supabase/schema';
import { SearchParams, stringifySearchParams } from '@/lib/url-state';
import Image from 'next/image';

export async function DramasGrid({
  dramas,
  searchParams,
}: {
  dramas: DramaGridItem[];
  searchParams: SearchParams;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {!dramas?.length ? (
        <p className="text-center text-muted-foreground col-span-full">
          No dramas found.
        </p>
      ) : (
        dramas.map((drama, index) => (
          <DramaLink
            key={drama.id}
            priority={index < 10}
            drama={drama}
            searchParams={searchParams}
          />
        ))
      )}
    </div>
  );
}

// Keep the old BooksGrid for backward compatibility during migration
export async function BooksGrid({
  books,
  searchParams,
}: {
  books: any[];
  searchParams: SearchParams;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      <p className="text-center text-muted-foreground col-span-full">
        Books feature deprecated. Please use dramas.
      </p>
    </div>
  );
}

function DramaLink({
  priority,
  drama,
  searchParams,
}: {
  priority: boolean;
  drama: DramaGridItem;
  searchParams: SearchParams;
}) {
  let noFilters = Object.values(searchParams).every((v) => v === undefined);

  return (
    <Link
      href={`/${drama.id}?${stringifySearchParams(searchParams)}`}
      key={drama.id}
      className="block transition ease-in-out md:hover:scale-105"
      prefetch={noFilters ? true : null}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
        <Image
          src={drama.poster}
          alt={drama.title}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16.66vw, 14.28vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2">
          <h3 className="text-white text-sm font-medium line-clamp-2 leading-tight">
            {drama.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
