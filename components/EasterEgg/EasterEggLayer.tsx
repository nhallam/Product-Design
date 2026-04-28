'use client'

import { useEffect, useRef, useState } from 'react'
import Sticker from './Sticker'

interface EasterEggLayerProps {
  active: boolean
  onDismiss: () => void
}

const stickers = [
  {
    id: 'weather',
    rotation: -4,
    delay: 0,
    content: (
      <div className="bg-[#E8F4FD] border border-[#B3D9F5] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
        <div className="text-3xl mb-1">🌤</div>
        <div className="text-base font-bold text-[#1C1C1C]">72°F · Sunny</div>
        <div className="text-sm text-[#666] mt-0.5">Brooklyn, NY</div>
      </div>
    ),
  },
  {
    id: 'gtrain',
    rotation: 5,
    delay: 0.07,
    content: (
      <div className="bg-[#6CBE45] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
        <div className="text-3xl mb-1">🚇</div>
        <div className="text-base font-bold text-white">G Train</div>
        <div className="text-sm text-white/80 mt-0.5">Running on time</div>
      </div>
    ),
  },
  {
    id: 'boombox',
    rotation: -6,
    delay: 0.14,
    content: (
      <div className="bg-[#1C1C1C] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
        <div className="text-3xl mb-1">🎵</div>
        <div className="text-base font-bold text-white">Boombox</div>
        <div className="text-sm text-white/60 mt-0.5">Now playing...</div>
      </div>
    ),
  },
  {
    id: 'knicks',
    rotation: 4,
    delay: 0.21,
    content: (
      <div className="bg-[#F58426] rounded-2xl shadow-lg px-5 py-4 w-[200px]">
        <div className="text-3xl mb-1">🏀</div>
        <div className="text-base font-bold text-white">Knicks</div>
        <div className="text-sm text-white/80 mt-0.5">112 – 98 · Final</div>
      </div>
    ),
  },
]

const STICKER_W = 220
const STICKER_H = 130

export default function EasterEggLayer({ active, onDismiss }: EasterEggLayerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    if (active) {
      const w = window.innerWidth
      const h = window.innerHeight
      setPositions(
        stickers.map(() => ({
          x: Math.random() * Math.max(w - STICKER_W, 0),
          y: Math.random() * Math.max(h - STICKER_H, 0),
        }))
      )
    }
  }, [active])

  if (!active || positions.length === 0) return null

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {stickers.map((s, i) => (
        <Sticker
          key={s.id}
          initialX={positions[i].x}
          initialY={positions[i].y}
          rotation={s.rotation}
          delay={s.delay}
        >
          <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            {s.content}
          </div>
        </Sticker>
      ))}

      <button
        onClick={onDismiss}
        className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#1C1C1C] text-white text-sm rounded-full shadow-lg hover:bg-[#333] transition-colors"
      >
        Get outta here!
      </button>
    </div>
  )
}

