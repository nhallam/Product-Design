'use client'

import { useEffect, useState } from 'react'
import type { WeatherData } from '@/app/api/weather/route'

type State = WeatherData | { status: 'loading' } | { status: 'unknown' }

// Soft gradient + border tuned to the current conditions
function weatherTheme(label: string): { background: string; borderColor: string } {
  const l = label.toLowerCase()
  if (l.includes('thunder')) return { background: 'linear-gradient(160deg, #E6E3F0 0%, #C9C3DE 100%)', borderColor: '#B6AFD0' }
  if (l.includes('snow')) return { background: 'linear-gradient(160deg, #F5FAFF 0%, #DCEBF7 100%)', borderColor: '#C7DEEF' }
  if (l.includes('rain') || l.includes('drizzle') || l.includes('shower')) return { background: 'linear-gradient(160deg, #DDE7EF 0%, #B9C9D6 100%)', borderColor: '#A9BDCC' }
  if (l.includes('fog')) return { background: 'linear-gradient(160deg, #ECEEF0 0%, #D5D9DD 100%)', borderColor: '#C5CACE' }
  if (l.includes('overcast') || l.includes('cloud')) return { background: 'linear-gradient(160deg, #EAF0F5 0%, #CFDBE6 100%)', borderColor: '#BFCFDC' }
  // Sunny / clear
  return { background: 'linear-gradient(160deg, #FFF6DB 0%, #CDE8FB 100%)', borderColor: '#BFE0F5' }
}

export default function WeatherSticker() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ status: 'unknown' }))
  }, [])

  const loaded = 'tempC' in state
  const theme = weatherTheme(loaded ? (state as WeatherData).label : '')

  return (
    <div
      className="shadow-lg px-5 py-4 w-[150px] text-center border"
      style={{ borderRadius: '5px', background: theme.background, borderColor: theme.borderColor }}
    >
      <div className="text-3xl mb-1">{loaded ? (state as WeatherData).emoji : '🌤'}</div>
      <div className="text-base font-bold text-[#1C1C1C]">
        {loaded
          ? `${(state as WeatherData).tempF}°F / ${(state as WeatherData).tempC}°C`
          : state.status === 'loading' ? 'Loading...' : 'Unavailable'
        }
      </div>
      <div className="text-sm text-[#666] mt-0.5">
        {loaded ? (state as WeatherData).label : 'Brooklyn, NY'}
      </div>
      {loaded && <div className="text-sm text-[#666]">Brooklyn, NY</div>}
    </div>
  )
}
