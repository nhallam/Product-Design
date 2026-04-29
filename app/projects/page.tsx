import Link from 'next/link'

const projects = [
  { slug: 'project-one', title: 'Project One', tag: 'Case Study' },
  { slug: 'project-two', title: 'Project Two', tag: 'Case Study' },
  { slug: 'ai-experiment-one', title: 'AI Experiment', tag: 'AI' },
]

export default function Projects() {
  return (
    <main className="px-6 pb-20">
      <div className="pt-[28vh] mb-16">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          A selection of past design work
        </h1>
      </div>

      <div className="flex flex-col gap-6 max-w-sm">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
            <div className="w-full h-56 bg-[#d4d4d4] group-hover:bg-[#c8c8c8] transition-colors rounded-sm mb-3" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-bold underline underline-offset-2">{project.title}</span>
              <span className="text-xs text-[#888]">{project.tag}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
