'use client'

import { useEffect, useRef, useState, cloneElement, isValidElement, ReactElement } from 'react'
import { PanInfo } from 'framer-motion'
import { X, RefreshCw, Trash2 } from 'react-feather'

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

import { prefetchStickerData } from './stickerData'
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
  { id: 'gtrain', w: 230, h: 68, rotation: 5, delay: 0.14, content: <GTrainSticker /> },
  { id: 'boombox', w: 175, h: 300, rotation: -6, delay: 0.21, content: <BoomboxSticker /> },
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
  { id: 'records', w: 180, h: 250, rotation: -4, delay: 0.56, content: <RecordShopSticker /> },
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
// Stickers may sit close to UI elements (nav, controls) but must not touch them.
const EXCLUSION_GAP = 12
const EDGES = ['left', 'right', 'top', 'bottom'] as const

type Rect = { x: number; y: number; w: number; h: number }

function overlaps(a: Rect, b: Rect, gap = GAP): boolean {
  return (
    a.x < b.x + b.w + gap &&
    a.x + a.w + gap > b.x &&
    a.y < b.y + b.h + gap &&
    a.y + a.h + gap > b.y
  )
}

// Areas the stickers must keep clear of: the nav items (Nick Hallam / Menu)
// and the bottom-center control pill (incl. its hover label).
function getExclusionZones(viewW: number, viewH: number): Rect[] {
  const zones: Rect[] = []

  const nav = typeof document !== 'undefined' ? document.querySelector('nav') : null
  if (nav) {
    for (const child of Array.from(nav.children)) {
      const r = child.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) zones.push({ x: r.left, y: r.top, w: r.width, h: r.height })
    }
  }

  // Control pill footprint: ~100px wide, ~44px tall, 32px above the bottom,
  // plus ~22px for the hover label that appears above it.
  const pillW = 100
  const pillH = 44
  const labelH = 22
  const bottomGap = 32
  zones.push({
    x: viewW / 2 - pillW / 2,
    y: viewH - bottomGap - pillH - labelH,
    w: pillW,
    h: pillH + labelH,
  })

  return zones
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
const MOBILE_MAX_STICKERS = 7

function selectPool(viewW: number) {
  if (viewW >= MOBILE_BREAKPOINT) return stickers
  const shuffled = [...stickers].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, MOBILE_MAX_STICKERS)
}

