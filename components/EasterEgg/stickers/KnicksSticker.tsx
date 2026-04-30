'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { KnicksData } from '@/app/api/knicks/route'

type State = KnicksData | { status: 'loading' }

function periodLabel(data: Extract<KnicksData, { status: 'live' | 'final' }>): string {
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

function getTimeLeft(gameTime: string) {
  const diff = new Date(gameTime).getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
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
      <span className="text-sm font-bold text-[#1C1C1C] flex-1">{abbrev}</span>
      <span className="text-xl font-black text-[#1C1C1C] tabular-nums">{score}</span>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-lg font-black text-[#1C1C1C] tabular-nums leading-none">{String(value).padStart(2, '0')}</span>
      <span className="text-[9px] text-[#1C1C1C]/40 uppercase tracking-wide mt-0.5">{label}</span>
    </div>
  )
}

export default function KnicksSticker() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null)

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/knicks')
        .then((r) => r.json())
        .then((data: KnicksData) => {
          setState(data)
          if (data.status === 'upcoming') {
            setTimeLeft(getTimeLeft(data.gameTime))
          }
        })
        .catch(() => setState({ status: 'unknown' }))
    }

    fetchData()
    const poll = setInterval(fetchData, 30000)
    return () => clearInterval(poll)
  }, [])

  useEffect(() => {
    if (state.status !== 'upcoming') return
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft((state as Extract<KnicksData, { status: 'upcoming' }>).gameTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [state])

  if (state.status === 'loading' || state.status === 'unknown') {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[200px] px-5 py-4">
        <div className="text-3xl mb-2">🏀</div>
        <div className="text-base font-bold text-[#1C1C1C]">Knicks</div>
        <div className="text-sm text-[#1C1C1C]/50 mt-0.5">
          {state.status === 'loading' ? 'Loading...' : 'No data'}
        </div>
      </div>
    )
  }

  if (state.status === 'upcoming') {
    const { isHome, oppAbbrev, oppDisplayName, oppLogo, knicksLogo } = state
    const units = timeLeft
      ? timeLeft.days > 0
        ? [{ value: timeLeft.days, label: 'd' }, { value: timeLeft.hours, label: 'h' }, { value: timeLeft.minutes, label: 'm' }]
        : [{ value: timeLeft.hours, label: 'h' }, { value: timeLeft.minutes, label: 'm' }, { value: timeLeft.seconds, label: 's' }]
      : null

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[200px]">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 mb-3">
            {knicksLogo && (
              <Image src={knicksLogo} alt="NYK" width={28} height={28} className="object-contain pointer-events-none" draggable={false} />
            )}
            <span className="text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-wider">Next Game</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {oppLogo && (
              <Image src={oppLogo} alt={oppAbbrev} width={24} height={24} className="object-contain pointer-events-none" draggable={false} />
            )}
            <span className="text-sm font-bold text-[#1C1C1C]">
              {isHome ? 'vs' : '@'} {oppDisplayName}
            </span>
          </div>

          {units ? (
            <div className="flex items-end gap-3">
              {units.map(({ value, label }) => (
                <CountdownUnit key={label} value={value} label={label} />
              ))}
            </div>
          ) : (
            <div className="text-sm font-bold text-[#1C1C1C]">Starting soon</div>
          )}
        </div>
      </div>
    )
  }

  const gameData = state as Extract<KnicksData, { status: 'live' | 'final' }>
  const isLive = gameData.status === 'live'

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-[200px]">
      <TeamRow logo={gameData.knicksLogo} abbrev={gameData.knicksAbbrev} score={gameData.knicksScore} color={gameData.knicksColor} />
      <div className="flex items-center gap-2 px-4">
        <div className="h-px flex-1 bg-black/10" />
        <div className="flex items-center gap-1.5">
          {isLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
          <span className="text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-wider">
            {periodLabel(gameData)}
          </span>
        </div>
        <div className="h-px flex-1 bg-black/10" />
      </div>
      <TeamRow logo={gameData.oppLogo} abbrev={gameData.oppAbbrev} score={gameData.oppScore} color={gameData.oppColor} />
    </div>
  )
}
