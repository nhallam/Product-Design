'use client'

export default function PizzaSticker() {
  return (
    <div className="flex items-center justify-center w-[130px] [filter:drop-shadow(0_10px_15px_rgba(0,0,0,0.15))]">
      <svg viewBox="0 0 130 145" width="130" height="145" xmlns="http://www.w3.org/2000/svg">
        {/* Crust outer */}
        <path d="M 65 138 L 4 28 A 78 78 0 0 1 126 28 Z" fill="#c8825a" />

        {/* Crust inner edge */}
        <path d="M 65 130 L 14 36 A 66 66 0 0 1 116 36 Z" fill="#d63b1f" />

        {/* Cheese */}
        <path d="M 65 122 L 22 44 A 57 57 0 0 1 108 44 Z" fill="#f5c518" />

        {/* Cheese blobs / melt spots */}
        <ellipse cx="50" cy="75" rx="9" ry="6" fill="#e8b510" opacity="0.7" transform="rotate(-15 50 75)" />
        <ellipse cx="80" cy="68" rx="7" ry="5" fill="#e8b510" opacity="0.7" transform="rotate(10 80 68)" />
        <ellipse cx="65" cy="95" rx="6" ry="4" fill="#e8b510" opacity="0.6" transform="rotate(-5 65 95)" />

        {/* Pepperoni 1 */}
        <circle cx="64" cy="76" r="11" fill="#8b1a0e" />
        <circle cx="64" cy="76" r="9" fill="#b52818" />
        <circle cx="61" cy="74" r="2" fill="#8b1a0e" opacity="0.5" />
        <circle cx="67" cy="79" r="1.5" fill="#8b1a0e" opacity="0.5" />

        {/* Pepperoni 2 */}
        <circle cx="44" cy="58" r="9" fill="#8b1a0e" />
        <circle cx="44" cy="58" r="7.5" fill="#b52818" />
        <circle cx="42" cy="56" r="1.5" fill="#8b1a0e" opacity="0.5" />

        {/* Pepperoni 3 */}
        <circle cx="83" cy="55" r="9" fill="#8b1a0e" />
        <circle cx="83" cy="55" r="7.5" fill="#b52818" />
        <circle cx="85" cy="53" r="1.5" fill="#8b1a0e" opacity="0.5" />

        {/* Crust highlight */}
        <path d="M 4 28 A 78 78 0 0 1 126 28" stroke="#e8a070" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />

        {/* Crust texture dots */}
        <circle cx="30" cy="22" r="2" fill="#b87050" opacity="0.5" />
        <circle cx="55" cy="14" r="2.5" fill="#b87050" opacity="0.4" />
        <circle cx="80" cy="13" r="2" fill="#b87050" opacity="0.5" />
        <circle cx="102" cy="21" r="2" fill="#b87050" opacity="0.4" />
      </svg>
    </div>
  )
}
