import ProjectCard from '@/components/ProjectCard'

const projects = [
  { slug: 'gumroad', title: 'Tipping on Gumroad', image: '/Gumroad_01.svg' },
  { slug: 'tiller', title: 'Tiller', image: '/project-one.jpg' },
  { slug: 'tiller-onboarding', title: 'Tiller, onboarding', image: '/project-one.jpg' },
  { slug: 'halo', title: 'Halo', image: '/project-one.jpg' },
  { slug: 'rea', title: 'REA, inspection booking', image: '/project-one.jpg' },
  { slug: 'wsv', title: 'WSV, design system', image: '/project-one.jpg' },
  { slug: 'ai-experiments', title: 'AI Experiments', image: '/project-one.jpg' },
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
