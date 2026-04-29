'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StickerProps {
  children: ReactNode
  initialX: number
  initialY: number
  rotation?: number
  delay?: number
  isDismissing?: boolean
}

export default function Sticker({ children, initialX, initialY, rotation = 0, delay = 0, isDismissing = false }: StickerProps) {
  return (
    <motion.div
      drag={!isDismissing}
      dragMomentum={false}
      dragElastic={0.05}
      initial={{ scale: 0, rotate: rotation - 15, opacity: 0 }}
      animate={isDismissing
        ? { scale: 0, rotate: rotation + 15, opacity: 0 }
        : { scale: 1, rotate: rotation, opacity: 1 }
      }
      transition={isDismissing
        ? { type: 'spring', stiffness: 400, damping: 25, delay: delay * 0.4 }
        : { type: 'spring', stiffness: 350, damping: 18, delay }
      }
      whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
      style={{ x: initialX, y: initialY, position: 'absolute', touchAction: 'none' }}
      className="cursor-grab select-none pointer-events-auto"
    >
      {children}
    </motion.div>
  )
}
