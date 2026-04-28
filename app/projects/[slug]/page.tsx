import Image from 'next/image'
import { ViewTransition } from 'react'

const projectData: Record<string, { title: string; tag: string; image: string }> = {
  'project-one': {
    title: 'Project One',
    tag: 'Design',
    image: '/project-one.jpg',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projectData[slug]

  return (
    <main className="pb-20">
      <ViewTransition name={`project-image-${slug}`}>
        <div className="relative w-full h-[60vh]">
          {project?.image && (
            <Image
              src={project.image}
              alt={project?.title ?? slug}
              fill
              className="object-cover"
            />
          )}
        </div>
      </ViewTransition>

      <div className="px-6 mt-10">
        <p className="text-sm text-[#888] mb-2">{project?.tag}</p>
        <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 mb-10" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}>
          {project?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        </h1>
        <div className="max-w-sm space-y-6 text-base leading-relaxed text-[#1C1C1C]">
          <p>Project overview and description will go here.</p>
        </div>
      </div>
    </main>
  )
}
