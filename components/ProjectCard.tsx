import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  slug: string
  title: string
  image: string
}

export default function ProjectCard({ slug, title, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="relative w-full h-[400px] rounded-sm overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3">
        <span className="text-base font-medium text-[#1C1C1C] group-hover:text-[#555] transition-colors">{title}</span>
      </div>
    </Link>
  )
}
