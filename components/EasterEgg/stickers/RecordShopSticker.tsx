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
  // Include the store name so Google resolves to the business listing rather
  // than just dropping a pin at the address coordinates.
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.name}, ${store.address}`)}`

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
    // Fit both vertically (whole card) and horizontally (the name itself, so a
    // long unbreakable word like "MANHATTAN45" shrinks instead of clipping).
    const fits = () =>
      card.scrollHeight <= card.clientHeight + 1 &&
      (!nameRef.current || nameRef.current.scrollWidth <= nameRef.current.clientWidth + 1)

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
      className="bg-[var(--surface)] text-[var(--text)] shadow-lg w-[180px] flex flex-col"
      style={{ borderRadius: '4px', height: '250px', padding: '12px 14px', overflow: 'hidden' }}
    >
      {/* Header */}
      <div ref={(el) => { labelRefs.current[0] = el }} style={ls}>BEST NYC</div>
      <div ref={(el) => { labelRefs.current[1] = el }} style={ls}>RECORD STORES</div>

      <div style={{ flex: 1 }} />

      {/* Store info */}
      <div ref={nameRef} style={ms}>{store.name.toUpperCase()}</div>
      <div ref={infoRef} style={is}>{store.borough.toUpperCase()}</div>

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
