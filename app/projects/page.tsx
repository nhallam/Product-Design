import ProjectCard from '@/components/ProjectCard'

const projects = [
  { slug: 'gumroad', title: 'Tipping on Gumroad', image: '/Gumroad_01.svg' },
  { slug: 'halo', title: 'Halo', image: '/project-one.jpg' },
  { slug: 'cecil', title: 'Cecil', image: '/project-one.jpg' },
  { slug: 'convo', title: 'Convo', image: '/project-one.jpg' },
  { slug: 'worksafe', title: 'WorkSafe Victoria', image: '/project-one.jpg' },
  { slug: 'tiller', title: 'Tiller', image: '/project-one.jpg' },
  { slug: 'beautiful-function', title: 'Beautiful Function', image: '/project-one.jpg' },
]

export default function Projects() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          A selection of past design work
        </h1>
      </div>

      <div className="mt-[10vh] flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </main>
  )
}
