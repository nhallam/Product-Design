import type { MetadataRoute } from 'next'

// Everything is crawlable (including AI crawlers — deliberately) except the
// internal texture lab and API routes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/texture-lab', '/api/'],
      },
    ],
    sitemap: 'https://nhallam.design/sitemap.xml',
  }
}
