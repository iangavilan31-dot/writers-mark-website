'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Tracks whether the Hero has mounted at least once in this browser session.
// First mount (initial load / hard refresh) → underline shows instantly.
// Subsequent mounts (client-side nav back to home) → underline animates.
let hasHeroMountedBefore = false

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

// Animated counter hook
function useCounter(target: number, duration: number = 1500) {
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            el.textContent = Math.round(eased * target).toString()
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

const stats = [
  { value: 30, suffix: '+', label: 'Years in Practice' },
  { value: 100, suffix: '%', label: 'Human — No AI' },
  { value: 4, suffix: '.9★', label: 'Avg Client Rating' },
  { value: 1, suffix: 'st→PhD', label: 'Grade Levels Served' },
]

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const countRef = useCounter(value)
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <div className="font-serif font-bold text-gold" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1 }}>
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="font-sans text-xs text-cream/50 mt-1 tracking-wide">{label}</p>
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animateUnderline] = useState(() => hasHeroMountedBefore)

  useEffect(() => {
    hasHeroMountedBefore = true
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: text moves up slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-navy flex flex-col justify-end overflow-hidden"
      aria-label="Hero"
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative gold lines — top-right corner */}
      <div className="absolute top-0 right-0 w-px h-48 bg-gradient-to-b from-transparent via-gold/30 to-transparent" aria-hidden="true" />
      <div className="absolute top-12 right-8 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />

      {/* Large italic background text — the "impossible in Squarespace" detail */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-serif italic font-bold text-white/[0.025] text-center leading-none"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)', whiteSpace: 'nowrap' }}
        >
          Writing.
        </span>
      </div>

      {/* Main content — pinned to bottom of hero */}
      <motion.div
        className="relative z-10 container-content pb-16 md:pb-24 pt-32"
        style={{ y: smoothY, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gold" />
            <p className="section-label text-gold/80">
              EST. 1993 · NEW JERSEY · SERVING NATIONWIDE
            </p>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-serif font-bold text-cream mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.025em',
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
          >
            Writing Doesn't{' '}
            <em className="not-italic relative inline-block">
              Have to Suck.
              {/* Gold underline */}
              <motion.span
                className="absolute bottom-1 left-0 h-[3px] bg-gold rounded-full"
                initial={{ width: animateUnderline ? 0 : '100%' }}
                animate={{ width: '100%' }}
                transition={
                  animateUnderline
                    ? { delay: 0.9, duration: 0.6, ease: 'easeOut' }
                    : { duration: 0 }
                }
                aria-hidden="true"
              />
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-cream/60 mb-10 max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', lineHeight: 1.6 }}
          >
            Expert tutoring, test prep, college admissions coaching, and professional writing
            consulting — fully human, no AI, no shortcuts. From grade school to grad school.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/book" className="btn-primary py-5 px-10 text-base justify-center sm:justify-start">
              Book a Session
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/consult" className="btn-secondary-light py-5 px-10 text-base justify-center sm:justify-start">
              Free 30-Min Consultation
            </Link>
          </motion.div>

          {/* Trust micro-copy */}
          <motion.p variants={itemVariants} className="font-sans text-xs text-cream/30 mb-14">
            No commitment required for your consultation. No credit card needed.
          </motion.p>

          {/* Stats divider */}
          <motion.div
            variants={itemVariants}
            className="pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="section-label text-cream/30 text-[9px] rotate-90 origin-center translate-x-4">SCROLL</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-cream/30 to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
