'use client'

import { useEffect, useState } from 'react'
import { easterEggActivateRef } from '@/components/EasterEgg/EasterEggLayer'

export default function Home() {
  const [shimmer, setShimmer] = useState(false)

  useEffect(() => {
    const trigger = () => {
      setShimmer(true)
      setTimeout(() => setShimmer(false), 1500)
    }
    const initial = setTimeout(trigger, 2500)
    const interval = setInterval(trigger, 20000)
    return () => { clearTimeout(initial); clearInterval(interval) }
  }, [])

  return (
    <main className="flex flex-col px-6 pb-6">
      <div className="h-[calc(100dvh-68px)] flex items-center">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center text-balance"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          A product designer and founder based in{' '}
          <button
            onClick={() => easterEggActivateRef.current?.()}
            className={`underline underline-offset-4 hover:text-[#555] transition-colors ${shimmer ? 'shimmer' : ''}`}
          >
            Brooklyn, NY.
          </button>
        </h1>
      </div>
      <p
        className="text-center text-balance font-black pb-6 mt-[50dvh]"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif", fontSize: '20px', lineHeight: '22px' }}
      >
        This website started by me wondering if I could use a poster I own and my Crocs as inspiration for a new personal site. The two typefaces are American Grotesk Condensed by Klim and Inter by Rasmus Andersson. The whole site is built by Claude Code in about four days.
      </p>
    </main>
  )
}
