'use client'

import { useEffect, useRef, useState } from 'react'
import Sticker from './Sticker'
import GTrainSticker from './stickers/GTrainSticker'
import BoomboxSticker from './stickers/BoomboxSticker'
import KnicksSticker from './stickers/KnicksSticker'
import WeatherSticker from './stickers/WeatherSticker'

interface EasterEggLayerProps {
  active: boolean
  onDismiss: () => void
}

const stickers = [
  {
    id: 'weather',
    w: 200, h: 110,
    rotation: -4,
    delay: 0,
    content: <WeatherSticker />,
  },
  {
    id: 'gtrain',
    w: 145, h: 237,
    rotation: 5,
    delay: 0.07,
    content: <GTrainSticker />,
  },
  {
    id: 'boombox',
    w: 200, h: 140,
    rotation: -6,
    delay: 0.14,
    content: <BoomboxSticker />,
  },
  {
    id: 'knicks',
    w: 200, h: 140,
    rotation: 4,
    delay: 0.21,
    content: <KnicksSticker />,
  },
  {
    id: 'yankees',
    w: 200, h: 130,
    rotation: -3,
    delay: 0.28,
    content: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        <img src="/New_York_Yankees_logo.svg" alt="New York Yankees" draggable={false} className="w-28 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]" />
      </div>
    ),
  },
  {
    id: 'nyc-love',
    w: 200, h: 155,
    rotation: 3,
    delay: 0.35,
    content: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        <img src="/NYC_Love.svg" alt="NYC Love" draggable={false} className="w-36 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]" />
      </div>
    ),
  },
]

const GAP = 20

function overlaps(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number }
): boolean {
  return (
    a.x < b.x + b.w + GAP &&
    a.x + a.w + GAP > b.x &&
    a.y < b.y + b.h + GAP &&
    a.y + a.h + GAP > b.y
  )
}

const MOBILE_BREAKPOINT = 768

function generatePositions(viewW: number, viewH: number): { x: number; y: number }[] {
  const isMobile = viewW < MOBILE_BREAKPOINT
  const placed: { x: number; y: number; w: number; h: number }[] = []

  return stickers.map((s) => {
    let pos = {
      x: Math.random() * Math.max(viewW - s.w, 0),
      y: Math.random() * Math.max(viewH - s.h, 0),
    }

    if (!isMobile) {
      for (let attempt = 0; attempt < 50; attempt++) {
        pos = {
          x: Math.random() * Math.max(viewW - s.w, 0),
          y: Math.random() * Math.max(viewH - s.h, 0),
        }
        if (!placed.some((p) => overlaps({ ...pos, w: s.w, h: s.h }, p))) break
      }
    }

    placed.push({ ...pos, w: s.w, h: s.h })
    return pos
  })
}

export default function EasterEggLayer({ active, onDismiss }: EasterEggLayerProps) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([])
  const [isDismissing, setIsDismissing] = useState(false)

  useEffect(() => {
    if (active) {
      setIsDismissing(false)
      setPositions(generatePositions(window.innerWidth, window.innerHeight))
    }
  }, [active])

  const handleDismiss = () => {
    setIsDismissing(true)
    const maxDelay = Math.max(...stickers.map((s) => s.delay)) * 0.4
    setTimeout(onDismiss, (maxDelay + 0.4) * 1000)
  }

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
          isDismissing={isDismissing}
        >
          <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            {s.content}
          </div>
        </Sticker>
      ))}

      <button
        onClick={handleDismiss}
        className="pointer-events-auto fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#1C1C1C] text-white text-sm rounded-full shadow-lg hover:bg-[#333] transition-colors"
      >
        Get outta here!
      </button>
    </div>
  )
}
