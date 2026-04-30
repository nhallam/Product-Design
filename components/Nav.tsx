'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { easterEggDismissRef } from './EasterEgg/EasterEggLayer'

const CHARS = 'abcdefghijklmnopqrstuvwxyz.'

function useScramble(initial: string) {
  const [text, setText] = useState(initial)
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)

  function scrambleTo(target: string) {
    let iteration = 0
    clearInterval(interval.current!)
    interval.current = setInterval(() => {
      setText(
        target.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < Math.floor(iteration)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      iteration += 0.4
      if (iteration > target.length) {
        setText(target)
        clearInterval(interval.current!)
      }
    }, 7)
  }

  return { text, scrambleTo }
}

interface NavProps {
  menuOpen: boolean
  onToggle: () => void
}

export default function Nav({ menuOpen, onToggle }: NavProps) {
  const { text, scrambleTo } = useScramble('Nick Hallam')
  const pathname = usePathname()
  const isArticle = pathname.startsWith('/writing/') && pathname !== '/writing/'

  return (
    <nav className="sticky top-0 z-[51] flex justify-between items-center px-6 pt-6 pb-4" style={{ viewTransitionName: 'site-nav' }}>
      {isArticle ? (
        <Link href="/writing" className="text-base text-[#1C1C1C] hover:text-[#888] transition-colors">
          ← All writing
        </Link>
      ) : (
        <Link
          href="/"
          onClick={() => { easterEggDismissRef.current?.(); if (menuOpen) onToggle() }}
          onMouseEnter={() => scrambleTo('nhallam.design')}
          onMouseLeave={() => scrambleTo('Nick Hallam')}
          onTouchStart={() => scrambleTo('nhallam.design')}
          onTouchEnd={() => setTimeout(() => scrambleTo('Nick Hallam'), 600)}
          className="text-base text-[#1C1C1C] transition-colors"
        >
          {text}
        </Link>
      )}
      {!isArticle && (
        <button
          onClick={() => { easterEggDismissRef.current?.(); onToggle() }}
          className="relative text-base text-[#1C1C1C] hover:text-[#888] transition-colors cursor-pointer"
        >
          <span className={`block transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
            Menu
          </span>
          <span className={`absolute inset-0 flex items-center justify-end transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
            Close
          </span>
        </button>
      )}
    </nav>
  )
}
