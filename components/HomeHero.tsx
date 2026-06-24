'use client'

import { useEffect } from 'react'

export default function HomeHero() {
  useEffect(() => {
    document.documentElement.style.scrollSnapType = 'y mandatory'
    return () => {
      document.documentElement.style.scrollSnapType = ''
    }
  }, [])

  return (
    <h1
      className="text-[2.75rem] font-black leading-[1.1] w-full text-center text-balance"
      style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
    >
      A product designer and founder based in Brooklyn, NY.
    </h1>
  )
}
