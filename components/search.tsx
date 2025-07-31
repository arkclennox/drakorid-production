'use client';

import { useRef, useEffect, useState } from 'react';
import { SearchIcon, Home } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/use-debounce';

function SearchBase({ initialQuery }: { initialQuery: string }) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debouncedValue = useDebounce(inputValue, 300);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsLoading(true);
  }

  useEffect(() => {
    if (debouncedValue !== initialQuery) {
      const newUrl = debouncedValue 
        ? `/?search=${encodeURIComponent(debouncedValue)}`
        : '/';
      router.push(newUrl);
      setIsLoading(false);
    }
  }, [debouncedValue, router, initialQuery]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, []);

  return (
    <div className="relative flex flex-1 flex-shrink-0 w-full rounded shadow-sm">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        onChange={handleInputChange}
        type="text"
        name="search"
        id="search"
        placeholder="Search dramas..."
        value={inputValue}
        className="w-full border-0 px-10 py-6 text-base md:text-sm overflow-hidden focus-visible:ring-0"
      />
      <LoadingSpinner isLoading={isLoading} />
      <HomeButton />
    </div>
  );
}

function LoadingSpinner({ isLoading }: { isLoading: boolean }) {

  return (
    <div
      data-pending={isLoading ? '' : undefined}
      className="absolute right-12 top-1/2 -translate-y-1/2 transition-opacity duration-300"
    >
      <svg className="h-5 w-5" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray="282.7"
          strokeDashoffset="282.7"
          className={isLoading ? 'animate-fill-clock' : ''}
          transform="rotate(-90 50 50)"
        />
      </svg>
    </div>
  );
}

function HomeButton() {
  const router = useRouter();
  
  const handleHomeClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleHomeClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors duration-200"
      title="Go to Home"
      aria-label="Go to Home"
    >
      <Home className="h-4 w-4 text-muted-foreground hover:text-foreground" />
    </button>
  );
}

export function SearchFallback() {
  return <SearchBase initialQuery="" />;
}

export function Search() {
  let query = useSearchParams().get('search') ?? '';
  return <SearchBase initialQuery={query} />;
}
