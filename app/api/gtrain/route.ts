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

    // GTFS effect enum: 1=NO_SERVICE, 2=REDUCED_SERVICE, 3=SIGNIFICANT_DELAYS
    let status: 'running' | 'delayed' | 'suspended' = 'running'
    const alerts: string[] = []

    for (const entity of gAlerts) {
      const effect = entity.alert?.effect
      if (effect === 1) {
        status = 'suspended'
      } else if (effect === 3 && status !== 'suspended') {
        status = 'delayed'
      } else if (effect === 2 && status === 'running') {
        status = 'delayed'
      }

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
