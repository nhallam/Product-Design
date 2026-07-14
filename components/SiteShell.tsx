'use client'

import { useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'
import Footer from './Footer'
import EasterEggLayer from './EasterEgg/EasterEggLayer'

export default function SiteShell({ children, lastUpdated }: { children: React.ReactNode; lastUpdated: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <EasterEggLayer />
      <div className="relative max-w-2xl mx-auto min-h-[100dvh] flex flex-col">
        <Nav menuOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
        {children}
        <Footer lastUpdated={lastUpdated} />
      </div>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
