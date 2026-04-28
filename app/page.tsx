import ProjectCard from '@/components/ProjectCard'

const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    tag: 'Design',
    image: '/images/project-one.jpg',
  },
]

export default function Home() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh]">
        <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}>
          A product designer and founder living in Brooklyn, NY.
        </h1>
      </div>

      <div className="mt-auto flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </main>
  )
}
