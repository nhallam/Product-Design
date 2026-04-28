'use client'

import { useRef } from 'react'
import Sticker from './Sticker'

interface EasterEggLayerProps {
  active: boolean
  onDismiss: () => void
}

const stickers = [
  {
    id: 'weather',
    initialX: 24,
    initialY: 100,
    rotation: -4,
    delay: 0,
    content: (
      <div className="bg-[#E8F4FD] border border-[#B3D9F5] rounded-2xl shadow-lg px-4 py-3 w-[160px]">
        <div className="text-2xl mb-1">🌤</div>
        <div className="text-sm font-bold text-[#1C1C1C]">72°F · Sunny</div>
        <div className="text-xs text-[#666] mt-0.5">Brooklyn, NY</div>
      </div>
    ),
  },
  {
    id: 'gtrain',
    initialX: 220,
    initialY: 60,
    rotation: 5,
    delay: 0.07,
    content: (
      <div className="bg-[#6CBE45] rounded-2xl shadow-lg px-4 py-3 w-[160px]">
        <div className="text-2xl mb-1">🚇</div>
        <div className="text-sm font-bold text-white">G Train</div>
        <div className="text-xs text-white/80 mt-0.5">Running on time</div>
      </div>
    ),
  },
  {
    id: 'boombox',
    initialX: 16,
    initialY: 360,
    rotation: -6,
    delay: 0.14,
    content: (
      <div className="bg-[#1C1C1C] rounded-2xl shadow-lg px-4 py-3 w-[160px]">
        <div className="text-2xl mb-1">🎵</div>
        <div className="text-sm font-bold text-white">Boombox</div>
        <div className="text-xs text-white/60 mt-0.5">Now playing...</div>
      </div>
    ),
  },
  {
    id: 'knicks',
    initialX: 210,
    initialY: 340,
    rotation: 4,
    delay: 0.21,
    content: (
      <div className="bg-[#F58426] rounded-2xl shadow-lg px-4 py-3 w-[160px]">
        <div className="text-2xl mb-1">🏀</div>
        <div className="text-sm font-bold text-white">Knicks</div>
        <div className="text-xs text-white/80 mt-0.5">112 – 98 · Final</div>
      </div>
    ),
  },
]

export default function EasterEggLayer({ active, onDismiss }: EasterEggLayerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)

  if (!active) return null

  return (
    <div
      ref={constraintsRef}
      className="fixed inset-0 z-[200]"
      onClick={onDismiss}
    >
      {stickers.map((s) => (
        <Sticker
          key={s.id}
          initialX={s.initialX}
          initialY={s.initialY}
          rotation={s.rotation}
          delay={s.delay}
        >
          <div onClick={(e) => e.stopPropagation()}>
            {s.content}
          </div>
        </Sticker>
      ))}

      <button
        onClick={onDismiss}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#1C1C1C] text-white text-sm rounded-full shadow-lg hover:bg-[#333] transition-colors"
      >
        Clear
      </button>
    </div>
  )
}
