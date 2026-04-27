'use client'

import { useState } from 'react'
import Nav from './Nav'
import Menu from './Menu'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <Nav onMenuOpen={() => setMenuOpen(true)} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
    </>
  )
}
