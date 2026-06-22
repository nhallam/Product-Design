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
  shortDetail?: string
  detail?: string
}

interface ESPNStatus {
  type?: ESPNStatusType
  period?: number
  displayClock?: string
}

interface ESPNEvent {
  date?: string
  competitions?: Array<{
    competitors?: ESPNCompetitor[]
    status?: ESPNStatus
  }>
  status?: ESPNStatus
}

export type TeamKey = 'knicks' | 'liberty' | 'mets' | 'yankees'

export const TEAMS: Record<TeamKey, { id: string; sport: string; league: string; name: string; color: string }> = {
  knicks:  { id: '18', sport: 'basketball', league: 'nba',  name: 'Knicks',  color: 'F58426' },
  liberty: { id: '9',  sport: 'basketball', league: 'wnba', name: 'Liberty', color: '86CEBC' },
  mets:    { id: '21', sport: 'baseball',   league: 'mlb',  name: 'Mets',    color: '002D72' },
  yankees: { id: '10', sport: 'baseball',   league: 'mlb',  name: 'Yankees', color: '003087' },
}

export const revalidate = 30

export type ScoreData =
  | {
      status: 'live' | 'final'
      teamScore: number
      teamAbbrev: string
      teamLogo: string
      teamColor: string
      oppScore: number
      oppAbbrev: string
      oppLogo: string
      oppColor: string
      detail: string
    }
  | {
      status: 'upcoming'
      gameTime: string
      isHome: boolean
      oppAbbrev: string
      oppDisplayName: string
      oppLogo: string
      oppColor: string
      teamLogo: string
    }
  | { status: 'unknown' }

function makeLogo(league: string, team: ESPNTeam | undefined): string {
  if (team?.logo) return team.logo
  if (team?.id) return `https://a.espncdn.com/i/teamlogos/${league}/500/${team.id}.png`
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

function isTeamGame(event: ESPNEvent, teamId: string): boolean {
  return event.competitions?.[0]?.competitors?.some((c) => c.team?.id === teamId) ?? false
}

function parseGame(event: ESPNEvent, teamId: string, league: string, fallbackColor: string): ScoreData {
  const comp = event.competitions?.[0] ?? {}
  const competitors: ESPNCompetitor[] = comp.competitors ?? []
  const status = event.status ?? comp.status ?? {}
  const statusType = status.type ?? {}

  const team = competitors.find((c) => c.team?.id === teamId)
  const opp = competitors.find((c) => c.team?.id !== teamId)

  const isLive = statusType.state === 'in' || statusType.name === 'STATUS_IN_PROGRESS'
  const isFinal = statusType.completed === true || statusType.state === 'post' || statusType.name === 'STATUS_FINAL'

  return {
    status: isLive ? 'live' : isFinal ? 'final' : 'unknown',
    teamScore: parseScore(team?.score),
    teamAbbrev: team?.team?.abbreviation ?? '???',
    teamLogo: makeLogo(league, team?.team),
    teamColor: team?.team?.alternateColor ?? team?.team?.color ?? fallbackColor,
    oppScore: parseScore(opp?.score),
    oppAbbrev: opp?.team?.abbreviation ?? '???',
    oppLogo: makeLogo(league, opp?.team),
    oppColor: opp?.team?.color ?? opp?.team?.alternateColor ?? '888888',
    detail: statusType.shortDetail ?? statusType.detail ?? (isFinal ? 'Final' : ''),
  } as ScoreData
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = (searchParams.get('team') ?? 'knicks') as TeamKey
  const cfg = TEAMS[key] ?? TEAMS.knicks
  const base = `https://site.api.espn.com/apis/site/v2/sports/${cfg.sport}/${cfg.league}`

  try {
    const sbRes = await fetch(`${base}/scoreboard`, { next: { revalidate: 30 } })
    const sb = await sbRes.json()
    const liveGame = (sb.events ?? []).find((e: ESPNEvent) => isTeamGame(e, cfg.id))

    if (liveGame) {
      const parsed = parseGame(liveGame, cfg.id, cfg.league, cfg.color)
      if (parsed.status === 'live' || parsed.status === 'final') {
        return Response.json(parsed)
      }
    }

    const findUpcoming = (events: ESPNEvent[]) => events.find((e: ESPNEvent) => {
      const s = e.status ?? e.competitions?.[0]?.status ?? {}
      const t = s.type ?? {}
      return t.state === 'pre' || t.name === 'STATUS_SCHEDULED'
    })

    const schRes = await fetch(`${base}/teams/${cfg.id}/schedule`, { next: { revalidate: 300 } })
    const sch = await schRes.json()
    let upcoming = findUpcoming(sch.events ?? [])

    if (!upcoming && cfg.league === 'nba') {
      const playoffRes = await fetch(`${base}/teams/${cfg.id}/schedule?seasontype=3`, { next: { revalidate: 300 } })
      const playoff = await playoffRes.json()
      upcoming = findUpcoming(playoff.events ?? [])
    }

    if (upcoming) {
      const comp = upcoming.competitions?.[0] ?? {}
      const competitors: ESPNCompetitor[] = comp.competitors ?? []
      const opp = competitors.find((c: ESPNCompetitor) => c.team?.id !== cfg.id)
      const teamComp = competitors.find((c: ESPNCompetitor) => c.team?.id === cfg.id)

      return Response.json({
        status: 'upcoming',
        gameTime: upcoming.date ?? '',
        isHome: teamComp?.homeAway === 'home',
        oppAbbrev: opp?.team?.abbreviation ?? '???',
        oppDisplayName: opp?.team?.displayName ?? opp?.team?.abbreviation ?? '???',
        oppLogo: makeLogo(cfg.league, opp?.team),
        oppColor: opp?.team?.color ?? '888888',
        teamLogo: makeLogo(cfg.league, teamComp?.team),
      } satisfies ScoreData)
    }

    return Response.json({ status: 'unknown' } satisfies ScoreData)
  } catch {
    return Response.json({ status: 'unknown' } satisfies ScoreData)
  }
}
