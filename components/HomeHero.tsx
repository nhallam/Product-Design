'use client'

import { useEffect } from 'react'

export default function HomeHero() {
  useEffect(() => {
    const apply = () => {
      document.documentElement.style.scrollSnapType =
        window.innerWidth >= 768 ? 'y mandatory' : ''
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
      className="home-hero text-[2.75rem] font-black leading-[1.1] w-full text-center text-balance"
      style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
    >
      {/* On desktop the lines break deliberately: line 1 centered, line 2
          flush with the window's left edge (see .home-hero in globals.css).
          On mobile the spans flow inline as one centered paragraph. */}
      <span className="hero-line-1">A product designer</span>{' '}
      <span className="hero-line-2">and founder based in Brooklyn, NY.</span>
    </h1>
  )
}
