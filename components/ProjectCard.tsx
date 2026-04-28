import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition } from 'react'

interface ProjectCardProps {
  slug: string
  title: string
  tag: string
  image: string
}

export default function ProjectCard({ slug, title, tag, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} transitionTypes={['nav-forward']} className="block">
      <ViewTransition name={`project-image-${slug}`} share="morph">
        <div className="relative w-full h-[100px] rounded-sm overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 z-10 text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-[5px]">
            {tag}
          </span>
        </div>
      </ViewTransition>
    </Link>
  )
}
