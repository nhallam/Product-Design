import Link from 'next/link'

const projects = [
  { slug: 'project-one', title: 'Project One' },
  { slug: 'project-two', title: 'Project Two' },
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
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block w-full h-56 bg-[#d4d4d4] hover:bg-[#c8c8c8] transition-colors rounded-sm"
            aria-label={project.title}
          />
        ))}
      </div>
    </main>
  )
}
