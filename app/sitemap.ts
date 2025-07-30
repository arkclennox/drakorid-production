import { MetadataRoute } from 'next'
import { fetchDramasWithPagination } from '@/lib/api/drama-queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://drakorid.vercel.app'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  try {
    // Get all dramas for dynamic pages
    const dramaResponse = await fetchDramasWithPagination({ 
      page: 1, 
      limit: 1000 // Get a large number to include all dramas
    })

    const dramaPages: MetadataRoute.Sitemap = dramaResponse.dramas.map((drama) => ({
      url: `${baseUrl}/${drama.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...dramaPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return at least static pages if drama fetching fails
    return staticPages
  }
}