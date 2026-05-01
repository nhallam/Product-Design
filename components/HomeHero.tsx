'use client'

import { useEffect, useState } from 'react'
import { easterEggActivateRef } from '@/components/EasterEgg/EasterEggLayer'

export default function HomeHero() {
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
  )
}
