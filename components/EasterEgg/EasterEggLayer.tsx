'use client'

import { useEffect, useRef, useState, cloneElement, isValidElement, ReactElement } from 'react'
import { PanInfo } from 'framer-motion'
import { X, Shuffle } from 'react-feather'

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
import ScoreboardSticker from './stickers/ScoreboardSticker'
import WeatherSticker from './stickers/WeatherSticker'
import PizzaSticker from './stickers/PizzaSticker'
import KelloggsSticker from './stickers/KelloggsSticker'
import VideoSticker from './stickers/VideoSticker'
import RecordShopSticker from './stickers/RecordShopSticker'

const stickers = [
  { id: 'weather', w: 150, h: 110, rotation: -4, delay: 0, content: <WeatherSticker /> },
  { id: 'video', w: 220, h: 124, rotation: 4, delay: 0.07, content: <VideoSticker /> },
  { id: 'gtrain', w: 145, h: 200, rotation: 5, delay: 0.14, content: <GTrainSticker /> },
  { id: 'boombox', w: 175, h: 140, rotation: -6, delay: 0.21, content: <BoomboxSticker /> },
  { id: 'scoreboard', w: 200, h: 200, rotation: 4, delay: 0.21, content: <ScoreboardSticker /> },
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
  { id: 'kelloggs', w: 220, h: 80, rotation: -3, delay: 0.49, content: <KelloggsSticker /> },
  { id: 'records', w: 220, h: 185, rotation: -4, delay: 0.56, content: <RecordShopSticker /> },
  {
    id: 'anti', w: 160, h: 156, rotation: 3, delay: 0.63,
    content: (
      <div className="p-2 w-[160px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/anti.svg" alt="Anti" draggable={false} className="w-full h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]" />
      </div>
    ),
  },
]

const VISIBLE = 0.3
const GAP = 24
const EDGES = ['left', 'right', 'top', 'bottom'] as const

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

function edgePosition(edge: typeof EDGES[number], s: { w: number; h: number }, viewW: number, viewH: number) {
  switch (edge) {
    case 'left':
      return { x: -(s.w * (1 - VISIBLE)), y: Math.random() * Math.max(viewH - s.h, 0) }
    case 'right':
      return { x: viewW - s.w * VISIBLE, y: Math.random() * Math.max(viewH - s.h, 0) }
    case 'top':
      return { x: Math.random() * Math.max(viewW - s.w, 0), y: -(s.h * (1 - VISIBLE)) }
    case 'bottom':
      return { x: Math.random() * Math.max(viewW - s.w, 0), y: viewH - s.h * VISIBLE }
  }
}

const MOBILE_BREAKPOINT = 768
const MOBILE_MAX_STICKERS = 5

