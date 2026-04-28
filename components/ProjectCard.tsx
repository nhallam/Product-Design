import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  slug: string
  title: string
  tag: string
  image: string
}

export default function ProjectCard({ slug, title, tag, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block relative w-full h-[60vh] rounded-sm overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={{ viewTransitionName: `project-image-${slug}` }}
      />
      <span className="absolute bottom-4 left-4 text-sm text-white bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
        {tag}
      </span>
    </Link>
  )
}
