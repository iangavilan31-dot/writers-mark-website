'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const blocks = [
  {
    number: '01',
    heading: 'No AI. Ever.',
    body: 'Every word we help you write is written by a human expert. We do not use AI generation tools, AI editing tools, or AI-assisted content of any kind. Your work is yours — refined by expertise, not autocomplete.',
    badge: '100% Human',
  },
  {
    number: '02',
    heading: 'Experience That\'s Actually Earned.',
    body: 'The Writer\'s Mark traces its roots to 1993. Thirty years of practice means we\'ve seen every writing challenge, every learning style, and every deadline. We don\'t need a script — we\'ve been there.',
    badge: '30+ Years',
  },
  {
    number: '03',
    heading: 'Wherever You Are.',
    body: 'Primarily remote and built for it. Secure video sessions, shared documents, real-time collaboration — the same quality whether you\'re in Hoboken or Hawaii. In-person available in NJ upon request.',
    badge: 'Remote First',
  },
  {
    number: '04',
    heading: 'From First Grade to Graduate School.',
    body: 'We work with students and professionals across every stage of life. Many clients have been with us for years — from middle school through college, or from junior consultant to C-suite executive.',
    badge: '1st → PhD',
  },
]

export function Differentiators() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-padding bg-cream"
      aria-labelledby="diff-heading"
    >
      <div className="container-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-prose mb-20"
        >
          <p className="section-label mb-4">WHY THE WRITER'S MARK</p>
          <h2
            id="diff-heading"
            className="heading-xl text-ink heading-accented"
          >
            We Do This Differently.
          </h2>
        </motion.div>

        {/* Feature blocks — alternating layout */}
        <div className="space-y-0">
          {blocks.map((block, i) => (
            <motion.div
              key={block.number}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 * i, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col md:flex-row items-start gap-12 py-14 border-b border-border
                          ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Number + badge */}
              <div className="flex-shrink-0 flex flex-col items-start gap-4 md:w-48">
                <span
                  className="font-serif font-bold text-ink/10 leading-none select-none"
                  style={{ fontSize: '5rem' }}
                  aria-hidden="true"
                >
                  {block.number}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 bg-navy/5 border border-navy/10 rounded-full">
                  <span className="section-label text-navy text-[10px]">{block.badge}</span>
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="heading-lg text-ink mb-4">{block.heading}</h3>
                <p className="body-lg max-w-2xl">{block.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
