'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Shown on every page except the home page.
export default function Footer({ lastUpdated }: { lastUpdated: string }) {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <footer className="mt-auto px-6 pt-10 pb-8 text-sm text-[var(--muted)]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <span>Last updated {lastUpdated}</span>
        <div className="flex items-center gap-5">
          <Link href="/resume" className="hover:text-[var(--text)] transition-colors">
            Resume
          </Link>
          <Link href="/newsletter" className="hover:text-[var(--text)] transition-colors">
            Newsletter
          </Link>
          <a
            href="https://x.com/nhallam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors"
          >
            Twitter
          </a>
          <a href="mailto:nrhallam@gmail.com" className="hover:text-[var(--text)] transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