function generateEdgePositions(pool: typeof stickers, viewW: number, viewH: number): { x: number; y: number }[] {
  const placed: Rect[] = []
  const exclusions = getExclusionZones(viewW, viewH)

  const clears = (rect: Rect) =>
    !placed.some((p) => overlaps(rect, p)) &&
    !exclusions.some((z) => overlaps(rect, z, EXCLUSION_GAP))

  return pool.map((s) => {
    let pos = edgePosition(EDGES[Math.floor(Math.random() * EDGES.length)], s, viewW, viewH)
    for (let attempt = 0; attempt < 80; attempt++) {
      const edge = EDGES[Math.floor(Math.random() * EDGES.length)]
      pos = edgePosition(edge, s, viewW, viewH)
      if (clears({ ...pos, w: s.w, h: s.h })) break
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
    pool: typeof stickers
    positions: { x: number; y: number }[]
    isDismissing: boolean
  }>({ pool: [], positions: [], isDismissing: false })
  const [ghostPositions, setGhostPositions] = useState<{ x: number; y: number }[] | null>(null)
  const [ghostFading, setGhostFading] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [overBin, setOverBin] = useState(false)
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set())
  const [deleting, setDeleting] = useState<{ id: string; target: { x: number; y: number } } | null>(null)
  const [controlsVisible, setControlsVisible] = useState(false)
  // Set when the user explicitly clears (pill X or menu "Clear stickers"); fully
  // hides the pill. A plain background click does NOT set this, so the pill persists.
  const [pillHidden, setPillHidden] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0)
  const [buttonLabel, setButtonLabel] = useState<string | null>(null)
  const binRef = useRef<HTMLDivElement>(null)
  const livePositionsRef = useRef<Record<string, { x: number; y: number }>>({})
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Generous hit area around the trash target so it is easy to reach.
  const BIN_MARGIN = 32
  const pointInBin = (px: number, py: number) => {
    if (!binRef.current) return false
    const b = binRef.current.getBoundingClientRect()
    return (
      px >= b.left - BIN_MARGIN && px <= b.right + BIN_MARGIN &&
      py >= b.top - BIN_MARGIN && py <= b.bottom + BIN_MARGIN
    )
  }
  const binCenter = () => {
    const b = binRef.current?.getBoundingClientRect()
    return b ? { x: b.left + b.width / 2, y: b.top + b.height / 2 } : { x: 0, y: 0 }
  }

  const scheduleControls = (pool: typeof stickers) => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    setControlsVisible(false)
    const maxDelay = Math.max(...pool.map((s) => s.delay))
    controlsTimerRef.current = setTimeout(() => setControlsVisible(true), (maxDelay + 0.7) * 1000)
  }

  const activate = () => {
    setPillHidden(false)
    setGhostPositions(null)
    setGhostFading(false)
    notifyGhostListeners(false)
    setDeletedIds(new Set())
    setDeleting(null)
    setOverBin(false)
    const pool = selectPool(window.innerWidth)
    const positions = generateEdgePositions(pool, window.innerWidth, window.innerHeight)
    pool.forEach((s, i) => { livePositionsRef.current[s.id] = positions[i] })
    setLayerState({ pool, positions, isDismissing: false })
    setActive(true)
    scheduleControls(pool)
  }

  const handleShuffle = () => {
    setPillHidden(false)
    // If coming from ghost mode, clear ghosts and re-activate.
    if (ghostPositions) {
      setGhostPositions(null)
      setGhostFading(false)
      notifyGhostListeners(false)
    }
    const pool = selectPool(window.innerWidth)
    const positions = generateEdgePositions(pool, window.innerWidth, window.innerHeight)
    pool.forEach((s, i) => { livePositionsRef.current[s.id] = positions[i] })
    setLayerState({ pool, positions, isDismissing: false })
    setDeletedIds(new Set())
    setDeleting(null)
    setOverBin(false)
    setShuffleKey((k) => k + 1)
    setActive(true)
    // The pill is already on screen — keep it visible (with Refresh + Clear)
    // rather than replaying the entrance delay.
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    setControlsVisible(true)
  }

  const handleDismiss = () => {
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    setControlsVisible(false)
    const ghostPos = layerState.pool.map((s) => livePositionsRef.current[s.id] ?? { x: 0, y: 0 })
    setGhostPositions(ghostPos)
    notifyGhostListeners(true)
    setLayerState((s) => ({ ...s, isDismissing: true }))
    const maxDelay = Math.max(...layerState.pool.map((s) => s.delay)) * 0.4
    setTimeout(() => setActive(false), (maxDelay + 0.16) * 1000)
  }

  const clearGhosts = () => {
    setPillHidden(true)
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

  // Auto-activate after a short delay, but only when the initial page load is the home page.
  // If the user lands on /about etc. the stickers stay dormant until manually triggered.
  useEffect(() => {
    if (window.location.pathname !== '/') return
    // Fire the sticker API requests now, ~1s before they animate in, so the
    // data is usually ready the moment each sticker mounts.
    prefetchStickerData()
    const t = setTimeout(activate, 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          {ghostPositions.map((pos, i) => { const s = layerState.pool[i]; if (!s || deletedIds.has(s.id)) return null; return (
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
          {layerState.pool
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
                deleting={deleting?.id === s.id}
                deleteTarget={deleting?.id === s.id ? deleting.target : undefined}
                onPositionChange={(x, y) => { livePositionsRef.current[s.id] = { x, y } }}
                onDragStart={() => setDraggingId(s.id)}
                onDrag={(_e, info) => setOverBin(pointInBin(info.point.x, info.point.y))}
                onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
                  setDraggingId(null)
                  const hit = pointInBin(info.point.x, info.point.y)
                  setOverBin(false)
                  if (hit) {
                    const c = binCenter()
                    setDeleting({ id: s.id, target: { x: c.x - s.w / 2, y: c.y - s.h / 2 } })
                  }
                }}
                onDeleted={() => {
                  setDeletedIds((prev) => new Set([...prev, s.id]))
                  setDeleting((d) => (d?.id === s.id ? null : d))
                }}
              >
                {s.content}
              </Sticker>
            ))}
        </div>
      )}

      {/* Control pill — lives outside the active block so it persists in ghost mode.
          In ghost mode: only the Refresh button is shown (pill is 44px).
          In active mode: Refresh + Clear (78px), or trash target when dragging (44px).
          The only way to fully remove the pill is via "Clear stickers" in the menu. */}
      {(() => {
        const ghostMode = ghostPositions !== null && !ghostFading && !pillHidden
        const binActive = !!draggingId || !!deleting
        const pillVisible = !pillHidden && (ghostMode || ((controlsVisible || binActive) && !layerState.isDismissing))
        const pillWidth = (ghostMode || binActive) ? 44 : 78
        return (
        <div
          data-egg-control
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 h-11 z-[100] pointer-events-none transition-[opacity,transform] duration-300 ${
            pillVisible ? 'opacity-100' : 'opacity-0'
          } ${
            pillVisible || layerState.isDismissing ? 'translate-y-0' : 'translate-y-2'
          }`}
          style={{ width: 0 }}
        >
          <span
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[11px] font-medium text-[var(--text)] whitespace-nowrap pointer-events-none transition-opacity duration-200 ease-in-out"
            style={{ opacity: !binActive && buttonLabel ? 1 : 0 }}
          >
            {buttonLabel ?? ''}
          </span>

          <div
            className="absolute top-0 h-full rounded-full transition-[width,background-color,transform] duration-200"
            style={{
              width: pillWidth,
              left: 0,
              transform: `translateX(-50%) scale(${overBin ? 1.18 : 1})`,
              backgroundColor: overBin ? '#D12525' : 'var(--text)',
            }}
          />

          {/* Ghost mode: single centered Refresh button */}
          {ghostMode && (
            <div
              className="absolute top-0 h-full flex items-center justify-center pointer-events-auto"
              style={{ width: 44, left: 0, transform: 'translateX(-50%)' }}
            >
              <button
                data-egg-control
                onClick={handleShuffle}
                onMouseEnter={() => setButtonLabel('Refresh')}
                onMouseLeave={() => setButtonLabel(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--bg)] hover:bg-[var(--bg)]/20 transition-colors"
                aria-label="Refresh stickers"
              >
                <RefreshCw size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Active mode: Refresh + Clear (78px, centered on anchor) */}
          {!ghostMode && (
            <div
              className={`absolute top-0 h-full flex items-center justify-center gap-0.5 transition-opacity duration-200 ${
                binActive ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
              }`}
              style={{ width: 78, left: 0, transform: 'translateX(-50%)' }}
            >
              <button
                data-egg-control
                onClick={handleShuffle}
                onMouseEnter={() => setButtonLabel('Refresh')}
                onMouseLeave={() => setButtonLabel(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--bg)] hover:bg-[var(--bg)]/20 transition-colors"
                aria-label="Refresh stickers"
              >
                <RefreshCw size={15} strokeWidth={2.5} />
              </button>
              <button
                data-egg-control
                onClick={() => { handleDismiss(); clearGhosts() }}
                onMouseEnter={() => setButtonLabel('Clear')}
                onMouseLeave={() => setButtonLabel(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--bg)] hover:bg-[var(--bg)]/20 transition-colors"
                aria-label="Clear stickers"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {/* Dragging state: single trash target (44px, centered on anchor) */}
          <div
            ref={binRef}
            className={`absolute top-0 h-full flex items-center justify-center text-[var(--bg)] pointer-events-none transition-[opacity,transform] duration-200 ${
              binActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ width: 44, left: 0, transform: `translateX(-50%) scale(${overBin ? 1.18 : 1})` }}
            aria-label="Drop to delete"
          >
            <Trash2 size={16} strokeWidth={2.5} />
          </div>
        </div>
        )
      })()}
    </>
  )
}
