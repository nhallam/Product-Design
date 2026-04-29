'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { KnicksData } from '@/app/api/knicks/route'

type State = KnicksData | { status: 'loading' } | { status: 'unknown' }

function periodLabel(data: KnicksData): string {
  const { status, period, clock, isOT } = data
  if (status === 'final') {
    if (!isOT) return 'Final'
    if (period === 5) return 'Final / OT'
    return `Final / ${period - 4}OT`
  }
  if (period === 0) return ''
  const quarter = !isOT ? `Q${period}` : period === 5 ? 'OT' : `${period - 4}OT`
  return `${quarter} · ${clock}`
}

function TeamRow({ logo, abbrev, score, color }: { logo: string; abbrev: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="w-[3px] self-stretch rounded-full shrink-0" style={{ backgroundColor: `#${color}` }} />
      {logo ? (
        <Image src={logo} alt={abbrev} width={32} height={32} className="object-contain pointer-events-none" draggable={false} />
      ) : (
        <div className="w-8 h-8" />
      )}
      <span className="text-sm font-bold text-white flex-1">{abbrev}</span>
      <span className="text-xl font-black text-white tabular-nums">{score}</span>
    </div>
  )
}

export default function KnicksSticker() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    fetch('/api/knicks')
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ status: 'unknown' }))
  }, [])

  const isLive = state.status === 'live'

  return (
    <div className="bg-[#1C1C1C] rounded-2xl shadow-lg overflow-hidden w-[200px]">
      {state.status === 'loading' || state.status === 'unknown' ? (
        <div className="px-5 py-4">
          <div className="text-3xl mb-2">🏀</div>
          <div className="text-base font-bold text-white">Knicks</div>
          <div className="text-sm text-white/50 mt-0.5">
            {state.status === 'loading' ? 'Loading...' : 'No data'}
          </div>
        </div>
      ) : (
        <>
          <TeamRow
            logo={(state as KnicksData).knicksLogo}
            abbrev={(state as KnicksData).knicksAbbrev}
            score={(state as KnicksData).knicksScore}
            color={(state as KnicksData).knicksColor}
          />

          <div className="flex items-center gap-2 px-4">
            <div className="h-px flex-1 bg-white/10" />
            <div className="flex items-center gap-1.5">
              {isLive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                {periodLabel(state as KnicksData)}
              </span>
            </div>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <TeamRow
            logo={(state as KnicksData).oppLogo}
            abbrev={(state as KnicksData).oppAbbrev}
            score={(state as KnicksData).oppScore}
            color={(state as KnicksData).oppColor}
          />
        </>
      )}
    </div>
  )
}
