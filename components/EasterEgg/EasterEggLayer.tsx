'use client'

import { useEffect, useRef, useState, cloneElement, isValidElement, ReactElement } from 'react'
import { PanInfo } from 'framer-motion'

export const easterEggDismissRef: { current: (() => void) | null } = { current: null }
export const easterEggActivateRef: { current: (() => void) | null } = { current: null }
export const easterEggClearGhostsRef: { current: (() => void) | null } = { current: null }

// Lightweight reactive primitive so Menu can subscribe to ghost state
let _hasGhosts = false
const _ghostListeners = new Set<(v: boolean) => void>()
function notifyGhostListeners(v: boolean) {
  _hasGhosts = v
  _ghostListeners.forEach((fn) => fn(v))
}
export function useHasGhosts() {
  const [hasGhosts, setHasGhosts] = useState(_hasGhosts)
  useEffect(() => {
    _ghostListeners.add(setHasGhosts)
    return () => { _ghostListeners.delete(setHasGhosts) }
  }, [])
  return hasGhosts
}

import Sticker from './Sticker'
import GTrainSticker from './stickers/GTrainSticker'
import BoomboxSticker from './stickers/BoomboxSticker'
import KnicksSticker from './stickers/KnicksSticker'
import WeatherSticker from './stickers/WeatherSticker'
import PizzaSticker from './stickers/PizzaSticker'

const stickers = [
  { id: 'weather', w: 200, h: 110, rotation: -4, delay: 0, content: <WeatherSticker /> },
  { id: 'gtrain', w: 145, h: 200, rotation: 5, delay: 0.07, content: <GTrainSticker /> },
  { id: 'boombox', w: 200, h: 140, rotation: -6, delay: 0.14, content: <BoomboxSticker /> },
  { id: 'knicks', w: 200, h: 140, rotation: 4, delay: 0.21, content: <KnicksSticker /> },
  {
    id: 'yankees', w: 200, h: 130, rotation: -3, delay: 0.28,
    content: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/New_York_Yankees_logo.svg" alt="New York Yankees" draggable={false} className="w-28 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]" />
      </div>
    ),
  },
  {
    id: 'nyc-love', w: 200, h: 155, rotation: 3, delay: 0.35,
    content: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/NYC_Love.svg" alt="NYC Love" draggable={false} className="w-36 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]" />
      </div>
    ),
  },
  { id: 'pizza', w: 160, h: 160, rotation: 8, delay: 0.42, content: <PizzaSticker /> },
  {
    id: 'anti', w: 160, h: 156, rotation: -5, delay: 0.49,
    content: (
      <div className="p-2 w-[160px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/anti.svg" alt="Anti" draggable={false} className="w-full h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]" />
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

function withGhostProp(content: ReactElement | React.ReactNode): React.ReactNode {
  if (isValidElement(content)) {
    return cloneElement(content as ReactElement<{ ghost?: boolean }>, { ghost: true })
  }
  return content
}

export default function EasterEggLayer() {
  const [active, setActive] = useState(false)
  const [layerState, setLayerState] = useState<{
    positions: { x: number; y: number }[]
    isDismissing: boolean
  }>({ positions: [], isDismissing: false })
  const [ghostPositions, setGhostPositions] = useState<{ x: number; y: number }[] | null>(null)
  const [ghostFading, setGhostFading] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set())
  const binRef = useRef<HTMLDivElement>(null)

  const activate = () => {
    setGhostPositions(null)
    setGhostFading(false)
    notifyGhostListeners(false)
    setDeletedIds(new Set())
    setLayerState({
      positions: generatePositions(window.innerWidth, window.innerHeight),
      isDismissing: false,
    })
    setActive(true)
  }

  const handleDismiss = () => {
    setGhostPositions([...layerState.positions])
    notifyGhostListeners(true)
    setLayerState((s) => ({ ...s, isDismissing: true }))
    const maxDelay = Math.max(...stickers.map((s) => s.delay)) * 0.4
    setTimeout(() => setActive(false), (maxDelay + 0.4) * 1000)
  }

  const clearGhosts = () => {
    setGhostFading(true)
    setTimeout(() => {
      setGhostPositions(null)
      setGhostFading(false)
      notifyGhostListeners(false)
    }, 600)
  }

  useEffect(() => {
    easterEggDismissRef.current = active ? handleDismiss : null
    easterEggActivateRef.current = !active ? activate : null
    easterEggClearGhostsRef.current = ghostPositions ? clearGhosts : null
  })

  useEffect(() => () => {
    easterEggDismissRef.current = null
    easterEggActivateRef.current = null
    easterEggClearGhostsRef.current = null
  }, [])

  return (
    <>
      {ghostPositions && (
        <div
          className="fixed inset-0 z-[0] pointer-events-none"
          style={{
            opacity: ghostFading ? 0 : 1,
            transition: ghostFading ? 'opacity 0.6s ease-out' : 'none',
          }}
        >
          {stickers.map((s, i) => (
            <div
              key={s.id}
              className="absolute"
              style={{
                left: ghostPositions[i].x,
                top: ghostPositions[i].y,
                width: s.w,
                transform: `rotate(${s.rotation}deg)`,
                transformOrigin: 'top left',
                opacity: 0.12,
                filter: 'grayscale(1)',
              }}
            >
              {withGhostProp(s.content)}
            </div>
          ))}
        </div>
      )}

      {active && layerState.positions.length > 0 && (
        <div className="fixed inset-0 z-[200] pointer-events-auto" onClick={handleDismiss}>
          {stickers
            .map((s, i) => ({ ...s, position: layerState.positions[i] }))
            .filter((s) => !deletedIds.has(s.id))
            .map((s) => (
              <Sticker
                key={s.id}
                initialX={s.position.x}
                initialY={s.position.y}
                rotation={s.rotation}
                delay={s.delay}
                isDismissing={layerState.isDismissing}
                onDragStart={() => setDraggingId(s.id)}
                onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                  setDraggingId(null)
                  if (binRef.current) {
                    const bin = binRef.current.getBoundingClientRect()
                    if (
                      info.point.x >= bin.left && info.point.x <= bin.right &&
                      info.point.y >= bin.top && info.point.y <= bin.bottom
                    ) {
                      setDeletedIds((prev) => new Set([...prev, s.id]))
                    }
                  }
                }}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  {s.content}
                </div>
              </Sticker>
            ))}

          <div
            ref={binRef}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#1C1C1C] flex items-center justify-center text-2xl pointer-events-none transition-all duration-200 ${
              draggingId && !layerState.isDismissing ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            🗑
          </div>
        </div>
      )}
    </>
  )
}
