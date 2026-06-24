'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Sun, Moon, Star, ArrowUpRight } from 'react-feather'
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const hasGhosts = useHasGhosts()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Sync the toggle label with whatever the no-flash script set on <html>.
  useEffect(() => {
    const t = document.documentElement.dataset.theme
    if (t === 'dark' || t === 'light') setTheme(t)
  }, [])

  function toggleTheme(e: React.MouseEvent) {
    e.stopPropagation()
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    setTheme(next)
  }

  function copyEmail() {
    navigator.clipboard.writeText('nrhallam@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const NAV_STAGGER = 70
  const FOOTER_BASE = navLinks.length * NAV_STAGGER + 60
  const FOOTER_STAGGER = 32

  function navStyle(i: number) {
    return {
      transitionDelay: open ? `${i * NAV_STAGGER}ms` : '0ms',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(16px)',
    }
  }

  function footerStyle(i: number) {
    return {
      transitionDuration: '191ms',
      transitionDelay: open ? `${FOOTER_BASE + i * FOOTER_STAGGER}ms` : '0ms',
      opacity: open ? 1 : 0,
      transform: open ? 'translateY(0)' : 'translateY(12px)',
    }
  }

  return (
    <div onClick={onClose} className={`fixed inset-0 z-50 bg-[var(--bg)]/75 backdrop-blur-[15px] flex flex-col transition-opacity duration-[150ms] ease-in ${
      open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-2xl mx-auto w-full px-6 pt-6 pb-4">
        <span className="text-base opacity-0 select-none">Nick Hallam</span>
      </div>
      {hasGhosts && (
        <div className="max-w-2xl mx-auto w-full px-6 flex justify-end -mt-3">
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
              className="text-base text-[var(--muted)] hover:text-[var(--text-strong)] transition-colors cursor-pointer"
            >
              Clear stickers
            </button>
          </div>
        </div>
      )}

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
                  className="inline-block text-[2.75rem] leading-[1.1] font-black text-[var(--text)] hover:text-[var(--hover)] transition-colors"
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
            const themeIdx = i++
            items.push(
              <div key="theme" className="transition-[opacity,transform] duration-300 ease-out" style={footerStyle(themeIdx)}>
                <button
                  onClick={toggleTheme}
                  role="switch"
                  aria-checked={theme === 'dark'}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="relative w-16 h-8 mb-1 flex items-center rounded-full bg-[var(--surface)] cursor-pointer"
                >
                  <span
                    className="absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-[var(--text)] transition-transform duration-300 ease-out"
                    style={{ transform: theme === 'dark' ? 'translateX(32px)' : 'translateX(0)' }}
                  />
                  <span className="relative z-10 flex-1 flex items-center justify-center">
                    <Sun
                      size={14}
                      strokeWidth={2.5}
                      style={{
                        color: theme === 'dark' ? 'var(--muted)' : '#FACC15',
                        transform: theme === 'dark' ? 'rotate(0deg)' : 'rotate(100deg)',
                        // Only animate the spin when light is being selected; on
                        // deselect, reset the rotation instantly and just fade the color.
                        transition: theme === 'dark'
                          ? 'color 0.4s ease'
                          : 'transform 0.5s cubic-bezier(0.45, 0, 0.55, 1), color 0.4s ease',
                      }}
                    />
                  </span>
                  <span className="relative z-10 flex-1 flex items-center justify-center">
                    {/* Vertical carousel: on selecting dark, the moon slides down,
                        the stars slide in and down, then the moon settles back. */}
                    <span className="block overflow-hidden" style={{ height: 20, width: 20 }}>
                      <span
                        className="flex flex-col items-center"
                        style={{
                          transform: 'translateY(0)',
                          animation: theme === 'dark'
                            ? 'moon-carousel 0.5s cubic-bezier(0.3, 0.5, 0.5, 0.3) both'
                            : undefined,
                        }}
                      >
                        {/* Top cell — the resting moon (and the light-mode state) */}
                        <span className="shrink-0 flex items-center justify-center" style={{ height: 20, width: 20 }}>
                          <Moon size={14} strokeWidth={2.5} style={{ color: theme === 'dark' ? '#3B82F6' : 'var(--muted)', transition: 'color 0.4s ease' }} />
                        </span>
                        {/* Middle cell — the stars */}
                        <span className="shrink-0 relative flex items-center justify-center" style={{ height: 20, width: 20 }}>
                          <Star size={11} strokeWidth={2} fill="#3B82F6" style={{ color: '#3B82F6' }} />
                          <Star size={6} strokeWidth={2} fill="#3B82F6" style={{ color: '#3B82F6', position: 'absolute', top: 2, right: 2 }} />
                        </span>
                        {/* Bottom cell — the moon the animation starts on */}
                        <span className="shrink-0 flex items-center justify-center" style={{ height: 20, width: 20 }}>
                          <Moon size={14} strokeWidth={2.5} style={{ color: '#3B82F6' }} />
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            )
            socialLinks.forEach(({ href, label, hoverClass }) => {
              const idx = i++
              items.push(
                <div key={label} className="transition-[opacity,transform] duration-300 ease-out" style={footerStyle(idx)}>
                  <a href={href} className={`group inline-flex items-center gap-1.5 text-base text-[var(--muted)] transition-colors ${hoverClass}`} target="_blank" rel="noopener noreferrer">
                    {label}
                    <ArrowUpRight size={16} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted)]" />
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
                    className="text-base text-[var(--muted)] hover:text-[var(--text-strong)] transition-colors cursor-pointer"
                  >
                    nrhallam@gmail.com
                  </button>
                  <span className={`text-base text-[var(--text-strong)] transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
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
