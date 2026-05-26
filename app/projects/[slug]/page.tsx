import Image from 'next/image'

type ProjectData = {
  title: string
  tag: string
  image?: string
  vimeoId?: string
}

const projectData: Record<string, ProjectData> = {
  'project-one': {
    title: 'Project One',
    tag: 'Design',
    image: '/project-one.jpg',
  },
  'tiller': {
    title: 'Tiller',
    tag: 'Product Design',
    vimeoId: '1195689621',
  },
  'gumroad': {
    title: 'Tipping on Gumroad',
    tag: 'Product Design',
    image: '/Gumroad_01.svg',
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
      <div className="relative w-full aspect-video overflow-hidden rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]">
        {project?.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
          />
        ) : project?.image ? (
          <Image
            src={project.image}
            alt={project?.title ?? slug}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="px-6 mt-10">
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
