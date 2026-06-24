import GTrainSticker from '@/components/EasterEgg/stickers/GTrainSticker'
import BoomboxSticker from '@/components/EasterEgg/stickers/BoomboxSticker'
import ScoreboardSticker from '@/components/EasterEgg/stickers/ScoreboardSticker'
import WeatherSticker from '@/components/EasterEgg/stickers/WeatherSticker'
import PizzaSticker from '@/components/EasterEgg/stickers/PizzaSticker'
import KelloggsSticker from '@/components/EasterEgg/stickers/KelloggsSticker'
import VideoSticker from '@/components/EasterEgg/stickers/VideoSticker'
import RecordShopSticker from '@/components/EasterEgg/stickers/RecordShopSticker'

function StickerCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center justify-center">
        {children}
      </div>
      <span className="text-xs text-[var(--muted)] font-medium tracking-wide uppercase">{label}</span>
    </div>
  )
}

export default function StickersPage() {
  return (
    <main className="flex-1 flex flex-col px-6 pb-16">
      <div className="pt-[28vh]">
        <h1
          className="text-[2.75rem] font-black leading-[1.1] w-full text-center"
          style={{ fontFamily: "'AmericanGroteskCondensed', Arial, sans-serif" }}
        >
          Stickers
        </h1>
      </div>

      <p className="mt-6 text-base text-[var(--muted)] text-center">
        The easter egg stickers hidden around the site.
      </p>

      <div className="mt-16 flex flex-wrap gap-10 justify-center items-end">
        <StickerCard label="Weather">
          <WeatherSticker />
        </StickerCard>

        <StickerCard label="Video">
          <VideoSticker ghost />
        </StickerCard>

        <StickerCard label="G Train">
          <GTrainSticker />
        </StickerCard>

        <StickerCard label="Boombox">
          <BoomboxSticker ghost />
        </StickerCard>

        <StickerCard label="Scoreboard">
          <ScoreboardSticker ghost />
        </StickerCard>

        <StickerCard label="Yankees">
          <div className="p-2 w-[200px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/New_York_Yankees_logo.svg"
              alt="New York Yankees"
              className="w-28 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]"
            />
          </div>
        </StickerCard>

        <StickerCard label="NYC Love">
          <div className="p-2 w-[200px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/NYC_Love.svg"
              alt="NYC Love"
              className="w-36 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]"
            />
          </div>
        </StickerCard>

        <StickerCard label="Pizza">
          <PizzaSticker />
        </StickerCard>

        <StickerCard label="Kelloggs">
          <KelloggsSticker />
        </StickerCard>

        <StickerCard label="Record Shops">
          <RecordShopSticker ghost />
        </StickerCard>

        <StickerCard label="ANTI">
          <div className="p-2 w-[160px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/anti.svg"
              alt="Anti"
              className="w-full h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]"
            />
          </div>
        </StickerCard>
      </div>
    </main>
  )
}
