'use client'

import { useRef, useState } from 'react'

const VERSIONS = [
  ['match30', '3.0'],
  ['match31', '3.1'],
  ['match32', '3.2'],
  ['match33', '3.3'],
  ['match34', '3.4'],
  ['match35', '3.5'],
  ['match36', '3.6'],
  ['match37', '3.7'],
] as const

// The Kiki matches-flow embed: a sticky version column on the page driving
// the prototype iframe (same-origin, via its window.showVersion).
export default function KikiMatches() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [active, setActive] = useState('match37')

  const show = (key: string) => {
    setActive(key)
    const win = frameRef.current?.contentWindow as
      | (Window & { showVersion?: (k: string) => void })
      | null
    win?.showVersion?.(key)
  }

  return (
    <div
      className="mt-8 flex"
      style={{ width: 'min(92vw, 1440px)', position: 'relative', left: '50%', transform: 'translateX(-50%)' }}
    >
      <nav
        aria-label="Prototype versions"
        className="sticky self-start flex flex-col gap-2.5 pt-2 shrink-0"
        style={{ top: 110 }}
      >
        {VERSIONS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => show(key)}
            className={`text-left text-[15px] px-2 py-1 rounded-md cursor-pointer transition-colors ${
              active === key
                ? 'font-bold text-[var(--text)]'
                : 'font-medium text-[var(--muted)] hover:text-[var(--hover)]'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <iframe
        ref={frameRef}
        src="/kiki/matches.html"
        title="Kiki matches flow prototype"
        loading="lazy"
        className="flex-1 min-w-0"
        style={{ height: 810, border: 0 }}
      />
    </div>
  )
}
