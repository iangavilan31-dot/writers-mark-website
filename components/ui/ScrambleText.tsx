'use client'

import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

interface ScrambleTextProps {
  text: string
  delay?: number
  duration?: number
  className?: string
}

export function ScrambleText({ text, delay = 400, duration = 1200, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(() =>
    text.split('').map(c => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)])).join('')
  )
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        // How many characters have "resolved" — eased curve so it accelerates
        const resolved = Math.floor(Math.pow(progress, 1.5) * text.length)

        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )

        if (progress < 1) {
          requestAnimationFrame(tick)
        } else {
          setDisplay(text)
          setDone(true)
        }
      }

      requestAnimationFrame(tick)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [text, delay, duration])

  return (
    <span className={className} aria-label={text} aria-live={done ? undefined : 'polite'}>
      {display}
    </span>
  )
}
