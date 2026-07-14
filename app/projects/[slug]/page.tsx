import { projects } from '@/lib/projects'
import ProjectDetail from '@/components/ProjectDetail'

interface Props {
  params: Promise<{ slug: string }>
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
