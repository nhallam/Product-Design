import GTrainSticker from '@/components/EasterEgg/stickers/GTrainSticker'
import BoomboxSticker from '@/components/EasterEgg/stickers/BoomboxSticker'
import ScoreboardSticker from '@/components/EasterEgg/stickers/ScoreboardSticker'
import WeatherSticker from '@/components/EasterEgg/stickers/WeatherSticker'
import PizzaSticker from '@/components/EasterEgg/stickers/PizzaSticker'
import KelloggsSticker from '@/components/EasterEgg/stickers/KelloggsSticker'
import VideoSticker from '@/components/EasterEgg/stickers/VideoSticker'
import RecordShopSticker from '@/components/EasterEgg/stickers/RecordShopSticker'

const stickers: { title: string; description: string; sticker: React.ReactNode }[] = [
  {
    title: 'Weather',
    description: 'Live conditions in Brooklyn right now, pulled fresh whenever you stop by.',
    sticker: <WeatherSticker />,
  },
  {
    title: 'Video',
    description: 'A looping clip of something I have been watching or working on lately.',
    sticker: <VideoSticker ghost />,
  },
  {
    title: 'G Train',
    description: 'The real-time service status of the only subway line that matters.',
    sticker: <GTrainSticker />,
  },
  {
    title: 'Boombox',
    description: 'A few tracks on heavy rotation — hit play to hear what I am listening to.',
    sticker: <BoomboxSticker ghost />,
  },
  {
    title: 'Scoreboard',
    description: 'Last night’s score for my New York teams, refreshed after every game.',
    sticker: <ScoreboardSticker ghost />,
  },
  {
    title: 'Yankees',
    description: 'Bronx Bombers. No further explanation required.',
    sticker: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/New_York_Yankees_logo.svg"
          alt="New York Yankees"
          className="w-28 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]"
        />
      </div>
    ),
  },
  {
    title: 'NYC Love',
    description: 'A small valentine to the city I get to call home.',
    sticker: (
      <div className="p-2 w-[200px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/NYC_Love.svg"
          alt="NYC Love"
          className="w-36 h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.1))]"
        />
      </div>
    ),
  },
  {
    title: 'Pizza',
    description: 'The unofficial food group of New York, and a personal weakness.',
    sticker: <PizzaSticker />,
  },
  {
    title: 'Kelloggs',
    description: 'A flickering neon nod to a sign I walk past most mornings.',
    sticker: <KelloggsSticker />,
  },
  {
    title: 'Record Shops',
    description: 'My favourite spots to dig for vinyl, with hours and directions in hand.',
    sticker: <RecordShopSticker ghost />,
  },
  {
    title: 'ANTI',
    description: 'A nod to the record that has not left my turntable in years.',
    sticker: (
      <div className="p-2 w-[160px] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/anti.svg"
          alt="Anti"
          className="w-full h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]"
        />
      </div>
    ),
  },
]

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

      <div className="mt-16 divide-y divide-[var(--border)]">
        {stickers.map(({ title, description, sticker }) => (
          <div
            key={title}
            className="grid grid-cols-2 gap-8 items-center py-12"
          >
            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>
              <p className="mt-2 text-base leading-relaxed text-[var(--muted)]">{description}</p>
            </div>
            <div className="flex items-center justify-center">{sticker}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
