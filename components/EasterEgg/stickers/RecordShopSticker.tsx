'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'

const STORES = [
  { name: 'Ergot Records',          borough: 'Manhattan', hours: 'Mon–Thu 11 AM–7 PM; Fri–Sat 12–8 PM; Sun 12–6 PM' },
  { name: 'Human Head Records',     borough: 'Brooklyn',  hours: 'Daily 12–8 PM' },
  { name: 'Earwax Records',         borough: 'Brooklyn',  hours: 'Mon–Fri 11:30 AM–6:30 PM; Sat 11:30 AM–7 PM; Sun 12–6:30 PM' },
  { name: 'Manhattan45',            borough: 'Manhattan', hours: 'Tue–Sat 1–8 PM; Mon & Sun closed' },
  { name: '690 Woodward Garage',    borough: 'Queens',    hours: 'Daily 12–8 PM' },
  { name: 'Academy Record Annex',   borough: 'Brooklyn',  hours: 'Daily 11 AM–7 PM' },
  { name: 'Razor-N-Tape',           borough: 'Brooklyn',  hours: 'Fri 1–8 PM; Sat 12–8 PM; Sun 1–6 PM; Mon–Thu closed' },
  { name: 'Academy Records',        borough: 'Manhattan', hours: 'Mon 12–6 PM; Tue–Thu 12–7 PM; Fri–Sat 12–8 PM; Sun 12–7 PM' },
  { name: 'A-1 Record Shop',        borough: 'Manhattan', hours: 'Daily 12–8 PM' },
  { name: 'Village Revival Records',borough: 'Manhattan', hours: 'Mon–Thu 10:30 AM–10 PM; Fri 12–11 PM; Sat 11:30 AM–11:30 PM; Sun 10:30 AM–10 PM' },
  { name: 'Boom Service Records',   borough: 'Brooklyn',  hours: 'Wed–Sun 12–8 PM; Mon–Tue closed' },
  { name: 'Superior Elevation',     borough: 'Brooklyn',  hours: 'Daily 12–8 PM' },
]

export default function RecordShopSticker({ ghost = false }: { ghost?: boolean }) {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * STORES.length))
  const store = STORES[index]
  const hourLines = store.hours.split('; ')

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i - 1 + STORES.length) % STORES.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i + 1) % STORES.length) }

  return (
    <div className="bg-white shadow-lg overflow-hidden w-[220px]" style={{ borderRadius: '5px' }}>
      <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-black/5">
        <span className="text-base leading-none">💿</span>
        <span className="text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-wider">NYC Record Shops</span>
      </div>

      <div className="px-4 pt-3 pb-2">
        <div className="text-sm font-black text-[#1C1C1C] leading-tight truncate">{store.name}</div>
        <div className="text-xs font-medium text-[#1C1C1C]/40 mt-0.5 mb-2">{store.borough}</div>
        <div className="text-[10px] text-[#1C1C1C]/40 leading-relaxed">
          {hourLines.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      </div>

      {!ghost && (
        <div className="flex items-center border-t border-black/5 px-2 py-1.5">
          <button
            onClick={prev}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#1C1C1C]/30 hover:text-[#1C1C1C] hover:bg-black/5 transition-colors"
            aria-label="Previous store"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="flex-1 text-center text-[10px] text-[#1C1C1C]/25 font-medium tabular-nums">
            {index + 1} / {STORES.length}
          </span>
          <button
            onClick={next}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#1C1C1C]/30 hover:text-[#1C1C1C] hover:bg-black/5 transition-colors"
            aria-label="Next store"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  )
}
