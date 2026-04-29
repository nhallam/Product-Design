import Image from 'next/image'

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
        <Image
          src="/Nick_Profile.jpg"
          alt="Nick Hallam"
          width={400}
          height={400}
          className="object-cover rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.10),0_2px_6px_-2px_rgb(0,0,0,0.10)]"
        />
      </div>

      <div className="mt-16 pb-16">
        <div className="divide-y divide-[#E0E0E0]">
          {[
            { company: 'Company Name', title: 'Head of Design', years: '2023 – Present' },
            { company: 'Company Name', title: 'Product Designer', years: '2021 – 2023' },
            { company: 'Company Name', title: 'UX Designer', years: '2019 – 2021' },
            { company: 'Company Name', title: 'Junior Designer', years: '2017 – 2019' },
          ].map(({ company, title, years }) => (
            <div key={years} className="flex justify-between items-baseline py-4">
              <div>
                <div className="text-base font-medium text-[#1C1C1C]">{company}</div>
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