function generateEdgePositions(viewW: number, viewH: number): { x: number; y: number }[] {
  const placed: { x: number; y: number; w: number; h: number }[] = []
  const pool = viewW < MOBILE_BREAKPOINT ? stickers.slice(0, MOBILE_MAX_STICKERS) : stickers

  return pool.map((s) => {
    let pos = edgePosition(EDGES[Math.floor(Math.random() * EDGES.length)], s, viewW, viewH)
    for (let attempt = 0; attempt < 60; attempt++) {
      const edge = EDGES[Math.floor(Math.random() * EDGES.length)]
      pos = edgePosition(edge, s, viewW, viewH)
      if (!placed.some((p) => overlaps({ ...pos, w: s.w, h: s.h }, p))) break
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
  const [controlsVisible, setControlsVisible] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0)
  const binRef = useRef<HTMLDivElement>(null)
  const livePositionsRef = useRef<Record<string, { x: number; y: number }>>({})
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleControls = (count: number) => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    setControlsVisible(false)
    const maxDelay = Math.max(...stickers.slice(0, count).map((s) => s.delay))
    controlsTimerRef.current = setTimeout(() => setControlsVisible(true), (maxDelay + 0.7) * 1000)
  }

  const activate = () => {
    setGhostPositions(null)
    setGhostFading(false)
    notifyGhostListeners(false)
    setDeletedIds(new Set())
    const positions = generateEdgePositions(window.innerWidth, window.innerHeight)
    positions.forEach((pos, i) => { livePositionsRef.current[stickers[i].id] = pos })
    setLayerState({ positions, isDismissing: false })
    setActive(true)
    scheduleControls(positions.length)
  }

  const handleShuffle = () => {
    const positions = generateEdgePositions(window.innerWidth, window.innerHeight)
    positions.forEach((pos, i) => { livePositionsRef.current[stickers[i].id] = pos })
    setLayerState({ positions, isDismissing: false })
    setDeletedIds(new Set())
    setShuffleKey((k) => k + 1)
  }

  const handleDismiss = () => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    setControlsVisible(false)
    const activeStickers = stickers.slice(0, layerState.positions.length)
    const ghostPos = activeStickers.map((s) => livePositionsRef.current[s.id] ?? { x: 0, y: 0 })
    setGhostPositions(ghostPos)
    notifyGhostListeners(true)
    setLayerState((s) => ({ ...s, isDismissing: true }))
    const maxDelay = Math.max(...activeStickers.map((s) => s.delay)) * 0.4
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
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    easterEggDismissRef.current = null
    easterEggActivateRef.current = null
    easterEggClearGhostsRef.current = null
  }, [])

  // Auto-activate after a short delay once the page has settled
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { const t = setTimeout(activate, 1500); return () => clearTimeout(t) }, [])

  // Click anywhere that isn't a sticker (or the Clear button) dismisses them
  useEffect(() => {
    if (!active || layerState.isDismissing) return
    const onClick = (e: MouseEvent) => {
      // Use composedPath (snapshot at click time) so it still works even if the
      // clicked node was removed mid-click — e.g. a button swapping its icon.
      const path = e.composedPath()
      for (const el of path) {
        if (el instanceof Element && (el.hasAttribute('data-sticker') || el.hasAttribute('data-egg-control'))) return
      }
      handleDismiss()
    }
    // Defer so the same click that activated doesn't immediately dismiss
    const id = setTimeout(() => document.addEventListener('click', onClick), 0)
    return () => { clearTimeout(id); document.removeEventListener('click', onClick) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, layerState.isDismissing])

  return (
    <>
      {ghostPositions && (
        <div
          className="fixed inset-0 z-[-1] pointer-events-none"
          style={{
            opacity: ghostFading ? 0 : 1,
            transition: ghostFading ? 'opacity 0.6s ease-out' : 'none',
          }}
        >
          {ghostPositions.map((pos, i) => { const s = stickers[i]; return (
            <div
              key={s.id}
              className="absolute"
              style={{
                left: pos.x,
                top: pos.y,
                width: s.w,
                transform: `rotate(${s.rotation}deg)`,
                transformOrigin: 'top left',
                opacity: 0.12,
                filter: 'grayscale(1)',
              }}
            >
              {withGhostProp(s.content)}
            </div>
          )})}

        </div>
      )}

      {active && layerState.positions.length > 0 && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {stickers
            .slice(0, layerState.positions.length)
            .map((s, i) => ({ ...s, position: layerState.positions[i] }))
            .filter((s) => !deletedIds.has(s.id))
            .map((s) => (
              <Sticker
                key={s.id + '-' + shuffleKey}
                initialX={s.position.x}
                initialY={s.position.y}
                rotation={s.rotation}
                delay={s.delay}
                isDismissing={layerState.isDismissing}
                onPositionChange={(x, y) => { livePositionsRef.current[s.id] = { x, y } }}
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
                {s.content}
              </Sticker>
            ))}

          <div
            data-egg-control
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[#1C1C1C] rounded-full p-1.5 pointer-events-auto transition-all duration-300 ${
              controlsVisible && !draggingId && !layerState.isDismissing
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <div data-egg-control className="relative group">
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-0.5 bg-[#1C1C1C] text-[11px] font-medium text-white rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                Clear
              </span>
              <button
                data-egg-control
                onClick={() => { handleDismiss(); clearGhosts() }}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="Clear stickers"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
            <div data-egg-control className="relative group">
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-0.5 bg-[#1C1C1C] text-[11px] font-medium text-white rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                Shuffle
              </span>
              <button
                data-egg-control
                onClick={handleShuffle}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="Shuffle stickers"
              >
                <Shuffle size={15} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div
            ref={binRef}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center text-2xl pointer-events-none transition-all duration-200 ${
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
