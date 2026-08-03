import type { Metadata } from 'next'
import { ArrowUpRight } from 'react-feather'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Nick Hallam — product designer and founder in Brooklyn, NY with fifteen years of experience across product design, strategy, design systems, research and hardware.',
}

type Role = {
  title: string
  company: string
  url?: string
  dates: string
  description: string
  keyInfo: string[]
}

const roles: Role[] = [
  {
    title: 'Head of Design',
    company: 'Beautiful Function',
    url: 'https://www.beautifulfunction.com/',
    dates: 'Oct 2024 – Present',
    description:
      'Beautiful Function is a design, strategy & technology agency in Brooklyn, NY. We work with early stage companies to help craft brand and product experiences that connect with customers.',
    keyInfo: ['AI native design approach', 'Early stage focus'],
  },
  {
    title: 'Product Design & Strategy (contract)',
    company: 'Cecil',
    url: 'https://cecil.earth/',
    dates: 'Feb 2024 – Present',
    description:
      'The team at Cecil is building a best-in-class nature data solution for a large group of underserved customers. I’ve been pulled in to help shape their v1.0, working with the founders, lead designer, and engineering on prototypes, research, and finished UI (pre-launch).',
    keyInfo: ['Web app is currently pre-launch', 'Venture funded', 'Based in NYC, Sydney and London'],
  },
  {
    title: 'Lead Product Designer (contract)',
    company: 'Halo.car',
    url: 'https://about.halo.car/',
    dates: 'Jun – Aug 2023',
    description:
      'Halo has developed remote pilot technology that allows them to deliver electric cars to customers. I worked with their team to lead the redesign of their app, including reimagining the booking and account registration flows and development of a basic design system.',
    keyInfo: ['App launched and in market', 'Venture funded', 'Based in Las Vegas'],
  },
  {
    title: 'Lead Product Designer',
    company: 'WorkSafe Victoria',
    url: 'https://www.worksafe.vic.gov.au/',
    dates: 'Nov 2019 – 2023',
    description:
      'WorkSafe Victoria is a state government body that manages and delivers workplace insurance for over 5 million Victorians. In 2019, I joined as their first full-time product designer and oversaw the development of their first design system, helped grow our team to 15 designers, and built out the customer-facing portal to help users manage their insurance claims.',
    keyInfo: ['Grew our team to 15 designers', 'Over 500K registered accounts', 'Built on top of Salesforce'],
  },
  {
    title: 'Senior Product Designer',
    company: 'realestate.com.au',
    url: 'https://www.realestate.com.au/',
    dates: 'Apr – Aug 2019',
    description:
      'The REA Group runs the largest property portal in Australia that features listings for both buying and renting. I joined the rent team for a contract to research, design and implement the inspection booking and calendar management functionality.',
    keyInfo: ['Built for iOS & Android', '12 million monthly visitors', 'Functionality went live and is in market today'],
  },
  {
    title: 'Co-founder and Lead Designer',
    company: 'Tiller',
    url: 'https://www.kickstarter.com/projects/858670600/tillera-minimal-and-seamless-device-for-tracking-y',
    dates: 'Jan 2016 – Jan 2020',
    description:
      'Tiller uses custom hardware and software to help teams more accurately track their time and measure productivity. We developed the idea inside our own agency, which we then successfully funded on Kickstarter and shipped over two thousand devices around the world.',
    keyInfo: ['Raised $75,000 on Kickstarter', 'US Patent granted', 'Shipped over 2,000 devices globally, pre-order sold out'],
  },
  {
    title: 'Founder & Head of Design',
    company: 'Joan',
    dates: 'Jan 2014 – 2019',
    description:
      'Joan was an innovation, product design, and research agency that I co-founded after my time at IDEO. We helped clients shape their ideas, build and test prototypes, and eventually design and ship web and native apps. We eventually stopped work on Joan to focus on Tiller full time.',
    keyInfo: ['Team of 3 partners and 5 staff', 'Based in Melbourne, Australia', 'Clients: Real Time Agent (acq. $35m), RACV, Dairy Australia'],
  },
  {
    title: 'Lead Product Designer',
    company: 'The Dots',
    url: 'https://the-dots.com/',
    dates: 'Apr 2013 – Dec 2016',
    description:
      'The Dots is the leading creative professional network in the UK and Europe. I worked on and off with their leadership team, designers, and engineers over several years to help identify customer pain points, prototype new solutions, design, and ship features including group messaging and portfolio creation.',
    keyInfo: ['750,000 accounts & portfolios', 'Increased return visits & usage', 'Venture backed, based in London'],
  },
  {
    title: 'Communication & Interaction Designer',
    company: 'IDEO',
    url: 'https://www.ideo.com/',
    dates: 'Jun – Nov 2013',
    description:
      'IDEO is the world’s leading design and innovation firm. I joined their Singapore office to help deliver work for some of the APAC clients including Telstra, Melbourne Airport, and Lion Nathan.',
    keyInfo: ['Based in Singapore & Melbourne', 'Together, we conceived of the popular pre-order app ‘Skip’ that was incubated and went live in 2016'],
  },
  {
    title: 'Co-founder',
    company: 'Positive Posters',
    url: 'https://web.archive.org/web/20130424231629/http://positive-posters.com/',
    dates: 'Apr 2009 – 2013',
    description:
      'After completing my honours, I set up Positive Posters, a non-profit organization that ran exhibitions and built and maintained a social network for graphic designers who wanted to create impact with their work. I ran the organization for 5 years and grew the community to over 15,000 designers, with over 1 million unique page views per month and accounts in 127 countries.',
    keyInfo: ['Built on Wordpress', 'Over 15,000 accounts and 1 million monthly page views in 2013', 'Top three most active countries were Australia, USA and Iran'],
  },
]

