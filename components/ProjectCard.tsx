'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'

interface ProjectCardProps {
  slug: string
  title: string
  description?: string
  image?: string
  video?: string
  poster?: string
  comingSoon?: boolean
  toast?: string
  onClick?: () => void
}

export default function ProjectCard({ slug, title, description, image, video, poster, comingSoon, toast, onClick }: ProjectCardProps) {
  const [toastOn, setToastOn] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = () => {
    setToastOn(true)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastOn(false), 2400)
  }

  const inner = (
    <>
      <div className="mb-3">
        <span className={`block text-base font-medium transition-colors ${comingSoon ? 'text-[var(--faint)]' : 'text-[var(--text)] group-hover:text-[var(--hover)]'}`}>
          {title}
        </span>
        {description && (
          <p className={`text-sm leading-snug mt-1 max-w-prose ${comingSoon ? 'text-[var(--faint)]' : 'text-[var(--muted)]'}`}>
            {description}
          </p>
        )}
      </div>
      <div className="relative w-full aspect-[5/3] rounded-sm overflow-hidden mb-[50px]">
        {video && !comingSoon ? (
          // poster shows instantly so the card isn't blank while the video buffers
          <video src={video} poster={poster} autoPlay muted loop playsInline preload="metadata" className="w-full h-full object-cover" />
        ) : image && !comingSoon ? (
          /* The optimizer rejects SVG sources, so serve those as-is */
          <Image src={image} alt={title} fill priority unoptimized={image.endsWith('.svg')} sizes="(max-width: 700px) 100vw, 620px" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[var(--border)]" />
        )}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              toastOn ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {toast}
            </span>
          </div>
        )}
      </div>
    </>
  )

  if (comingSoon) {
    return <div>{inner}</div>
  }

  // Always render a real link so crawlers can discover the detail page; the
  // click is intercepted to open the sheet (or flash the toast) instead.
  return (
    <Link
      href={`/projects/${slug}`}
      className="block group"
      onClick={(e) => {
        if (toast) {
          e.preventDefault()
          showToast()
        } else if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {inner}
    </Link>
  )
}
