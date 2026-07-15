import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'react-feather'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Nick Hallam is a product designer and founder in Brooklyn, NY — currently leading design at Beautiful Function, previously Tiller, Joan and IDEO.',
}

export default function About() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[16.8vh]">
        <h1 className="text-[2.75rem] font-black leading-[1.1] w-full text-center" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}>
          About
        </h1>
      </div>
      <div className="mt-[calc(20vh-50px)] space-y-6 text-base leading-relaxed text-[var(--text)]">
        <p>
          I&apos;m a product designer and founder living in Brooklyn, NY.
        </p>
        <p>
          Currently, I lead design at <a href="https://www.beautifulfunction.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors">Beautiful Function</a>. Previously, I ran product agency, Joan, co-founded a hardware product called Tiller and worked at IDEO. In the early 2010&apos;s I also built a social network for designers on Wordpress (bad idea) and ran Australia&apos;s favourite design conference, <a href="http://www.sexdrugshelvetica.com/melbourne/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors">Sex, Drugs &amp; Helvetica</a>.
        </p>
        <p>
          I <a href="https://www.discogs.com/user/nick_hallam/collection" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors">collect records</a>, DJ in the city and put out <a href="https://soundcloud.com/nhallam" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors">mixes</a> with each of my <Link href="/writing#newsletter" className="underline underline-offset-2 hover:text-[var(--hover)] transition-colors">newsletters</Link>.
        </p>
      </div>
      <div className="flex justify-center mt-16">
        <Image
          src="/Nick_Profile.jpg"
          alt="Nick Hallam"
          width={400}
          height={400}
          className="object-cover rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)] transition-transform duration-300 ease-out hover:rotate-1 cursor-pointer"
        />
      </div>

      <div className="mt-16 pb-16">
        <div className="divide-y divide-[var(--border)]">
          {[
            { company: 'Beautiful Function', title: 'Partner and Head of Design', years: '2025 – Present', url: 'https://www.beautifulfunction.com/' },
            { company: 'Telepathic Instruments', title: 'Product Strategy & Research', years: '2025', url: 'https://telepathicinstruments.com/' },
            { company: 'Convo', title: 'Product Strategy & Design', years: '2025', url: 'https://www.convo.io/us/home' },
            { company: 'Cecil', title: 'Product Strategy & Design', years: '2024 – 2025', url: 'https://cecil.earth/' },
            { company: 'Halo', title: 'Product Design', years: '2023 – 2024', url: 'https://about.halo.car/' },
            { company: 'WorkSafe Victoria', title: 'Lead Product Designer', years: '2020 – 2022', url: 'https://www.worksafe.vic.gov.au/' },
            { company: 'Tiller', title: 'Co-founder & Designer', years: '2015 – 2020', url: 'https://www.kickstarter.com/projects/858670600/tillera-minimal-and-seamless-device-for-tracking-y' },
            { company: 'Joan (agency)', title: 'Co-founder', years: '2015 – 2020', url: null },
            { company: 'Sex, Drugs & Helvetica', title: 'Co-founder', years: '2010 – 2015', url: 'http://www.sexdrugshelvetica.com/melbourne/' },
            { company: 'IDEO', title: 'Comm & Interaction Designer', years: '2012', url: 'https://www.ideo.com/' },
            { company: 'Positive Posters', title: 'Co-founder', years: '2009 – 2013', url: 'https://web.archive.org/web/20130424231629/http://positive-posters.com/' },
          ].map(({ company, title, years, url }) => {
            const Row = url ? 'a' : 'div'
            return (
              <Row
                key={years + company}
                {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`group flex justify-between items-baseline py-4 -mx-3 px-3 rounded-lg transition-colors ${url ? 'cursor-pointer hover:bg-[var(--surface-hover)]' : ''}`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-medium text-[var(--text)]">{company}</span>
                    {url && (
                      <ArrowUpRight size={16} strokeWidth={2} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted)]" />
                    )}
                  </div>
                  <div className="text-sm text-[var(--muted)] mt-0.5">{title}</div>
                </div>
                <div className="text-sm text-[var(--muted)] shrink-0 ml-6">{years}</div>
              </Row>
            )
          })}
        </div>
      </div>
    </main>
  )
}
