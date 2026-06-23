'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const GROTESK = "'AmericanGroteskCondensed', Arial, sans-serif"

const STORES = [
  { name: 'Ergot Records',           borough: 'Manhattan', hours: 'Mon–Thu 11 AM–7 PM; Fri–Sat 12–8 PM; Sun 12–6 PM',                          address: '32 E 2nd St, New York, NY 10003' },
  { name: 'Human Head Records',      borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                              address: '289 Meserole St, Brooklyn, NY 11206' },
  { name: 'Earwax Records',          borough: 'Brooklyn',  hours: 'Mon–Fri 11:30 AM–6:30 PM; Sat 11:30 AM–7 PM; Sun 12–6:30 PM',               address: '339 Bedford Ave, Brooklyn, NY 11211' },
  { name: 'Manhattan45',             borough: 'Manhattan', hours: 'Tue–Sat 1–8 PM; Mon & Sun closed',                                          address: '220 E 10th St, New York, NY 10003' },
  { name: '690 Woodward Garage',     borough: 'Queens',    hours: 'Daily 12–8 PM',                                                              address: 'Woodward Ave, Ridgewood, NY 11385' },
  { name: 'Academy Record Annex',    borough: 'Brooklyn',  hours: 'Daily 11 AM–7 PM',                                                           address: '242 Banker St, Brooklyn, NY 11222' },
  { name: 'Razor-N-Tape',            borough: 'Brooklyn',  hours: 'Fri 1–8 PM; Sat 12–8 PM; Sun 1–6 PM; Mon–Thu closed',                       address: '110 Meserole Ave, Brooklyn, NY 11222' },
  { name: 'Academy Records',         borough: 'Manhattan', hours: 'Mon 12–6 PM; Tue–Thu 12–7 PM; Fri–Sat 12–8 PM; Sun 12–7 PM',                address: '12 W 18th St, New York, NY 10011' },
  { name: 'A-1 Record Shop',         borough: 'Manhattan', hours: 'Daily 12–8 PM',                                                              address: '439 E 6th St, New York, NY 10009' },
  { name: 'Village Revival Records', borough: 'Manhattan', hours: 'Mon–Thu 10:30 AM–10 PM; Fri 12–11 PM; Sat 11:30 AM–11:30 PM; Sun 10:30 AM–10 PM', address: '197 Bleecker St, New York, NY 10012' },
  { name: 'Boom Service Records',    borough: 'Brooklyn',  hours: 'Wed–Sun 12–8 PM; Mon–Tue closed',                                           address: '311 Graham Ave, Brooklyn, NY 11211' },
  { name: 'Superior Elevation',      borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                              address: '616 Grand St, Brooklyn, NY 11211' },
]

const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dayInRange(today: number, startAbbrev: string, endAbbrev: string): boolean {
  const s = DAY_ABBREVS.indexOf(startAbbrev)
  const e = DAY_ABBREVS.indexOf(endAbbrev)
  if (s === -1 || e === -1) return false
  if (s <= e) return today >= s && today <= e
  return today >= s || today <= e
}

function getTodayHours(hours: string): string {
  const today = new Date().getDay()
  for (const segment of hours.split('; ')) {
    if (/^daily/i.test(segment)) return segment.replace(/^daily\s*/i, '')
    const match = segment.match(/^(.+?)\s+([\d:].+|closed)$/i)
    if (!match) continue
    const dayPart = match[1].trim()
    const timePart = match[2]
    const isClosed = /^closed$/i.test(timePart)
    for (const group of dayPart.split(/\s*&\s*/)) {
      const parts = group.trim().split('–')
      const matches = parts.length === 2
        ? dayInRange(today, parts[0].trim(), parts[1].trim())
        : DAY_ABBREVS.indexOf(parts[0].trim()) === today
      if (matches) return isClosed ? 'Closed' : timePart
    }
  }
  return '—'
}

const HEIGHTS = { title: 30, name: 70, borough: 28, today: 28, directions: 30, next: 30 }
const MAX_SIZE = 35
const MIN_SIZE = 10

export default function RecordShopSticker({ ghost = false }: { ghost?: boolean }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * STORES.length))
  const store = STORES[index]
  const todayHours = getTodayHours(store.hours)
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(store.address)}`

  const titleRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const boroughRef = useRef<HTMLDivElement>(null)
  const todayRef = useRef<HTMLDivElement>(null)
  const directionsRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  const [fontSize, setFontSize] = useState(MAX_SIZE)

  useLayoutEffect(() => {
    const entries = [
      { ref: titleRef,      height: HEIGHTS.title },
      { ref: nameRef,       height: HEIGHTS.name },
      { ref: boroughRef,    height: HEIGHTS.borough },
      { ref: todayRef,      height: HEIGHTS.today },
      ...(!ghost ? [
        { ref: directionsRef, height: HEIGHTS.directions },
        { ref: nextRef,       height: HEIGHTS.next },
      ] : []),
    ]

    let s = MAX_SIZE
    const apply = () => entries.forEach(({ ref }) => { if (ref.current) ref.current.style.fontSize = `${s}px` })
    const allFit = () => entries.every(({ ref, height }) => !ref.current || ref.current.scrollHeight <= height + 1)

    apply()
    while (!allFit() && s > MIN_SIZE) {
      s -= 0.5
      apply()
    }
    setFontSize(s)
  }, [index, ghost])

  const textStyle: React.CSSProperties = {
    fontFamily: GROTESK,
    fontWeight: 900,
    fontSize: `${fontSize}px`,
    lineHeight: 1.15,
    letterSpacing: '0.01em',
    textAlign: 'center',
    overflow: 'hidden',
  }

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i + 1) % STORES.length) }

  return (
    <div
      className="bg-white shadow-lg w-[160px] overflow-hidden flex flex-col"
      style={{ borderRadius: '4px', height: '250px', padding: '12px 14px' }}
    >
      <div ref={titleRef} style={{ ...textStyle, height: `${HEIGHTS.title}px` }}>BEST RECORD SHOPS IN NYC</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div ref={nameRef} style={{ ...textStyle, height: `${HEIGHTS.name}px`, width: '100%' }}>{store.name.toUpperCase()}</div>
      </div>
      <div ref={boroughRef} style={{ ...textStyle, height: `${HEIGHTS.borough}px` }}>{store.borough.toUpperCase()}</div>
      <div ref={todayRef} style={{ ...textStyle, height: `${HEIGHTS.today}px` }}>{`TODAY ${todayHours.toUpperCase()}`}</div>
      {!ghost && (
        <>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:opacity-50 transition-opacity"
            style={{ display: 'block' }}
          >
            <div ref={directionsRef} style={{ ...textStyle, height: `${HEIGHTS.directions}px` }}>DIRECTIONS</div>
          </a>
          <button onClick={next} className="hover:opacity-50 transition-opacity w-full">
            <div ref={nextRef} style={{ ...textStyle, height: `${HEIGHTS.next}px` }}>NEXT</div>
          </button>
        </>
      )}
    </div>
  )
}
