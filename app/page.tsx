import HomeHero from '@/components/HomeHero'

export default function Home() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main className="flex flex-col px-6 pb-6">
      <HomeHero />
      <p
        className="text-center text-balance font-black mt-[100dvh]"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif", fontSize: '20px', lineHeight: '22px' }}
      >
        This website started by me wondering if I could use a poster I own and my Crocs as inspiration for a new personal site. The two typefaces are American Grotesk Condensed by Klim and Inter by Rasmus Andersson. The whole site is built by Claude Code in about four days.
      </p>
      <p className="text-center text-sm text-[#888] mt-4 pb-6">
        Last updated {lastUpdated} by{' '}
        <a
          href="https://x.com/nhallam"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1C1C1C] transition-colors"
        >
          @nhallam
        </a>
      </p>
    </main>
  )
}
