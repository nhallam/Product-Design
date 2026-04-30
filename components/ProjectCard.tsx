import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition } from 'react'

interface ProjectCardProps {
  slug: string
  title: string
  image: string
}

export default function ProjectCard({ slug, title, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} transitionTypes={['nav-forward']} className="block">
      <ViewTransition name={`project-image-${slug}`} share="morph">
        <div className="relative w-full h-[200px] rounded-sm overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </ViewTransition>
    </Link>
  )
}
