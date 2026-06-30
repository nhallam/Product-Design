import Image from 'next/image'
import { projectData } from '@/lib/projectData'

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = projectData[slug]
  const title = project?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="pb-20 px-6 max-w-2xl mx-auto w-full">
      <h1
        className="text-[2.75rem] font-black leading-[1.1] mb-10"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        {title}
      </h1>

      {project?.body && (
        <div
          className="max-w-prose text-base leading-relaxed text-[var(--text)]
            [&_p]:mb-5
            [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul_li]:mb-2
            [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-60 [&_a]:transition-opacity
            [&_figure]:my-8
            [&_figure_img]:w-full [&_figure_img]:rounded-sm"
          dangerouslySetInnerHTML={{ __html: project.body }}
        />
      )}

      {!project?.body && (
        <div className="max-w-prose text-base leading-relaxed text-[var(--text)]">
          <p>Project overview and description will go here.</p>
        </div>
      )}

      {project?.vimeoId && (
        <div className="mt-10 relative w-full aspect-video overflow-hidden rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]">
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
          />
        </div>
      )}

      {project?.videoSrc && (
        <div className="mt-10 w-full aspect-video overflow-hidden rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]">
          <video
            src={project.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {!project?.vimeoId && project?.image && (
        <div className="mt-10 relative w-full aspect-video overflow-hidden rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]">
          <Image src={project.image} alt={title} fill className="object-cover" />
        </div>
      )}

      {project?.images && project.images.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          <p className="text-base text-[var(--muted)]">Development work.</p>
          {project.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 3}`}
              className={src.includes('Gumroad_05') || src.includes('Gumroad_07') ? 'w-[70%] mx-auto block' : 'w-full'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
