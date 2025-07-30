'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import {
  SearchParams,
  parseSearchParams,
  stringifySearchParams,
} from '@/lib/url-state';

const DRAMA_GENRES = [
  'Romance',
  'Comedy',
  'Drama',
  'Thriller',
  'Action',
  'Fantasy',
  'Historical',
  'Crime',
  'Mystery',
  'Slice of Life',
  'Medical',
  'Legal',
  'Family',
  'School',
  'Workplace'
];



interface FilterProps {
  searchParams: URLSearchParams;
}

function FilterBase({ searchParams }: FilterProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialFilters = parseSearchParams(Object.fromEntries(searchParams));
  const [optimisticFilters, setOptimisticFilters] =
    useOptimistic<SearchParams>(initialFilters);

  const updateURL = (newFilters: SearchParams) => {
    const queryString = stringifySearchParams(newFilters);
    router.push(queryString ? `/?${queryString}` : '/');
  };

  const handleFilterChange = (
    filterType: keyof SearchParams,
    value: string | undefined
  ) => {
    startTransition(() => {
      const newFilters = { ...optimisticFilters, [filterType]: value };
      setOptimisticFilters(newFilters);
      updateURL(newFilters);
    });
  };

  const handleGenreToggle = (genre: string) => {
    startTransition(() => {
      // If the genre is already selected, remove it; otherwise, set it
      if (optimisticFilters.genre === genre) {
        handleFilterChange('genre', undefined);
      } else {
        handleFilterChange('genre', genre);
      }
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      setOptimisticFilters({});
      router.push('/');
    });
  };

  return (
    <div
      data-pending={isPending ? '' : undefined}
      className="flex-shrink-0 flex flex-col h-full bg-white"
    >
      <ScrollArea className="flex-grow">
        <div className="p-2 space-y-4">


          <div>
            <Label htmlFor="rating">Minimum Rating</Label>
            <Slider
              id="rating"
              min={0}
              max={5}
              step={0.5}
              value={[Number(optimisticFilters.rtg) || 0]}
              onValueChange={([value]) =>
                handleFilterChange('rtg', value.toString())
              }
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>0</span>
              <span>{optimisticFilters.rtg || 0} stars</span>
              <span>5</span>
            </div>
          </div>



          <div>
            <Label htmlFor="page-range">Number of Pages</Label>
            <Slider
              id="page-range"
              min={1}
              max={1000}
              step={100}
              value={[Number(optimisticFilters.pgs) || 1000]}
              onValueChange={([value]) =>
                handleFilterChange('pgs', value.toString())
              }
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>1</span>
              <span>{optimisticFilters.pgs || 1000}</span>
            </div>
          </div>

          <div>
            <Label>Genre</Label>
            <ScrollArea className="h-[200px] mt-2">
              {DRAMA_GENRES.map((genre) => (
                <div
                  key={genre}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox
                    id={`genre-${genre.toLowerCase()}`}
                    checked={optimisticFilters.genre === genre}
                    onCheckedChange={() => handleGenreToggle(genre)}
                  />
                  <Label htmlFor={`genre-${genre.toLowerCase()}`}>
                    {genre}
                  </Label>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </ScrollArea>

      {Object.keys(optimisticFilters).length > 0 && (
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleClearFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}

export function FilterFallback() {
  return <FilterBase searchParams={new URLSearchParams()} />;
}

export function Filter() {
  const searchParams = useSearchParams();
  return <FilterBase searchParams={searchParams} />;
}