const education = [
  {
    title: 'Honours of Communication Design',
    school: 'Monash University',
    dates: '2009',
    description:
      'A 12-month research year into 20th-century sans-serif typography — exploring how the main typefaces of the century came about and their cultural impact, including Futura, Gill Sans, Helvetica, and Gotham.',
  },
  {
    title: 'Bachelor of Communication Design',
    school: 'Swinburne University',
    dates: '2006 – 2008',
    description: '',
  },
]

export default function Resume() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[16.8vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Resume
        </h1>
      </div>

      <div className="mt-[10vh] space-y-6 text-base leading-relaxed text-[var(--text)]">
        <p>
          For the past fifteen years, I&apos;ve helped all kinds of people and companies uncover
          important customer problems, then imagine, design and ship creative solutions that solve
          those problems. My work typically involves two parts, answering: what should we build and
          why? Then, how should we make it a reality?
        </p>
        <p className="text-[var(--muted)]">
          Nick Hallam &middot; Product design &amp; strategy &middot; Brooklyn, NY &middot;{' '}
          <a href="mailto:nrhallam@gmail.com" className="underline underline-offset-2 hover:text-[var(--text)] transition-colors">
            nrhallam@gmail.com
          </a>
        </p>
        <p>
          <a
            href="/NickHallam_Resume.pdf"
            download
            className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-[var(--hover)] transition-colors"
          >
            Download as PDF
            <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-2">Employment history</h2>
        <div className="divide-y divide-[var(--border)]">
          {roles.map((role) => (
            <article key={role.dates + role.company} className="py-8">
              <h3 className="text-base font-medium text-[var(--text)]">{role.title}</h3>
              <p className="text-base text-[var(--text)]">
                {role.url ? (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors"
                  >
                    {role.company}
                  </a>
                ) : (
                  role.company
                )}
              </p>
              <p className="text-sm text-[var(--muted)] mt-1">{role.dates}</p>
              <p className="text-base leading-relaxed mt-4">{role.description}</p>
              <ul className="mt-4 pl-5 list-disc text-base leading-relaxed text-[var(--muted)]">
                {role.keyInfo.map((info) => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-2">Education</h2>
        <div className="divide-y divide-[var(--border)]">
          {education.map((entry) => (
            <article key={entry.school} className="py-8">
              <h3 className="text-base font-medium text-[var(--text)]">{entry.title}</h3>
              <p className="text-base text-[var(--text)]">{entry.school}</p>
              <p className="text-sm text-[var(--muted)] mt-1">{entry.dates}</p>
              {entry.description && <p className="text-base leading-relaxed mt-4">{entry.description}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 pb-10">
        <h2 className="text-2xl font-bold mb-2">References</h2>
        <p className="text-base leading-relaxed text-[var(--muted)] py-4">Available on request.</p>
      </section>
    </main>
  )
}
