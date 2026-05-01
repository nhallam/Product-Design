interface ESPNTeam {
  id?: string
  abbreviation?: string
  displayName?: string
  logo?: string
  color?: string
  alternateColor?: string
}

interface ESPNScore {
  value?: number
  displayValue?: string
}

interface ESPNCompetitor {
  team?: ESPNTeam
  score?: number | string | ESPNScore
  homeAway?: string
}

interface ESPNStatusType {
  state?: string
  name?: string
  completed?: boolean
}

interface ESPNStatus {
  type?: ESPNStatusType
  period?: number
  displayClock?: string
  clock?: string
}

interface ESPNEvent {
  date?: string
  competitions?: Array<{
    competitors?: ESPNCompetitor[]
    status?: ESPNStatus
  }>
  status?: ESPNStatus
}

const KNICKS_ID = '18'
const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
const SCHEDULE = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${KNICKS_ID}/schedule`
const SCHEDULE_PLAYOFFS = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${KNICKS_ID}/schedule?seasontype=3`

export const revalidate = 30

export type KnicksData =
  | {
      status: 'live' | 'final'
      knicksScore: number
      knicksAbbrev: string
      knicksLogo: string
      knicksColor: string
      oppScore: number
      oppAbbrev: string
      oppLogo: string
      oppColor: string
      period: number
      clock: string
      isOT: boolean
    }
  | {
      status: 'upcoming'
      gameTime: string
      isHome: boolean
      oppAbbrev: string
      oppDisplayName: string
      oppLogo: string
      oppColor: string
      knicksLogo: string
    }
  | { status: 'unknown' }

function isKnicksGame(event: ESPNEvent): boolean {
  return event.competitions?.[0]?.competitors?.some(
    (c) => c.team?.id === KNICKS_ID
  ) ?? false
}

function makeLogo(team: ESPNTeam | undefined): string {
  if (team?.logo) return team.logo
  if (team?.id) return `https://a.espncdn.com/i/teamlogos/nba/500/${team.id}.png`
  return ''
}

function parseScore(raw: ESPNCompetitor['score']): number {
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return parseInt(raw, 10) || 0
  if (raw && typeof raw === 'object') {
    if (raw.value !== undefined) return Number(raw.value) || 0
    if (raw.displayValue !== undefined) return parseInt(raw.displayValue, 10) || 0
  }
  return 0
}

function parseGame(event: ESPNEvent): KnicksData {
  const comp = event.competitions?.[0] ?? {}
  const competitors: ESPNCompetitor[] = comp.competitors ?? []
  const status = event.status ?? comp.status ?? {}
  const statusType = status.type ?? {}

  const knicks = competitors.find((c) => c.team?.id === KNICKS_ID)
  const opp = competitors.find((c) => c.team?.id !== KNICKS_ID)

  const isLive = statusType.state === 'in' || statusType.name === 'STATUS_IN_PROGRESS'
  const isFinal = statusType.completed === true || statusType.state === 'post' || statusType.name === 'STATUS_FINAL'

  const period: number = status.period ?? 0

  return {
    status: isLive ? 'live' : isFinal ? 'final' : 'unknown',
    knicksScore: parseScore(knicks?.score),
    knicksAbbrev: knicks?.team?.abbreviation ?? 'NYK',
    knicksLogo: makeLogo(knicks?.team),
    knicksColor: knicks?.team?.alternateColor ?? knicks?.team?.color ?? 'F58426',
    oppScore: parseScore(opp?.score),
    oppAbbrev: opp?.team?.abbreviation ?? '???',
    oppLogo: makeLogo(opp?.team),
    oppColor: opp?.team?.color ?? opp?.team?.alternateColor ?? '888888',
    period,
    clock: status.displayClock ?? status.clock ?? '',
    isOT: period > 4,
  } as KnicksData
}

export async function GET() {
  try {
    const sbRes = await fetch(SCOREBOARD, { next: { revalidate: 30 } })
    const sb = await sbRes.json()
    const liveGame = (sb.events ?? []).find(isKnicksGame)

    if (liveGame) {
      const parsed = parseGame(liveGame)
      if (parsed.status === 'live' || parsed.status === 'final') {
        return Response.json(parsed)
      }
    }

    const findUpcoming = (events: ESPNEvent[]) => events.find((e: ESPNEvent) => {
      const s = e.status ?? e.competitions?.[0]?.status ?? {}
      const t = s.type ?? {}
      return t.state === 'pre' || t.name === 'STATUS_SCHEDULED'
    })

    const schRes = await fetch(SCHEDULE, { next: { revalidate: 300 } })
    const sch = await schRes.json()
    let upcoming = findUpcoming(sch.events ?? [])

    if (!upcoming) {
      const playoffRes = await fetch(SCHEDULE_PLAYOFFS, { next: { revalidate: 300 } })
      const playoff = await playoffRes.json()
      upcoming = findUpcoming(playoff.events ?? [])
    }

    if (upcoming) {
      const comp = upcoming.competitions?.[0] ?? {}
      const competitors: ESPNCompetitor[] = comp.competitors ?? []
      const opp = competitors.find((c: ESPNCompetitor) => c.team?.id !== KNICKS_ID)
      const knicksComp = competitors.find((c: ESPNCompetitor) => c.team?.id === KNICKS_ID)

      return Response.json({
        status: 'upcoming',
        gameTime: upcoming.date,
        isHome: knicksComp?.homeAway === 'home',
        oppAbbrev: opp?.team?.abbreviation ?? '???',
        oppDisplayName: opp?.team?.displayName ?? opp?.team?.abbreviation ?? '???',
        oppLogo: makeLogo(opp?.team),
        oppColor: opp?.team?.color ?? '888888',
        knicksLogo: makeLogo(knicksComp?.team),
      } satisfies KnicksData)
    }

    return Response.json({ status: 'unknown' } satisfies KnicksData)
  } catch {
    return Response.json({ status: 'unknown' } satisfies KnicksData)
  }
}
