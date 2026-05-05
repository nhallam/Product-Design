import HomeHero from '@/components/HomeHero'

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0])
}

export default function Home() {
  const now = new Date()
  const day = ordinal(now.getDate())
  const month = now.toLocaleDateString('en-GB', { month: 'long' })
  const year = now.getFullYear()
  const lastUpdated = `${day} ${month}, ${year}`

  return (
    <main className="flex flex-col px-6">
      <section
        className="h-[100dvh] flex items-center"
        style={{ scrollSnapAlign: 'start' }}
      >
        <HomeHero />
      </section>

      <section
        className="h-[100dvh] flex flex-col items-center justify-center gap-8 pb-6"
        style={{ scrollSnapAlign: 'start' }}
      >
        <p
          className="text-center text-balance font-black"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif", fontSize: '20px', lineHeight: '22px' }}
        >
          This website started by me wondering if I could use{' '}
          <a href="https://x.com/nhallam/status/2049988485356863821" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">a poster I own and my Crocs as inspiration</a>
          {' '}for a new personal site. The two typefaces are{' '}
          <a href="https://klim.co.nz/collections/american-grotesk/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">American Grotesk Condensed by Klim</a>
          {' '}and{' '}
          <a href="https://rsms.me/inter/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Inter by Rasmus Andersson</a>
          . The whole site is built by Claude Code in about four days.
        </p>
        <div className="text-center text-sm text-[#888]">
          <span>Last updated {lastUpdated}</span>
          <span className="mx-2">•</span>
          <a
            href="https://x.com/nhallam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1C1C1C] transition-colors"
          >
            Designed by @nhallam
          </a>
        </div>
      </section>
    </main>
  )
}
