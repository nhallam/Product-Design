import HalftoneImage from '@/components/HalftoneImage'

export default function About() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-6">
      <div className="pt-[28vh]">
        <h1 className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}>
          I&apos;m a product designer and founder living in Brooklyn, NY.
        </h1>
      </div>
      <div className="mt-[40vh] space-y-6 text-base leading-relaxed text-[#1C1C1C]">
        <p>
          I&apos;m a product designer and founder living in Brooklyn, NY. I care about building
          products that are simple, useful, and crafted with intention.
        </p>
        <p>
          Previously I&apos;ve led design at early-stage startups and worked across consumer, SaaS,
          and AI products. I&apos;m currently exploring new ideas at the intersection of design and
          technology.
        </p>
        <p>
          When I&apos;m not designing I&apos;m writing, building, or walking around the city looking
          for good coffee.
        </p>
      </div>
      <div className="flex justify-center mt-16">
        <HalftoneImage
          src="/Nick_Profile.jpg"
          alt="Nick Hallam"
          width={400}
          height={400}
          className="rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]"
        />
      </div>

      <div className="mt-16 pb-16">
        <div className="divide-y divide-[#E0E0E0]">
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
          ].map(({ company, title, years, url }) => (
            <div key={years + company} className="flex justify-between items-baseline py-4">
              <div>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-base font-medium text-[#1C1C1C] underline underline-offset-2 hover:text-[#555] transition-colors">
                    {company}
                  </a>
                ) : (
                  <div className="text-base font-medium text-[#1C1C1C]">{company}</div>
                )}
                <div className="text-sm text-[#888] mt-0.5">{title}</div>
              </div>
              <div className="text-sm text-[#888] shrink-0 ml-6">{years}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
