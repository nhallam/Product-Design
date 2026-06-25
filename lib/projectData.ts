export type ProjectData = {
  title: string
  tag: string
  image?: string
  videoSrc?: string
  vimeoId?: string
  body?: string
  images?: string[]
}

export const projectData: Record<string, ProjectData> = {
  'gumroad': {
    title: 'Tipping on Gumroad',
    tag: 'Product Design',
    image: '/Gumroad_01.svg',
    videoSrc: '/Gumroad_Tipping1.mp4',
    images: ['/Gumroad_03.svg', '/Gumroad_04.svg', '/Gumroad_05.svg', '/Gumroad_06.svg', '/Gumroad_07.svg'],
    body: `<p>A couple of summers ago, I was asked to design and implement a solution to adding tipping to the checkout flow in Gumroad. It was an experiment. Customers in the US are used to tipping but would it be a behaviour that would translate to an online purchase? Would non-US customers understand the concept? And importantly, how much should the UI and flow differ from the experience you are used to in a cafe?</p>`,
  },
  'tiller': {
    title: 'Tiller, onboarding',
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
    title: 'Tiller',
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
