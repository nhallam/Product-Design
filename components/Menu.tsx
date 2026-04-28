'use client'

import Link from 'next/link'
import { useEffect } from 'react'

interface MenuProps {
  open: boolean
  onClose: () => void
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/nickhallam/', label: 'LinkedIn' },
  { href: 'https://github.com/nhallam', label: 'Github' },
  { href: 'https://x.com/nhallam', label: 'Twitter' },
  { href: 'https://www.instagram.com/nhallam/', label: 'Instagram' },
]

export default function Menu({ open, onClose }: MenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className={`fixed inset-0 z-50 bg-[#f0f0f0] flex flex-col transition-opacity duration-[400ms] ease-in-out ${
      open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-2xl mx-auto w-full px-6 pt-6 pb-4">
        <span className="text-base opacity-0 select-none">Nick Hallam</span>
      </div>

      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-between px-6 py-12">
        <nav className="flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="text-[2.75rem] leading-[1.1] font-black underline underline-offset-4 text-[#1C1C1C] hover:text-[#555] transition-colors" style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1">
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              className="text-base text-[#888] hover:text-[#444] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          ))}
          <span className="text-base text-[#888]">nrhallam@gmail.com</span>
        </div>
      </div>
    </div>
  )
}
