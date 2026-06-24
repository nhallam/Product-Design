'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { ScoreData, TeamKey } from '@/app/api/scoreboard/route'
import { cachedFetch, freshFetch, TTL } from '../stickerData'

type State = ScoreData | { status: 'loading' }

const TEAM_ORDER: TeamKey[] = ['knicks', 'liberty', 'mets', 'yankees']

const TEAM_META: Record<TeamKey, { name: string; logo: string }> = {
  knicks:  { name: 'Knicks',  logo: 'https://a.espncdn.com/i/teamlogos/nba/500/18.png' },
  liberty: { name: 'Liberty', logo: 'https://a.espncdn.com/i/teamlogos/wnba/500/9.png' },
  mets:    { name: 'Mets',    logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/21.png' },
  yankees: { name: 'Yankees', logo: 'https://a.espncdn.com/i/teamlogos/mlb/500/10.png' },
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

export default function ScoreboardSticker({ ghost = false }: { ghost?: boolean }) {
  const [team, setTeam] = useState<TeamKey>('knicks')
  const [state, setState] = useState<State>({ status: 'loading' })
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null)
  const [fading, setFading] = useState(false)
  const switchingRef = useRef(false)

  const handleTeamChange = (key: TeamKey) => {
    if (key === team) return
    switchingRef.current = true
    setFading(true)
    setTeam(key)
  }

  useEffect(() => {
    let cancelled = false
    const url = `/api/scoreboard?team=${team}`

    const apply = (data: ScoreData) => {
      if (cancelled) return
      setState(data)
      if (data.status === 'upcoming') setTimeLeft(getTimeLeft(data.gameTime))
      if (switchingRef.current) {
        switchingRef.current = false
        setFading(false)
      }
    }
    const onError = () => {
      if (cancelled) return
      setState({ status: 'unknown' })
      switchingRef.current = false
      setFading(false)
    }

    // First paint is served instantly from the (pre)fetched cache when warm.
    cachedFetch<ScoreData>(url, TTL.scoreboard).then(apply).catch(onError)

    if (ghost) return () => { cancelled = true }
    // Poll bypasses the cache so live scores stay current.
    const poll = setInterval(() => {
      freshFetch<ScoreData>(url).then(apply).catch(onError)
    }, 30000)
    return () => { cancelled = true; clearInterval(poll) }
  }, [team, ghost])

  useEffect(() => {
    if (state.status !== 'upcoming') return
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft((state as Extract<ScoreData, { status: 'upcoming' }>).gameTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [state])

  const tabs = (
    <div className="flex items-center justify-center gap-1.5 px-3 pt-3 pb-2 border-b border-black/5">
      {TEAM_ORDER.map((key) => (
        <button
          key={key}
          onClick={(e) => { e.stopPropagation(); handleTeamChange(key) }}
          aria-label={TEAM_META[key].name}
          className={`p-1 rounded-md transition-opacity ${team === key ? 'opacity-100 bg-black/5' : 'opacity-40 hover:opacity-70'}`}
        >
          <Image src={TEAM_META[key].logo} alt={TEAM_META[key].name} width={22} height={22} className="object-contain pointer-events-none" draggable={false} />
        </button>
      ))}
    </div>
  )

  let body: React.ReactNode

  if (state.status === 'loading' || state.status === 'unknown') {
    body = (
      <div className="px-5 py-4 text-center">
        <div className="text-base font-bold text-[#1C1C1C]">{TEAM_META[team].name}</div>
        <div className="text-sm text-[#1C1C1C]/50 mt-0.5">
          {state.status === 'loading' ? 'Loading…' : 'No games scheduled'}
        </div>
      </div>
    )
  } else if (state.status === 'upcoming') {
    const { isHome, oppAbbrev, oppDisplayName, oppLogo } = state
    const units = timeLeft
      ? timeLeft.days > 0
        ? [{ value: timeLeft.days, label: 'd' }, { value: timeLeft.hours, label: 'h' }, { value: timeLeft.minutes, label: 'm' }]
        : [{ value: timeLeft.hours, label: 'h' }, { value: timeLeft.minutes, label: 'm' }, { value: timeLeft.seconds, label: 's' }]
      : null

    body = (
      <div className="px-4 pt-3 pb-4">
        <div className="text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-wider mb-2">Next Game</div>
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
    )
  } else {
    const gameData = state
    const isLive = gameData.status === 'live'
    body = (
      <div>
        <TeamRow logo={gameData.teamLogo} abbrev={gameData.teamAbbrev} score={gameData.teamScore} color={gameData.teamColor} />
        <div className="flex items-center gap-2 px-4">
          <div className="h-px flex-1 bg-black/10" />
          <div className="flex items-center gap-1.5">
            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
            <span className="text-[10px] font-bold text-[#1C1C1C]/40 uppercase tracking-wider">{gameData.detail}</span>
          </div>
          <div className="h-px flex-1 bg-black/10" />
        </div>
        <TeamRow logo={gameData.oppLogo} abbrev={gameData.oppAbbrev} score={gameData.oppScore} color={gameData.oppColor} />
      </div>
    )
  }

  return (
    <div className="bg-white shadow-lg overflow-hidden w-[200px]" style={{ borderRadius: '5px' }}>
      {tabs}
      <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.18s ease' }}>
        {body}
      </div>
    </div>
  )
}
