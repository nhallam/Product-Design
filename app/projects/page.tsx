import ProjectCard from '@/components/ProjectCard'

const projects = [
  { slug: 'project-one', title: 'Project One', image: '/project-one.jpg' },
  { slug: 'project-two', title: 'Project Two', image: '/project-one.jpg' },
  { slug: 'project-three', title: 'Project Three', image: '/project-one.jpg' },
  { slug: 'project-four', title: 'Project Four', image: '/project-one.jpg' },
  { slug: 'project-five', title: 'Project Five', image: '/project-one.jpg' },
  { slug: 'project-six', title: 'Project Six', image: '/project-one.jpg' },
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
