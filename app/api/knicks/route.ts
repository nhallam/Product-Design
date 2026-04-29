const KNICKS_ID = '18'
const SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard'
const SCHEDULE = `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${KNICKS_ID}/schedule`

export const revalidate = 30

export interface KnicksData {
  status: 'live' | 'final' | 'unknown'
  knicksScore: number
  oppScore: number
  oppName: string
  period: number
  clock: string
  isOT: boolean
}

function isKnicksGame(event: any): boolean {
  return event.competitions?.[0]?.competitors?.some(
    (c: any) => c.team?.id === KNICKS_ID
  )
}

function parseScore(raw: any): number {
  if (typeof raw === 'number') return raw
  if (typeof raw === 'string') return parseInt(raw, 10) || 0
  if (raw?.value !== undefined) return Number(raw.value) || 0
  if (raw?.displayValue !== undefined) return parseInt(raw.displayValue, 10) || 0
  return 0
}

function parseGame(event: any): KnicksData {
  const comp = event.competitions[0]
  const competitors: any[] = comp.competitors ?? []
  const status = event.status ?? comp.status ?? {}
  const statusType = status.type ?? {}

  const knicks = competitors.find((c: any) => c.team?.id === KNICKS_ID)
  const opp = competitors.find((c: any) => c.team?.id !== KNICKS_ID)

  const isLive = statusType.state === 'in' || statusType.name === 'STATUS_IN_PROGRESS'
  const isFinal = statusType.completed === true || statusType.state === 'post' || statusType.name === 'STATUS_FINAL'

  const period: number = status.period ?? 0

  return {
    status: isLive ? 'live' : isFinal ? 'final' : 'unknown',
    knicksScore: parseScore(knicks?.score),
    oppScore: parseScore(opp?.score),
    oppName: opp?.team?.shortDisplayName ?? opp?.team?.abbreviation ?? '???',
    period,
    clock: status.displayClock ?? status.clock ?? '',
    isOT: period > 4,
  }
}

export async function GET() {
  try {
    // Check for a live or in-progress game today
    const sbRes = await fetch(SCOREBOARD, { next: { revalidate: 30 } })
    const sb = await sbRes.json()
    const liveGame = (sb.events ?? []).find(isKnicksGame)

    if (liveGame) {
      const parsed = parseGame(liveGame)
      if (parsed.status === 'live' || parsed.status === 'final') {
        return Response.json(parsed)
      }
    }

    // Fall back to most recent completed game from season schedule
    const schRes = await fetch(SCHEDULE, { next: { revalidate: 300 } })
    const sch = await schRes.json()

    const completed = [...(sch.events ?? [])]
      .reverse()
      .find((e: any) => {
        const s = e.status ?? e.competitions?.[0]?.status ?? {}
        const t = s.type ?? {}
        return t.completed === true || t.state === 'post' || t.name === 'STATUS_FINAL'
      })

    if (!completed) return Response.json({ status: 'unknown' })

    return Response.json(parseGame(completed))
  } catch {
    return Response.json({ status: 'unknown' })
  }
}
