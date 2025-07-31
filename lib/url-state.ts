export interface SearchParams {
  search?: string;
  country?: string;
  genre?: string;
  year?: string;
  sort?: string;
  page?: string;
  yr?: string;
  rtg?: string;
  lng?: string;
  pgs?: string;
  isbn?: string;
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined> | URLSearchParams
): SearchParams {
  // Handle URLSearchParams
  if (params instanceof URLSearchParams) {
    return {
      search: params.get('search') || undefined,
      country: params.get('country') || undefined,
      genre: params.get('genre') || undefined,
      year: params.get('year') || undefined,
      sort: params.get('sort') || undefined,
      page: params.get('page') || undefined,
      yr: params.get('yr') || undefined,
      rtg: params.get('rtg') || undefined,
      lng: params.get('lng') || undefined,
      pgs: params.get('pgs') || undefined,
      isbn: params.get('isbn') || undefined,
    };
  }
  
  // Handle Record object
  return {
    search: typeof params.search === 'string' ? params.search : undefined,
    country: typeof params.country === 'string' ? params.country : undefined,
    genre: typeof params.genre === 'string' ? params.genre : undefined,
    year: typeof params.year === 'string' ? params.year : undefined,
    sort: typeof params.sort === 'string' ? params.sort : undefined,
    page: typeof params.page === 'string' ? params.page : undefined,
    yr: Array.isArray(params.yr) ? params.yr[0] : params.yr,
    rtg: typeof params.rtg === 'string' ? params.rtg : undefined,
    lng: typeof params.lng === 'string' ? params.lng : undefined,
    pgs: Array.isArray(params.pgs) ? params.pgs[0] : params.pgs,
    isbn: typeof params.isbn === 'string' ? params.isbn : undefined,
  };
}

export function updateSearchParams(
  currentParams: URLSearchParams,
  updates: Partial<SearchParams>
): string {
  const newParams = new URLSearchParams(currentParams);
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });
  
  return newParams.toString();
}

export function stringifySearchParams(params: SearchParams): string {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlParams.append(key, value);
    }
  });
  return urlParams.toString();
}
