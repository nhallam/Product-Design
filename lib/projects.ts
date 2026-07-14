// Single source of truth for all project content — both the /projects list
// cards and the detail view (sheet + /projects/[slug]).
//
// To add a project, copy one entry below and fill it in:
//   {
//     slug: 'my-project',                       // URL + key; keep it unique
//     title: 'My Project',                      // shown on card and detail
//     description: 'One sentence for the card.', // the line under the card title
//     tag: 'Product Design',                     // optional label
//     card: { image: '/thumb.jpg' },             // list thumbnail (image OR video+poster)
//     media: { vimeoId: '123' },                 // detail hero (vimeoId | video | image)
//     body: `<p>HTML writeup…</p>`,              // detail body (p, figure/img, ul, a…)
//     gallery: ['/dev_1.png', '/dev_2.png'],     // optional "Development work" images
//   }
// Set `comingSoon: true` to grey it out on the list and make it non-clickable.
// Images/videos live in /public and are referenced by path (e.g. '/thumb.jpg').

export type Project = {
  slug: string
  title: string
  description: string
  tag?: string
  comingSoon?: boolean
  // If set, clicking the card shows this as a toast instead of opening the sheet.
  toast?: string
  // List card thumbnail
  card?: { image?: string; video?: string; poster?: string }
  // Detail hero media (priority: vimeoId > video > image)
  media?: { image?: string; video?: string; vimeoId?: string }
  // Detail body (HTML) and the "Development work" gallery
  body?: string
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: 'gumroad',
    title: 'Tipping on Gumroad',
    description: 'Adding tipping to the Gumroad checkout, an experiment in translating a cafe behaviour online.',
    tag: 'Product Design',
    card: { video: '/Gumroad_Tipping1.mp4', poster: '/Gumroad_01.svg' },
    media: { video: '/Gumroad_Tipping1.mp4', image: '/Gumroad_01.svg' },
    gallery: ['/Gumroad_03.svg', '/Gumroad_04.svg', '/Gumroad_05.svg', '/Gumroad_06.svg', '/Gumroad_07.svg'],
    body: `
      <p>A couple of summers ago, I was asked to design and implement a solution to adding tipping to the checkout flow in Gumroad. It was an experiment. Customers in the US are used to tipping but would it be a behaviour that would translate to an online purchase? Would non-US customers understand the concept? And importantly, how much should the UI and flow differ from the experience you are used to in a cafe?</p>
      <p>I prototyped a bunch of different approaches for the team to review. Percentages, absolute dollars, round up, games, and eventually we shipped what you see in the video below.</p>
      <p>Tipping is still live on Gumroad today.</p>
      <p>Read more on how tipping works <a href="https://gumroad.com/help/article/345-tipping.html" target="_blank" rel="noopener noreferrer">here</a>.</p>
    `,
  },
  {
    slug: 'stealth',
    title: 'Stealth',
    description: 'Product design for AI video translation',
    tag: 'Product Design',
    toast: 'Launching Q4, 2026',
    card: { image: '/Stealth2.png' },
    media: { image: '/Stealth2.png' },
  },
  {
    slug: 'tiller',
    title: 'Onboarding for Tiller',
    description: 'Designing an onboarding experience for new hardware',
    tag: 'Product Design',
    card: { image: '/project-one.jpg' },
    media: { vimeoId: '1195689621' },
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
  {
    slug: 'tiller-onboarding',
    title: 'Tiller Hardware Design',
    description: 'From a napkin sketch to thousands of units',
    tag: 'Product Design',
    comingSoon: true,
    media: { image: '/project-one.jpg' },
  },
  {
    slug: 'halo',
    title: 'Halo',
    description: 'Revamping a driverless car app',
    tag: 'Product Design',
    comingSoon: true,
    media: { image: '/project-one.jpg' },
  },
  {
    slug: 'rea',
    title: 'RealEstate.com.au inspection booking',
    description: 'A rethink of how home buyers book property inspections',
    tag: 'Product Design',
    comingSoon: true,
    media: { image: '/project-one.jpg' },
  },
  {
    slug: 'wsv',
    title: 'WorkSafe Victoria design system',
    description: 'Building the design system behind the digital products at WorkSafe Victoria',
    tag: 'Product Design',
    comingSoon: true,
    media: { image: '/project-one.jpg' },
  },
  {
    slug: 'ai-experiments',
    title: 'AI Experiments',
    description: 'A rolling collection of small, self-initiated AI product experiments',
    tag: 'Product Design',
    comingSoon: true,
    media: { image: '/project-one.jpg' },
  },
]

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
