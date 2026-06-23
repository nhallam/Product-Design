'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const GROTESK = "'AmericanGroteskCondensed', Arial, sans-serif"

const STORES = [
  { name: 'Ergot Records',           borough: 'Manhattan', hours: 'Mon–Thu 11 AM–7 PM; Fri–Sat 12–8 PM; Sun 12–6 PM',                          address: '32 E 2nd St, New York, NY 10003' },
  { name: 'Human Head',              borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                              address: '289 Meserole St, Brooklyn, NY 11206' },
  { name: 'Earwax Records',          borough: 'Brooklyn',  hours: 'Mon–Fri 11:30 AM–6:30 PM; Sat 11:30 AM–7 PM; Sun 12–6:30 PM',               address: '339 Bedford Ave, Brooklyn, NY 11211' },
  { name: 'Manhattan45',             borough: 'Manhattan', hours: 'Tue–Sat 1–8 PM; Mon & Sun closed',                                          address: '220 E 10th St, New York, NY 10003' },
  { name: '690 Woodward Garage',     borough: 'Queens',    hours: 'Daily 12–8 PM',                                                              address: 'Woodward Ave, Ridgewood, NY 11385' },
  { name: 'Academy Record Annex',    borough: 'Brooklyn',  hours: 'Daily 11 AM–7 PM',                                                           address: '242 Banker St, Brooklyn, NY 11222' },
  { name: 'Razor-N-Tape',            borough: 'Brooklyn',  hours: 'Fri 1–8 PM; Sat 12–8 PM; Sun 1–6 PM; Mon–Thu closed',                       address: '110 Meserole Ave, Brooklyn, NY 11222' },
  { name: 'Academy Records',         borough: 'Manhattan', hours: 'Mon 12–6 PM; Tue–Thu 12–7 PM; Fri–Sat 12–8 PM; Sun 12–7 PM',                address: '12 W 18th St, New York, NY 10011' },
  { name: 'A-1',                     borough: 'Manhattan', hours: 'Daily 12–8 PM',                                                              address: '439 E 6th St, New York, NY 10009' },
  { name: 'Revival Records',         borough: 'Manhattan', hours: 'Mon–Thu 10:30 AM–10 PM; Fri 12–11 PM; Sat 11:30 AM–11:30 PM; Sun 10:30 AM–10 PM', address: '197 Bleecker St, New York, NY 10012' },
  { name: 'Boom Service',            borough: 'Brooklyn',  hours: 'Wed–Sun 12–8 PM; Mon–Tue closed',                                           address: '311 Graham Ave, Brooklyn, NY 11211' },
  { name: 'Superior Elevation',      borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                              address: '616 Grand St, Brooklyn, NY 11211' },
]

const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Current day-of-week (0=Sun) and minutes-since-midnight in NYC time,
// regardless of the visitor's local timezone.
function nycNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date())

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const day = DAY_ABBREVS.indexOf(get('weekday'))
  let hour = parseInt(get('hour'), 10)
  if (hour === 24) hour = 0 // some engines emit "24" for midnight
  const minute = parseInt(get('minute'), 10)
  return { day, minutes: hour * 60 + minute }
}

function dayInRange(today: number, startAbbrev: string, endAbbrev: string): boolean {
  const s = DAY_ABBREVS.indexOf(startAbbrev)
  const e = DAY_ABBREVS.indexOf(endAbbrev)
  if (s === -1 || e === -1) return false
  if (s <= e) return today >= s && today <= e
  return today >= s || today <= e
}

function getTodayHours(hours: string): string {
  const today = nycNow().day
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

// Parse "11 AM", "12", "6:30 PM" into minutes since midnight.
// If no AM/PM is present, inherit the supplied fallback meridiem.
function parseClock(str: string, fallback: 'AM' | 'PM'): number | null {
  const m = str.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i)
  if (!m) return null
  let hour = parseInt(m[1], 10)
  const minute = m[2] ? parseInt(m[2], 10) : 0
  const meridiem = (m[3]?.toUpperCase() as 'AM' | 'PM') ?? fallback
  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0
  return hour * 60 + minute
}

