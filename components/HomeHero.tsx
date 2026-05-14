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

  useEffect(() => {
    const applySnap = () => {
      if (window.innerWidth >= 768) {
        document.documentElement.style.scrollSnapType = 'y mandatory'
      } else {
        document.documentElement.style.scrollSnapType = ''
      }
    }
    applySnap()
    window.addEventListener('resize', applySnap)
    return () => {
      window.removeEventListener('resize', applySnap)
      document.documentElement.style.scrollSnapType = ''
    }
  }, [])

  return (
    <h1
      className="text-[2.75rem] font-black leading-[1.1] underline underline-offset-4 w-full text-center text-balance"
      style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
    >
      A product designer and founder based in{' '}
      <button
        onClick={() => easterEggActivateRef.current?.()}
        className="group relative inline-block underline underline-offset-4 hover:text-[#555] transition-colors"
      >
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-[60%] transition-transform duration-500 ease-out text-4xl pointer-events-none select-none z-[0]"
        >
          🗽
        </span>
        <span className={`relative z-[1]${shimmer ? ' shimmer' : ''}`}>Brooklyn, NY.</span>
      </button>
    </h1>
  )
}
