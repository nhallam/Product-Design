'use client'

import { useEffect } from 'react'

export default function HomeHero() {
  useEffect(() => {
    const apply = () => {
      document.documentElement.style.scrollSnapType =
        window.innerWidth >= 768 ? 'y mandatory' : 'y proximity'
    }
    apply()
    window.addEventListener('resize', apply)
    return () => {
      window.removeEventListener('resize', apply)
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
