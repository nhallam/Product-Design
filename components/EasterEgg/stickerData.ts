'use client'

// Shared data layer for the API-backed stickers (weather, G train, scoreboard).
//
// Two wins over each sticker fetching on its own when it mounts:
//  1. prefetchStickerData() fires the requests the moment the page loads, ~1s
//     before the stickers animate in — so the data is usually already in hand.
//  2. A stale-while-revalidate cache (in-memory for the session, localStorage
//     across visits) means repeat views render instantly, then refresh quietly.

// How long a cached response is considered fresh. Keep these in sync between the
// prefetch and the sticker that reads the same URL.
export const TTL = {
  weather: 30 * 60 * 1000,
  gtrain: 60 * 1000,
  scoreboard: 30 * 1000,
} as const

type Entry = { ts: number; promise: Promise<unknown> }

const memory = new Map<string, Entry>()

const key = (url: string) => `sticker-cache:${url}`

function readLS<T>(url: string, ttlMs: number): T | null {
  try {
    const raw = localStorage.getItem(key(url))
    if (!raw) return null
    const { ts, data } = JSON.parse(raw) as { ts: number; data: T }
    if (Date.now() - ts > ttlMs) return null
    return data
  } catch {
    return null
  }
}

function writeLS(url: string, data: unknown) {
  try {
    localStorage.setItem(key(url), JSON.stringify({ ts: Date.now(), data }))
  } catch {}
}

function fetchFresh<T>(url: string): Promise<T> {
  return fetch(url)
    .then((r) => r.json())
    .then((data: T) => {
      writeLS(url, data)
      return data
    })
}

// Stale-while-revalidate fetch with a per-session in-memory layer (instant
// repeat reads) backed by localStorage (instant first paint on return visits).
export function cachedFetch<T>(url: string, ttlMs: number): Promise<T> {
  const entry = memory.get(url)
  if (entry && Date.now() - entry.ts <= ttlMs) {
    return entry.promise as Promise<T>
  }

  const fromLS = readLS<T>(url, ttlMs)
  if (fromLS !== null) {
    // Serve the cached copy immediately, then refresh in the background so the
    // next reader (and the on-screen sticker) picks up live data.
    const promise = Promise.resolve(fromLS)
    memory.set(url, { ts: Date.now(), promise })
    fetchFresh<T>(url)
      .then((fresh) => memory.set(url, { ts: Date.now(), promise: Promise.resolve(fresh) }))
      .catch(() => {})
    return promise
  }

  const promise = fetchFresh<T>(url)
  memory.set(url, { ts: Date.now(), promise })
  return promise
}

// Always hit the network (used for polling live scores), but keep the cache warm.
export function freshFetch<T>(url: string): Promise<T> {
  const promise = fetchFresh<T>(url)
  memory.set(url, { ts: Date.now(), promise })
  return promise
}

// Kick off the requests the home-page stickers need before they mount, so the
// data is already cached by the time they animate in.
export function prefetchStickerData() {
  cachedFetch('/api/weather', TTL.weather).catch(() => {})
  cachedFetch('/api/gtrain', TTL.gtrain).catch(() => {})
  cachedFetch('/api/scoreboard?team=knicks', TTL.scoreboard).catch(() => {})
}
