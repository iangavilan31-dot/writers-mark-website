'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

interface CTABlockProps {
  heading?: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: 'gold' | 'navy' | 'cream'
}

export function CTABlock({
  heading = "Not Sure Where to Start?",
  body = "Book a free 30-minute consultation. We'll listen, assess, and tell you honestly whether we're the right fit — and what a realistic plan looks like. No pressure. No pitch. Just a conversation.",
  primaryLabel = "Schedule Free Consultation",
  primaryHref = "/consult",
  secondaryLabel = "Browse All Services",
  secondaryHref = "/services",
  variant = 'gold',
}: CTABlockProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const bg = {
    gold: 'bg-gold',
    navy: 'bg-navy',
    cream: 'bg-cream-dark',
  }[variant]

  const textColor = variant === 'gold' ? 'text-ink' : 'text-cream'
  const subtextColor = variant === 'gold' ? 'text-ink/70' : 'text-cream/60'

  return (
    <section ref={ref} className={`${bg} section-padding-sm`} aria-label="Call to action">
      <div className="container-content">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className={`heading-xl ${textColor} mb-5`}>{heading}</h2>
          <p className={`body-lg ${subtextColor} mb-10 text-balance`}>{body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={primaryHref}
              className={`btn-primary py-5 px-10 text-base justify-center ${
                variant === 'gold' ? 'bg-ink text-cream hover:bg-ink/90' : ''
              }`}
            >
              {primaryLabel}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {secondaryLabel && (
              <Link
                href={secondaryHref}
                className={`py-5 px-10 text-base justify-center inline-flex items-center gap-2 font-sans font-semibold rounded-sm transition-all duration-200 cursor-pointer border ${
                  variant === 'gold'
                    ? 'border-ink/20 text-ink hover:border-ink hover:bg-ink/5'
                    : 'border-cream/20 text-cream hover:border-cream/60'
                }`}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
