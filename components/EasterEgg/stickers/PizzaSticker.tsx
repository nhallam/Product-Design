'use client'

export default function PizzaSticker() {
  return (
    <div className="p-2 w-[160px] flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Pizza.svg" alt="Pizza" draggable={false} className="w-full h-auto pointer-events-none [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]" />
    </div>
  )
}
