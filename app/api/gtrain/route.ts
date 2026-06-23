import { NextResponse } from 'next/server'
import { transit_realtime } from 'gtfs-realtime-bindings'

const ALERTS_URL =
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/camsys%2Fsubway-alerts'

// MTA refreshes every ~30s, no point hitting more often
export const revalidate = 30

export async function GET() {
  try {
    const res = await fetch(ALERTS_URL, { next: { revalidate: 30 } })
    if (!res.ok) throw new Error(`MTA returned ${res.status}`)

    const buffer = await res.arrayBuffer()
    const feed = transit_realtime.FeedMessage.decode(new Uint8Array(buffer))

    const gAlerts = feed.entity.filter((e) =>
      e.alert?.informedEntity?.some((ie) => ie.routeId === 'G')
    )

    // GTFS effect enum → our status. 1=NO_SERVICE, 2=REDUCED_SERVICE,
    // 3=SIGNIFICANT_DELAYS, 4=DETOUR, 6=MODIFIED_SERVICE (planned work).
    // When several alerts are active, the most severe one wins.
    type Status = 'running' | 'planned' | 'reduced' | 'delays' | 'suspended'
    const RANK: Record<Status, number> = { running: 0, planned: 1, reduced: 2, delays: 3, suspended: 4 }
    const effectStatus = (effect?: number | null): Status | null => {
      switch (effect) {
        case 1: return 'suspended'
        case 2: return 'reduced'
        case 3: return 'delays'
        case 4:
        case 6: return 'planned'
        default: return null
      }
    }

    let status: Status = 'running'
    const alerts: string[] = []

    for (const entity of gAlerts) {
      const s = effectStatus(entity.alert?.effect)
      if (s && RANK[s] > RANK[status]) status = s

      const text = entity.alert?.headerText?.translation?.[0]?.text
      if (text) alerts.push(text)
    }

    return NextResponse.json({ status, alerts: alerts.slice(0, 2) })
  } catch {
    return NextResponse.json(
      { status: 'unknown', alerts: [] },
      { status: 500 }
    )
  }
}
