import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { articleList } from '@/app/writing/articles'

const BASE = 'https://nhallam.design'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/projects', '/writing', '/newsletter', '/stickers'].map(
    (path) => ({ url: `${BASE}${path}` })
  )

  const projectPages = projects
    .filter((p) => !p.comingSoon)
    .map((p) => ({ url: `${BASE}/projects/${p.slug}` }))

  const articlePages = articleList.map((a) => ({ url: `${BASE}/writing/${a.slug}` }))

  return [...pages, ...projectPages, ...articlePages]
}
