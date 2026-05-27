import Image from 'next/image'

type ProjectData = {
  title: string
  tag: string
  image?: string
  vimeoId?: string
  body?: string
}

const projectData: Record<string, ProjectData> = {
  'gumroad': {
    title: 'Tipping on Gumroad',
    tag: 'Product Design',
    image: '/Gumroad_01.svg',
  },
  'tiller': {
    title: 'Tiller',
    tag: 'Product Design',
    vimeoId: '1195689621',
    body: `
      <p>Tiller helped services businesses more accurately record where their time goes by using a combination of hardware and software. We came up with the idea for a 'button for time tracking' while sitting in the pub one day having lunch. We spent the next few years turning a sketch of the idea into a finished product that we funded on Kickstarter and shipped to thousands of customers around the world.</p>
      <figure><img src="/Tiller_01.jpg" alt="Tiller devices in multiple colours on slate surface" /></figure>
      <p>Our team of four did everything including branding, industrial design, interaction design, packaging, firmware, hardware, software design, development, pricing strategy, go-to-market.</p>
      <figure><img src="/Tiller_02.png" alt="Tiller device with braided cable" /></figure>
      <figure><img src="/Tiller_03.png" alt="Tiller devices in four colours on white surface" /></figure>
      <figure><img src="/Tiller_04.png" alt="Person using Tiller at a desk" /></figure>
      <figure><img src="/Tiller_05.png" alt="Tiller device close-up on slate surface" /></figure>
      <p>The website is no longer live, but you can read more at the links below.</p>
      <p>RIP Tiller, the most complex and beautiful project I've worked on and the work I'm most proud of.</p>
      <ul>
        <li><a href="https://www.kickstarter.com/projects/858670600/tillera-minimal-and-seamless-device-for-tracking-y" target="_blank" rel="noopener noreferrer">Kickstarter campaign</a></li>
        <li><a href="https://www.theverge.com/circuitbreaker/2017/9/19/16307282/tiller-time-tracking-puck-kickstarter" target="_blank" rel="noopener noreferrer">Verge coverage</a></li>
        <li><a href="https://www.core77.com/posts/68991/Tiller-Designs-a-Physical-Solution-for-Digital-Time-Tracking" target="_blank" rel="noopener noreferrer">Core 77 coverage</a></li>
        <li><a href="https://patents.google.com/patent/USD877149S1/en" target="_blank" rel="noopener noreferrer">Patent USD877149S1</a></li>
      </ul>
    `,
  },
  'tiller-onboarding': {
    title: 'Tiller, onboarding',
    tag: 'Product Design',
    image: '/project-one.jpg',
  },
  'halo': {
    title: 'Halo',
    tag: 'Product Design',
    image: '/project-one.jpg',
  },
  'rea': {
    title: 'REA, inspection booking',
    tag: 'Product Design',
    image: '/project-one.jpg',
  },
  'wsv': {
    title: 'WSV, design system',
    tag: 'Product Design',
    image: '/project-one.jpg',
  },
  'ai-experiments': {
    title: 'AI Experiments',
    tag: 'Product Design',
    image: '/project-one.jpg',
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projectData[slug]

  return (
    <main className="pb-20">
      <div className="relative w-full aspect-video overflow-hidden rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]">
        {project?.vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
          />
        ) : project?.image ? (
          <Image
            src={project.image}
            alt={project?.title ?? slug}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="px-6 mt-10">
        <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 mb-10" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}>
          {project?.title ?? slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
        </h1>
        {project?.body ? (
          <div
            className="max-w-prose text-base leading-relaxed text-[#1C1C1C]
              [&_p]:mb-5
              [&_ul]:mb-5 [&_ul]:pl-5 [&_ul]:list-disc [&_ul_li]:mb-2
              [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[#555] [&_a]:transition-colors
              [&_figure]:my-8
              [&_figure_img]:w-full [&_figure_img]:rounded-sm"
            dangerouslySetInnerHTML={{ __html: project.body }}
          />
        ) : (
          <div className="max-w-prose text-base leading-relaxed text-[#1C1C1C]">
            <p>Project overview and description will go here.</p>
          </div>
        )}
      </div>
    </main>
  )
}
