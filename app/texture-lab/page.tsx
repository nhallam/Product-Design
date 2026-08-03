'use client'

import { useState } from 'react'
import RecordShopSticker from '@/components/EasterEgg/stickers/RecordShopSticker'
import PaperOverlay, { PaperSettings } from '@/components/PaperOverlay'

// Drop new .png textures in /public and add their paths here.
const TEXTURES = ['/Paper_texture.png']

const BLENDS = [
  'normal', 'multiply', 'overlay', 'soft-light', 'hard-light',
  'screen', 'darken', 'lighten', 'color-burn', 'color-dodge',
  'difference', 'exclusion', 'luminosity',
]

// A stable module-scope stage so tweaking a slider re-renders the overlay
// without remounting the sticker (which would re-randomise its store).
function Stage({ theme, s }: { theme: 'light' | 'dark'; s: PaperSettings }) {
  return (
    <div
      data-theme={theme}
      className="flex-1 flex flex-col items-center justify-center gap-4 py-14 rounded-xl border border-[var(--border)]"
      style={{ background: 'var(--bg)' }}
    >
      <span className="text-[11px] font-medium uppercase tracking-widest text-[var(--muted)]">{theme}</span>
      <div style={{ position: 'relative', width: 180, height: 250, isolation: 'isolate' }}>
        <RecordShopSticker themed />
        <PaperOverlay s={s} />
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-24 shrink-0 text-[var(--muted)]">{label}</span>
      {children}
    </label>
  )
}

export default function TextureLab() {
  const [s, setS] = useState<PaperSettings>({
    src: TEXTURES[0],
    opacity: 0.6,
    blend: 'multiply',
    rotate: 0,
    scale: 1,
    mode: 'cover',
    tile: 300,
    invert: false,
    brightness: 1,
    radius: 2,
  })
  const set = (patch: Partial<PaperSettings>) => setS((p) => ({ ...p, ...patch }))

  const css = `mix-blend-mode: ${s.blend};
opacity: ${s.opacity};
background: url('${s.src}') center / ${s.mode === 'tile' ? `${s.tile}px repeat` : 'cover no-repeat'};
transform: rotate(${s.rotate}deg) scale(${s.scale});
filter: ${s.invert ? 'invert(1) ' : ''}brightness(${s.brightness});`

  return (
    <main className="px-6 py-10 pb-24">
      <h1
        className="text-[2.75rem] font-black leading-[1.1]"
        style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
      >
        Texture Lab
      </h1>
      <p className="text-sm text-[var(--muted)] mt-2 mb-8">
        Layer a paper texture over the record-store poster. Adjust and preview in both themes.
      </p>

      {/* Controls */}
      <div className="flex flex-col gap-3 mb-10">
        <Row label="Texture">
          <select
            value={s.src}
            onChange={(e) => set({ src: e.target.value })}
            className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1"
          >
            {TEXTURES.map((t) => <option key={t} value={t}>{t.replace('/', '')}</option>)}
          </select>
        </Row>

        <Row label="Blend">
          <select
            value={s.blend}
            onChange={(e) => set({ blend: e.target.value })}
            className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1"
          >
            {BLENDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </Row>

        <Row label="Fit">
          <select
            value={s.mode}
            onChange={(e) => set({ mode: e.target.value as 'cover' | 'tile' })}
            className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded px-2 py-1"
          >
            <option value="cover">cover (whole sheet)</option>
            <option value="tile">tile (repeat)</option>
          </select>
        </Row>

        <Row label={`Opacity ${s.opacity.toFixed(2)}`}>
          <input type="range" min={0} max={1} step={0.01} value={s.opacity} onChange={(e) => set({ opacity: +e.target.value })} className="flex-1" />
        </Row>

        {s.mode === 'tile' && (
          <Row label={`Tile ${s.tile}px`}>
            <input type="range" min={40} max={600} step={10} value={s.tile} onChange={(e) => set({ tile: +e.target.value })} className="flex-1" />
          </Row>
        )}

        <Row label={`Scale ${s.scale.toFixed(2)}`}>
          <input type="range" min={0.5} max={3} step={0.05} value={s.scale} onChange={(e) => set({ scale: +e.target.value })} className="flex-1" />
        </Row>

        <Row label={`Rotate ${s.rotate}°`}>
          <input type="range" min={0} max={360} step={1} value={s.rotate} onChange={(e) => set({ rotate: +e.target.value })} className="flex-1" />
        </Row>

        <Row label={`Brightness ${s.brightness.toFixed(2)}`}>
          <input type="range" min={0} max={2} step={0.05} value={s.brightness} onChange={(e) => set({ brightness: +e.target.value })} className="flex-1" />
        </Row>

        <Row label="Invert">
          <input type="checkbox" checked={s.invert} onChange={(e) => set({ invert: e.target.checked })} />
        </Row>
      </div>

      {/* Previews */}
      <div className="flex gap-5">
        <Stage theme="light" s={s} />
        <Stage theme="dark" s={s} />
      </div>

      {/* Readout */}
      <pre className="mt-8 text-xs bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto text-[var(--muted)] whitespace-pre-wrap">
{css}
      </pre>
    </main>
  )
}
