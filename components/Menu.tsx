'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useHasGhosts, easterEggClearGhostsRef } from './EasterEgg/EasterEggLayer'

interface MenuProps {
  open: boolean
  onClose: () => void
}

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/nickhallam/', label: 'LinkedIn', hoverClass: 'hover:text-[#4784FF]' },
  { href: 'https://github.com/nhallam', label: 'Github', hoverClass: 'hover:text-[#1AB739]' },
  { href: 'https://x.com/nhallam', label: 'Twitter', hoverClass: 'hover:text-[#1D9BF1]' },
  { href: 'https://www.instagram.com/nhallam/', label: 'Instagram', hoverClass: 'hover:text-[#FE0033]' },
]

export default function Menu({ open, onClose }: MenuProps) {
  const [copied, setCopied] = useState(false)
  const hasGhosts = useHasGhosts()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function copyEmail() {
    navigator.clipboard.writeText('nrhallam@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const NAV_STAGGER = 70
  const FOOTER_BASE = navLinks.length * NAV_STAGGER + 60
  const FOOTER_STAGGER = 43

  function navStyle(i: number) {
    return {
      transitionDelay: open ? `${i * NAV_STAGGER}ms` : '0ms',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(16px)',
    }
  }

  function footerStyle(i: number) {
    return {
      transitionDuration: '255ms',
      transitionDelay: open ? `${FOOTER_BASE + i * FOOTER_STAGGER}ms` : '0ms',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(12px)',
    }
  }

  return (
    <div onClick={onClose} className={`fixed inset-0 z-50 bg-[#f0f0f0]/75 backdrop-blur-[15px] flex flex-col transition-opacity duration-[150ms] ease-in ${
      open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-2xl mx-auto w-full px-6 pt-6 pb-4 flex justify-between items-center">
        <span className="text-base opacity-0 select-none">Nick Hallam</span>
        {hasGhosts && (
          <div
            className="transition-[opacity,transform] duration-300 ease-out"
            style={{
              transitionDelay: open ? '60ms' : '0ms',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(8px)',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); easterEggClearGhostsRef.current?.(); onClose() }}
              className="text-base text-[#888] hover:text-[#242424] transition-colors cursor-pointer"
            >
              Clean up the stickers 🍕
            </button>
          </div>
        )}
      </div>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col px-6 pb-[28px]">
        <div className="flex-1 flex items-center">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }, i) => (
              <div
                key={href}
                className="transition-[opacity,transform] duration-300 ease-out"
                style={navStyle(i)}
              >
                <Link
                  href={href}
                  onClick={onClose}
                  className="inline-block text-[2.75rem] leading-[1.1] font-black text-[#1C1C1C] hover:text-[#555] transition-colors"
                  style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
                >
                  {label}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-1">
          {(() => {
            let i = 0
            const items = []
            socialLinks.forEach(({ href, label, hoverClass }) => {
              const idx = i++
              items.push(
                <div key={label} className="transition-[opacity,transform] duration-300 ease-out" style={footerStyle(idx)}>
                  <a href={href} className={`text-base text-[#888] transition-colors ${hoverClass}`} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </div>
              )
            })
            const emailIdx = i++
            items.push(
              <div key="email" className="transition-[opacity,transform] duration-300 ease-out" style={footerStyle(emailIdx)}>
                <span className="relative inline-flex items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyEmail() }}
                    className="text-base text-[#888] hover:text-[#242424] transition-colors cursor-pointer"
                  >
                    nrhallam@gmail.com
                  </button>
                  <span className={`text-base text-[#242424] transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                    Copied!
                  </span>
                </span>
              </div>
            )
            return items
          })()}
        </div>
      </div>
    </div>
  )
}