// Returns true if the store is open at the current day/time.
function isOpenNow(hours: string): boolean {
  const range = getTodayHours(hours)
  if (range === 'Closed' || range === '—') return false

  const [startStr, endStr] = range.split('–')
  if (!startStr || !endStr) return false

  // The closing time always carries AM/PM; the opening time may inherit it.
  const endMeridiem = /PM/i.test(endStr) ? 'PM' : 'AM'
  const open = parseClock(startStr, endMeridiem)
  const close = parseClock(endStr, endMeridiem)
  if (open === null || close === null) return false

  const mins = nycNow().minutes
  return close >= open ? mins >= open && mins < close : mins >= open || mins < close
}

const INFO_RATIO = 0.55
const LABEL_SIZE = 32
const MAX_SIZE = 32
const MIN_SIZE = 8

const base: React.CSSProperties = {
  fontFamily: GROTESK,
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: '0.01em',
  textAlign: 'center',
}

export default function RecordShopSticker({ ghost = false }: { ghost?: boolean }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * STORES.length))
  const store  = STORES[index]
  const openLabel = isOpenNow(store.hours) ? 'OPEN' : 'CLOSED'
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(store.address)}`

  const cardRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  const [nameSize, setNameSize] = useState(MAX_SIZE)
  const [labelSize, setLabelSize] = useState(LABEL_SIZE)

  // Shrink the fixed labels just enough that each stays on a single line.
  useLayoutEffect(() => {
    const labels = labelRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!labels.length) return

    let s = LABEL_SIZE
    const apply = () => labels.forEach((el) => { el.style.fontSize = `${s}px` })
    const fits = () => labels.every((el) => el.scrollWidth <= el.clientWidth + 1)

    apply()
    while (!fits() && s > MIN_SIZE) { s -= 0.5; apply() }
    setLabelSize(s)
  }, [ghost])

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return

    let s = MAX_SIZE
    const apply = () => {
      if (nameRef.current) nameRef.current.style.fontSize = `${s}px`
      if (infoRef.current) infoRef.current.style.fontSize = `${s * INFO_RATIO}px`
    }
    const fits = () => card.scrollHeight <= card.clientHeight + 1

    apply()
    while (!fits() && s > MIN_SIZE) { s -= 0.5; apply() }
    setNameSize(s)
  }, [index, ghost, labelSize])

  const ls: React.CSSProperties = { ...base, fontSize: `${labelSize}px`, whiteSpace: 'nowrap' }
  const ms: React.CSSProperties = { ...base, fontSize: `${nameSize}px` }
  const is: React.CSSProperties = { ...base, fontSize: `${nameSize * INFO_RATIO}px` }

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex(i => (i + 1) % STORES.length) }

  return (
    <div
      ref={cardRef}
      className="bg-white shadow-lg w-[180px] flex flex-col"
      style={{ borderRadius: '4px', height: '250px', padding: '12px 14px', overflow: 'hidden' }}
    >
      {/* Header */}
      <div ref={(el) => { labelRefs.current[0] = el }} style={ls}>BEST NYC</div>
      <div ref={(el) => { labelRefs.current[1] = el }} style={ls}>RECORD STORES</div>

      <div style={{ flex: 1 }} />

      {/* Store info */}
      <div ref={nameRef} style={ms}>{store.name.toUpperCase()}</div>
      <div ref={infoRef} style={is}>{store.borough.toUpperCase()} – {openLabel}</div>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      {!ghost && (
        <>
          <button onClick={next} className="hover:opacity-50 transition-opacity w-full">
            <div ref={(el) => { labelRefs.current[2] = el }} style={ls}>NEXT STORE</div>
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover:opacity-50 transition-opacity"
            style={{ display: 'block' }}
          >
            <div ref={(el) => { labelRefs.current[3] = el }} style={ls}>DIRECTIONS</div>
          </a>
        </>
      )}
    </div>
  )
}
