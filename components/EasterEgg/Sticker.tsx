'use client'

import { motion } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface StickerProps {
  children: ReactNode
  initialX: number
  initialY: number
  rotation?: number
  delay?: number
}

export default function Sticker({ children, initialX, initialY, rotation = 0, delay = 0 }: StickerProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0, rotate: rotation - 15, opacity: 0 }}
      animate={{ scale: 1, rotate: rotation, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 350, damping: 18, delay }}
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      style={{ x: initialX, y: initialY, position: 'absolute', touchAction: 'none' }}
      className="cursor-grab select-none pointer-events-auto"
    >
      {children}
    </motion.div>
  )
}
