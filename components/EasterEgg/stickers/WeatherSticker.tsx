'use client'

import { useEffect, useState } from 'react'
import type { WeatherData } from '@/app/api/weather/route'

type State = WeatherData | { status: 'loading' } | { status: 'unknown' }

export default function WeatherSticker() {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => r.json())
      .then(setState)
      .catch(() => setState({ status: 'unknown' }))
  }, [])

  const loaded = 'tempC' in state

  return (
    <div className="bg-[#E8F4FD] border border-[#B3D9F5] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
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
