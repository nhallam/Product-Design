'use client'

import { useState, useEffect, useRef } from 'react'
import ProjectCard from '@/components/ProjectCard'
import ProjectSheet from '@/components/ProjectSheet'
import { projects } from '@/lib/projects'

export default function Projects() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [toastOn, setToastOn] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setToastOn(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastOn(false), 2400)
  }

  const openSheet = (slug: string) => {
    setActiveSlug(slug)
    // Single rAF to ensure the sheet is in the DOM (translate-y-full) before
    // applying the open class so the enter transition plays.
    requestAnimationFrame(() => setSheetOpen(true))
  }

  const closeSheet = () => {
    setSheetOpen(false)
    // Clear the slug after the exit transition finishes (380ms)
    setTimeout(() => setActiveSlug(null), 400)
  }

  // Keep the sheet slug in sync when open state changes externally (e.g. Escape)
  useEffect(() => {
    if (!sheetOpen && activeSlug) {
      const id = setTimeout(() => setActiveSlug(null), 400)
      return () => clearTimeout(id)
    }
  }, [sheetOpen, activeSlug])

  return (
    <>
      <main className="flex-1 flex flex-col px-6 pb-6">
        <div className="pt-[16.8vh]">
          <h1
            className="text-[2.75rem] font-black leading-[1.1] w-full text-center"
            style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
          >
            Selected design work
          </h1>
        </div>

        <div className="mt-[10vh] flex flex-col gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              image={project.card?.image}
              video={project.card?.video}
              poster={project.card?.poster}
              comingSoon={project.comingSoon}
              onClick={
                project.comingSoon
                  ? undefined
                  : project.toast
                  ? () => showToast(project.toast!)
                  : () => openSheet(project.slug)
              }
            />
          ))}
        </div>
      </main>

      {activeSlug && (
        <ProjectSheet slug={activeSlug} open={sheetOpen} onClose={closeSheet} />
      )}

      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[120] transition-[opacity,transform] duration-300 ${
          toastOn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-[var(--text)] text-[var(--bg)] px-4 py-2 rounded-full text-sm font-medium shadow-lg whitespace-nowrap">
          {toast}
        </div>
      </div>
    </>
  )
}
