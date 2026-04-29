'use client'

import { useEffect, useRef, useState } from 'react'
import Sticker from './Sticker'
import GTrainSticker from './stickers/GTrainSticker'

interface EasterEggLayerProps {
  active: boolean
  onDismiss: () => void
}

const glass = 'bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg px-5 py-4 w-[200px]'

const stickers = [
  {
    id: 'weather',
    rotation: -4,
    delay: 0,
    content: (
      <div className={glass}>
        <div className="text-3xl mb-1">🌤</div>
        <div className="text-base font-bold text-[#1C1C1C]">72°F · Sunny</div>
        <div className="text-sm text-[#555] mt-0.5">Brooklyn, NY</div>
      </div>
    ),
  },
  {
    id: 'gtrain',
    rotation: 5,
    delay: 0.07,
    content: <GTrainSticker />,
  },
  {
    id: 'boombox',
    rotation: -6,
    delay: 0.14,
    content: (
      <div className={glass}>
        <div className="text-3xl mb-1">🎵</div>
        <div className="text-base font-bold text-[#1C1C1C]">Boombox</div>
        <div className="text-sm text-[#555] mt-0.5">Now playing...</div>
      </div>
    ),
  },
  {
    id: 'knicks',
    rotation: 4,
    delay: 0.21,
    content: (
      <div className={glass}>
        <div className="text-3xl mb-1">🏀</div>
        <div className="text-base font-bold text-[#1C1C1C]">Knicks</div>
        <div className="text-sm text-[#555] mt-0.5">112 – 98 · Final</div>
      </div>
    ),
  },
  {
    id: 'yankees',
    rotation: -3,
    delay: 0.28,
    content: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        <img src="/New_York_Yankees_logo.svg" alt="New York Yankees" className="w-28 h-auto [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.2))]" />
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

