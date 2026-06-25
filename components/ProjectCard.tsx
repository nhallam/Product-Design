import Link from 'next/link'
import Image from 'next/image'

interface ProjectCardProps {
  slug: string
  title: string
  image?: string
  video?: string
  comingSoon?: boolean
  onClick?: () => void
}

export default function ProjectCard({ slug, title, image, video, comingSoon, onClick }: ProjectCardProps) {
  const inner = (
    <>
      <div className="relative w-full aspect-[5/3] rounded-sm overflow-hidden">
        {video && !comingSoon ? (
          <video src={video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        ) : image && !comingSoon ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-[var(--border)]" />
        )}
      </div>
      <div className="mt-3 mb-[50px]">
        <span className={`text-base font-medium transition-colors ${comingSoon ? 'text-[var(--faint)]' : 'text-[var(--text)] group-hover:text-[var(--hover)]'}`}>
          {title}
        </span>
      </div>
    </>
  )

  if (comingSoon) {
    return <div>{inner}</div>
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block group w-full text-left">
        {inner}
      </button>
    )
  }

  return (
    <Link href={`/projects/${slug}`} className="block group">
      {inner}
    </Link>
  )
}
