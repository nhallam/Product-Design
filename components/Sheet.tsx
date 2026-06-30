'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'react-feather'

interface SheetProps {
  open: boolean
  onClose: () => void
  // Changing this resets the scroll position to the top (e.g. a new slug).
  resetKey?: string
  children: React.ReactNode
}

// A white panel that slides up from the bottom and stops just below the
// sticky nav. Shared by the project and article sheets.
export default function Sheet({ open, onClose, resetKey, children }: SheetProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  // The sheet stops just below the sticky nav, leaving it visible above.
  const [navHeight, setNavHeight] = useState(0)

  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector('nav')
      setNavHeight(nav ? nav.getBoundingClientRect().height : 0)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [open])

  // Lock background scroll while sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Reset scroll position when a new item opens
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0
  }, [open, resetKey])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      ref={scrollRef}
      className={`fixed left-0 right-0 bottom-0 z-[200] bg-white overflow-y-auto transition-transform duration-[380ms] ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{
        top: navHeight,
        transitionTimingFunction: open ? 'cubic-bezier(0.32, 0.72, 0, 1)' : 'cubic-bezier(0.5, 0, 0.84, 0)',
      }}
    >
      {/* Header with close button — full-width bg covers content scrolling behind */}
      <div className="sticky top-0 bg-white z-10">
        <div className="max-w-2xl mx-auto w-full flex justify-end px-6 pt-6 pb-4">
          <button
            onClick={onClose}
            className="text-[#1C1C1C] hover:opacity-40 transition-opacity"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {children}
    </div>
  )
}
