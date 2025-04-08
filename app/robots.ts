import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.rflect.xyz';
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/main'],
      disallow: '/auth'
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}