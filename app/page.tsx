'use client'

import { useState, useEffect } from 'react'
import EasterEggLayer from '@/components/EasterEgg/EasterEggLayer'

export default function Home() {
  const [easterEggActive, setEasterEggActive] = useState(false)
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
    <>
      <EasterEggLayer
        active={easterEggActive}
        onDismiss={() => setEasterEggActive(false)}
      />
      <main className="flex flex-col px-6 pb-6">
        <div className="h-[calc(100dvh-68px-20px)] md:h-[calc(100dvh-68px-60px)] pt-[28vh]">
          <h1
            className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center text-balance"
            style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
          >
            A product designer and founder based in{' '}
            <button
              onClick={() => setEasterEggActive(true)}
              className={`underline underline-offset-4 hover:text-[#555] transition-colors ${shimmer ? 'shimmer' : ''}`}
            >
              Brooklyn, NY.
            </button>
          </h1>
        </div>
      </main>
    </>
  )
}
