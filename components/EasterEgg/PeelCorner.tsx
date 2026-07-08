import { ReactNode, CSSProperties } from 'react'

// Wraps a sticker and adds a folded top-right corner that peels up on hover.
// Pure CSS (see .peel / .peel-flap in globals.css): the flap is a right triangle
// showing the sticker's pale backing, with a curl gradient and a cast shadow.
export default function PeelCorner({ children, size = 30 }: { children: ReactNode; size?: number }) {
  return (
    <div className="peel" style={{ '--peel-max': `${size}px` } as CSSProperties}>
      {children}
      <span className="peel-flap" aria-hidden />
    </div>
  )
}
