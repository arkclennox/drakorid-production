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
import { fetchUniqueGenres } from '@/lib/api/drama-queries'

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

// Dynamic genres will be loaded from Supabase
interface GenreOption {
  value: string;
  label: string;
}

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
  const [genres, setGenres] = useState<GenreOption[]>([{ value: 'all', label: 'All Genres' }])
  const [isLoadingGenres, setIsLoadingGenres] = useState(true)

  // Load genres from Supabase
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoadingGenres(true)
        const uniqueGenres = await fetchUniqueGenres()
        
        const genreOptions: GenreOption[] = [
          { value: 'all', label: 'All Genres' },
          ...uniqueGenres.map(genre => ({
            value: genre,
            label: genre.charAt(0).toUpperCase() + genre.slice(1)
          }))
        ]
        
        setGenres(genreOptions)
      } catch (error) {
        console.error('Error loading genres:', error)
      } finally {
        setIsLoadingGenres(false)
      }
    }
    
    loadGenres()
  }, [])

  useEffect(() => {
    setSelectedCountry(searchParams.get('country') || 'all')
    setSelectedGenre(searchParams.get('genre') || 'all')
    setSelectedYear(searchParams.get('year') || 'all')
    setSelectedSort(searchParams.get('sort') || 'popularity')
  }, [searchParams])

  const updateFilter = (key: string, value: string) => {
    const newParams = updateSearchParams(searchParams, {
      [key]: value === 'all' ? undefined : value,
      page: '1' // Reset to first page when filtering
    })
    router.push(`/?${newParams}`)
  }

  const clearAllFilters = () => {
    const newParams = updateSearchParams(searchParams, {
      country: undefined,
      genre: undefined,
      year: undefined,
      sort: undefined,
      page: '1'
    })
    router.push(`/?${newParams}`)
  }

  const hasActiveFilters = selectedCountry !== 'all' || selectedGenre !== 'all' || selectedYear !== 'all'

  return null
}