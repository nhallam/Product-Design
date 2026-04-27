'use client'

import { useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="max-w-2xl mx-auto h-screen flex flex-col">
        <Nav onMenuOpen={() => setMenuOpen(true)} />
        {children}
      </div>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
