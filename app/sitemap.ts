import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.rflect.xyz"
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
        url: `${baseUrl}/main`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      },
  ]
}