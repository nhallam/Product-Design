import { projects, projectBySlug } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  // Render the same content as the sheet — a direct URL to /projects/[slug] still works.
  return (
    <main className="pb-20">
      <ProjectDetail slug={slug} />
    </main>
  )
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}
