'use client'

import { useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="relative max-w-2xl mx-auto min-h-[100dvh] flex flex-col">
        <Nav menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
        {children}
      </div>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
