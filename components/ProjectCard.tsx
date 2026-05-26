import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  image: string
}

export default function ProjectCard({ slug, title, description, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block group">
      <div className="relative w-full h-[200px] rounded-sm overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex justify-between items-baseline gap-6">
        <span className="text-base font-medium text-[#1C1C1C] group-hover:text-[#555] transition-colors">{title}</span>
        <span className="text-sm text-[#888] shrink-0">{description}</span>
      </div>
    </Link>
  )
}
