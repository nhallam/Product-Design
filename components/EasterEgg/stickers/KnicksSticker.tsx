'use client'

import { useEffect, useState } from 'react'
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
  if (!isOT) return `Q${period} · ${clock}`
  if (period === 5) return `OT · ${clock}`
  return `${period - 4}OT · ${clock}`
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
    <div className="bg-[#F58426] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
      <div className="text-3xl mb-2">🏀</div>

      {state.status === 'loading' && (
        <>
          <div className="text-base font-bold text-white">Knicks</div>
          <div className="text-sm text-white/70 mt-0.5">Loading...</div>
        </>
      )}

      {state.status === 'unknown' && (
        <>
          <div className="text-base font-bold text-white">Knicks</div>
          <div className="text-sm text-white/70 mt-0.5">No data available</div>
        </>
      )}

      {(state.status === 'live' || state.status === 'final') && (
        <>
          <div className="text-sm font-bold text-white leading-tight">
            Knicks vs. {(state as KnicksData).oppName}
          </div>
          <div className="text-2xl font-black text-white mt-1 tabular-nums">
            {(state as KnicksData).knicksScore} – {(state as KnicksData).oppScore}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            {isLive && (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            )}
            <span className="text-xs text-white/80">{periodLabel(state as KnicksData)}</span>
          </div>
        </>
      )}
    </div>
  )
}
