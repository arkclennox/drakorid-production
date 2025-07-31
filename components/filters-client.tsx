'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDownIcon, FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { updateSearchParams } from '@/lib/url-state'

export const COUNTRIES = [
  { value: 'all', label: 'All Countries' },
  { value: 'kr', label: 'South Korea' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'th', label: 'Thailand' },
  { value: 'tw', label: 'Taiwan' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
]

export const GENRES = [
  { value: 'all', label: 'All Genres' },
  { value: 'romance', label: 'Romance' },
  { value: 'comedy', label: 'Comedy' },
  { value: 'drama', label: 'Drama' },
  { value: 'action', label: 'Action' },
  { value: 'thriller', label: 'Thriller' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'historical', label: 'Historical' },
  { value: 'crime', label: 'Crime' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'horror', label: 'Horror' },
]

export const YEARS = [
  { value: 'all', label: 'All Years' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
]

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
]

export function FiltersClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || 'all')
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || 'all')
  const [selectedYear, setSelectedYear] = useState(searchParams.get('year') || 'all')
  const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || 'popularity')

  useEffect(() => {
    setSelectedCountry(searchParams.get('country') || 'all')
    setSelectedGenre(searchParams.get('genre') || 'all')
    setSelectedYear(searchParams.get('year') || 'all')
    setSelectedSort(searchParams.get('sort') || 'popularity')
  }, [searchParams])

  const updateFilter = (key: string, value: string) => {
    const newParams = updateSearchParams(searchParams, {
      [key]: value === 'all' ? undefined : value,
      page: 1 // Reset to first page when filtering
    })
    router.push(`/?${newParams}`)
  }

  const clearAllFilters = () => {
    const newParams = updateSearchParams(searchParams, {
      country: undefined,
      genre: undefined,
      year: undefined,
      sort: undefined,
      page: 1
    })
    router.push(`/?${newParams}`)
  }

  const hasActiveFilters = selectedCountry !== 'all' || selectedGenre !== 'all' || selectedYear !== 'all'

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <FilterIcon className="w-4 h-4" />
        <span>Filters:</span>
      </div>
      
      {/* Country Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {COUNTRIES.find(c => c.value === selectedCountry)?.label || 'Country'}
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {COUNTRIES.map((country) => (
            <DropdownMenuItem
              key={country.value}
              onClick={() => {
                setSelectedCountry(country.value)
                updateFilter('country', country.value)
              }}
              className={selectedCountry === country.value ? 'bg-accent' : ''}
            >
              {country.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Genre Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {GENRES.find(g => g.value === selectedGenre)?.label || 'Genre'}
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {GENRES.map((genre) => (
            <DropdownMenuItem
              key={genre.value}
              onClick={() => {
                setSelectedGenre(genre.value)
                updateFilter('genre', genre.value)
              }}
              className={selectedGenre === genre.value ? 'bg-accent' : ''}
            >
              {genre.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Year Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {YEARS.find(y => y.value === selectedYear)?.label || 'Year'}
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {YEARS.map((year) => (
            <DropdownMenuItem
              key={year.value}
              onClick={() => {
                setSelectedYear(year.value)
                updateFilter('year', year.value)
              }}
              className={selectedYear === year.value ? 'bg-accent' : ''}
            >
              {year.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {SORT_OPTIONS.find(s => s.value === selectedSort)?.label || 'Sort'}
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {SORT_OPTIONS.map((sort) => (
            <DropdownMenuItem
              key={sort.value}
              onClick={() => {
                setSelectedSort(sort.value)
                updateFilter('sort', sort.value)
              }}
              className={selectedSort === sort.value ? 'bg-accent' : ''}
            >
              {sort.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      )}
    </div>
  )
}