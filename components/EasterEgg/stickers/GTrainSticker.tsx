'use client'

import { useEffect, useState } from 'react'

type Status = 'running' | 'delayed' | 'suspended' | 'loading' | 'unknown'

interface GTrainData {
  status: Status
  alerts: string[]
}

const STATUS = {
  running:   { label: 'Running normally', dot: '#4ade80' },
  delayed:   { label: 'Delays reported',  dot: '#facc15' },
  suspended: { label: 'No service',       dot: '#f87171' },
  loading:   { label: 'Checking...',      dot: '#ffffff60' },
  unknown:   { label: 'Status unknown',   dot: '#ffffff60' },
}

export default function GTrainSticker() {
  const [data, setData] = useState<GTrainData>({ status: 'loading', alerts: [] })

  useEffect(() => {
    fetch('/api/gtrain')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData({ status: 'unknown', alerts: [] }))
  }, [])

  const { label, dot } = STATUS[data.status]

  return (
    <div className="bg-[#6CBE45] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
      <div className="text-3xl mb-2">🚇</div>
      <div className="text-base font-bold text-white">G Train</div>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dot }} />
        <span className="text-sm text-white/90">{label}</span>
      </div>
      {data.alerts.length > 0 && (
        <div className="mt-2 pt-2 border-t border-white/25 text-xs text-white/80 leading-snug line-clamp-4">
          {data.alerts[0]}
        </div>
      )}
    </div>
  )
}
