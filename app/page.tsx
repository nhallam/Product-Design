import HomeHero from '@/components/HomeHero'

export default function Home() {
  // Single-viewport home for now — the typeface credit / "last updated"
  // second screen is temporarily removed so the page doesn't scroll.
  return (
    <main className="flex-1 flex flex-col px-6">
      <section className="flex-1 flex items-center">
        <HomeHero />
      </section>
    </main>
  )
}
