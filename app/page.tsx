'use client'

import { useState } from 'react'
import ProjectCard from '@/components/ProjectCard'
import EasterEggLayer from '@/components/EasterEgg/EasterEggLayer'

const projects = [
  {
    slug: 'project-one',
    title: 'Project One',
    tag: 'Design',
    image: '/project-one.jpg',
  },
  {
    slug: 'project-two',
    title: 'Project Two',
    tag: 'Product',
    image: '/project-one.jpg',
  },
  {
    slug: 'project-three',
    title: 'Project Three',
    tag: 'Branding',
    image: '/project-one.jpg',
  },
  {
    slug: 'project-four',
    title: 'Project Four',
    tag: 'UX Research',
    image: '/project-one.jpg',
  },
  {
    slug: 'project-five',
    title: 'Project Five',
    tag: 'Design',
    image: '/project-one.jpg',
  },
  {
    slug: 'project-six',
    title: 'Project Six',
    tag: 'Product',
    image: '/project-one.jpg',
  },
]

export default function Home() {
  const [easterEggActive, setEasterEggActive] = useState(false)

  return (
    <>
      <EasterEggLayer
        active={easterEggActive}
        onDismiss={() => setEasterEggActive(false)}
      />
      <main className="flex flex-col px-6 pb-6">
        <div className="h-[calc(100dvh-68px-20px)] md:h-[calc(100dvh-68px-60px)] pt-[28vh]">
          <h1
            className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center text-balance"
            style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
          >
            A product designer and founder living in{' '}
            <button
              onClick={() => setEasterEggActive(true)}
              className="underline underline-offset-4 hover:text-[#555] transition-colors"
            >
              Brooklyn, NY.
            </button>
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </main>
    </>
  )
}
