'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'react-feather'

const STORES = [
  { name: 'Ergot Records',           borough: 'Manhattan', hours: 'Mon–Thu 11 AM–7 PM; Fri–Sat 12–8 PM; Sun 12–6 PM',                                                                          address: '32 E 2nd St, New York, NY 10003' },
  { name: 'Human Head Records',      borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                                                                              address: '289 Meserole St, Brooklyn, NY 11206' },
  { name: 'Earwax Records',          borough: 'Brooklyn',  hours: 'Mon–Fri 11:30 AM–6:30 PM; Sat 11:30 AM–7 PM; Sun 12–6:30 PM',                                                               address: '339 Bedford Ave, Brooklyn, NY 11211' },
  { name: 'Manhattan45',             borough: 'Manhattan', hours: 'Tue–Sat 1–8 PM; Mon & Sun closed',                                                                                          address: '220 E 10th St, New York, NY 10003' },
  { name: '690 Woodward Garage',     borough: 'Queens',    hours: 'Daily 12–8 PM',                                                                                                              address: 'Woodward Ave, Ridgewood, NY 11385' },
  { name: 'Academy Record Annex',    borough: 'Brooklyn',  hours: 'Daily 11 AM–7 PM',                                                                                                          address: '242 Banker St, Brooklyn, NY 11222' },
  { name: 'Razor-N-Tape',            borough: 'Brooklyn',  hours: 'Fri 1–8 PM; Sat 12–8 PM; Sun 1–6 PM; Mon–Thu closed',                                                                      address: '110 Meserole Ave, Brooklyn, NY 11222' },
  { name: 'Academy Records',         borough: 'Manhattan', hours: 'Mon 12–6 PM; Tue–Thu 12–7 PM; Fri–Sat 12–8 PM; Sun 12–7 PM',                                                               address: '12 W 18th St, New York, NY 10011' },
  { name: 'A-1 Record Shop',         borough: 'Manhattan', hours: 'Daily 12–8 PM',                                                                                                              address: '439 E 6th St, New York, NY 10009' },
  { name: 'Village Revival Records', borough: 'Manhattan', hours: 'Mon–Thu 10:30 AM–10 PM; Fri 12–11 PM; Sat 11:30 AM–11:30 PM; Sun 10:30 AM–10 PM',                                          address: '197 Bleecker St, New York, NY 10012' },
  { name: 'Boom Service Records',    borough: 'Brooklyn',  hours: 'Wed–Sun 12–8 PM; Mon–Tue closed',                                                                                           address: '311 Graham Ave, Brooklyn, NY 11211' },
  { name: 'Superior Elevation',      borough: 'Brooklyn',  hours: 'Daily 12–8 PM',                                                                                                              address: '616 Grand St, Brooklyn, NY 11211' },
]

const DAY_ABBREVS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function dayInRange(today: number, startAbbrev: string, endAbbrev: string): boolean {
  const s = DAY_ABBREVS.indexOf(startAbbrev)
  const e = DAY_ABBREVS.indexOf(endAbbrev)
  if (s === -1 || e === -1) return false
  if (s <= e) return today >= s && today <= e
  return today >= s || today <= e // wraps (e.g. Wed–Sun)
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
      if (matches) return isClosed ? 'Closed today' : timePart
    }
  }
  return 'Hours unavailable'
}

export default function RecordShopSticker({ ghost = false }: { ghost?: boolean }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * STORES.length))
  const store = STORES[index]
  const todayHours = getTodayHours(store.hours)
  const isClosed = todayHours === 'Closed today'
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(store.address)}`

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i - 1 + STORES.length) % STORES.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i + 1) % STORES.length) }

  return (
    <div className="bg-white shadow-lg overflow-hidden w-[220px] text-center" style={{ borderRadius: '5px' }}>
      <div className="px-4 pt-3 pb-2 border-b border-black/5">
        <div
          className="text-2xl font-black text-[#1C1C1C] leading-none"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          NYC Record Shops
        </div>
      </div>

      <div className="px-4 pt-3 pb-3">
        <div className="text-sm font-black text-[#1C1C1C] leading-tight">{store.name}</div>
        <div className="text-xs font-medium text-[#1C1C1C]/40 mt-0.5">{store.borough}</div>
        <div className={`text-[11px] mt-2 font-medium ${isClosed ? 'text-red-400' : 'text-[#1C1C1C]/50'}`}>
          {todayHours}
        </div>
      </div>

      {!ghost && (
        <div className="flex items-center border-t border-black/5 px-2 py-1.5">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#1C1C1C]/30 hover:text-[#1C1C1C] hover:bg-black/5 transition-colors shrink-0"
            aria-label="Previous store"
          >
            <ChevronLeft size={15} />
          </button>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 mx-1 py-1.5 rounded-md bg-black/5 text-[#1C1C1C]/50 hover:bg-black/10 hover:text-[#1C1C1C] transition-colors flex items-center justify-center"
          >
            <MapPin size={14} strokeWidth={2} />
          </a>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#1C1C1C]/30 hover:text-[#1C1C1C] hover:bg-black/5 transition-colors shrink-0"
            aria-label="Next store"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
