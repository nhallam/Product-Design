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
    <Link href={`/projects/${slug}`} transitionTypes={['nav-forward']} className="block relative w-full h-[60vh] rounded-sm overflow-hidden">
      <ViewTransition name={`project-image-${slug}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </ViewTransition>
      <span className="absolute bottom-4 left-4 text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
        {tag}
      </span>
    </Link>
  )
}
