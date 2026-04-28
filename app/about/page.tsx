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
          className="object-cover rounded-[10px] shadow-[0_4px_9px_-1px_rgb(0,0,0,0.24),0_2px_6px_-2px_rgb(0,0,0,0.24)]"
        />
      </div>
    </main>
  )
}
