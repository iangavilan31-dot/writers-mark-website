'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote: "My daughter went from dreading writing assignments to asking for more. Her DSAT score jumped 140 points. The Writer's Mark is the real deal — not tricks, actual understanding.",
    name: 'Parent of 11th Grader',
    location: 'Maplewood, NJ',
    service: 'DSAT Prep',
    rating: 5,
  },
  {
    quote: "I hired them for a federal grant proposal I'd been putting off for months. In three sessions, we had a polished, compelling narrative. We got the grant. I cannot overstate how valuable this was.",
    name: 'Environmental Consultant',
    location: 'Newark, NJ',
    service: 'Professional Writing',
    rating: 5,
  },
  {
    quote: "My college essay was going nowhere until we worked with The Writer's Mark. It went from generic to genuinely me. I got into my first choice school — a school I almost didn't apply to.",
    name: 'College Applicant',
    location: 'Class of 2024',
    service: 'College Admissions',
    rating: 5,
  },
  {
    quote: "Three years of working with them. My son started in 7th grade struggling with basic paragraph structure. He's now a freshman writing at the top of his class. Worth every dollar.",
    name: 'Parent of 9th Grader',
    location: 'Montclair, NJ',
    service: 'K–12 Tutoring',
    rating: 5,
  },
  {
    quote: "I needed help making my scientific poster not just accurate but communicative. They understood the science and helped me tell the story behind the data. My session got the most questions of any I've seen.",
    name: 'Graduate Researcher',
    location: 'Rutgers University',
    service: 'Scientific Presentations',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-6" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? '#C9A84C' : 'none'}
          color={i < rating ? '#C9A84C' : '#6B6B6B'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <section
      ref={ref}
      className="section-padding bg-navy relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute top-8 left-8 font-serif text-white/[0.03] select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(12rem, 30vw, 28rem)', lineHeight: 0.8 }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Decorative gold corner lines */}
      <div className="absolute bottom-0 right-0 w-px h-32 bg-gradient-to-t from-transparent via-gold/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-20 h-px bg-gradient-to-l from-transparent via-gold/20 to-transparent" aria-hidden="true" />

      <div className="container-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="section-label text-gold mb-4">WHAT CLIENTS SAY</p>
            <h2
              id="testimonials-heading"
              className="font-serif font-bold text-cream"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              Real Results. Real People.
            </h2>
          </div>
          <a
            href="/reviews"
            className="font-sans text-sm text-cream/50 hover:text-gold transition-colors duration-150 cursor-pointer whitespace-nowrap"
          >
            Read all reviews →
          </a>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Desktop: show 3 at once */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.article
                key={t.name + i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="card-testimonial"
              >
                <StarRating rating={t.rating} />
                <blockquote className="font-sans text-[0.9375rem] text-cream/80 leading-relaxed mb-8">
                  "{t.quote}"
                </blockquote>
                <footer>
                  <p className="font-sans font-semibold text-sm text-cream">{t.name}</p>
                  <p className="font-sans text-xs text-cream/40 mt-1">{t.location}</p>
                  <span className="inline-block mt-3 px-2.5 py-1 bg-white/10 rounded-full font-sans text-[10px] text-cream/50 tracking-wide uppercase">
                    {t.service}
                  </span>
                </footer>
              </motion.article>
            ))}
          </div>

          {/* Mobile: carousel */}
          <div className="lg:hidden">
            <div className="relative overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.article
                  key={current}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="card-testimonial"
                >
                  <StarRating rating={testimonials[current].rating} />
                  <blockquote className="font-sans text-base text-cream/80 leading-relaxed mb-8">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <footer>
                    <p className="font-sans font-semibold text-sm text-cream">{testimonials[current].name}</p>
                    <p className="font-sans text-xs text-cream/40 mt-1">{testimonials[current].location}</p>
                    <span className="inline-block mt-3 px-2.5 py-1 bg-white/10 rounded-full font-sans text-[10px] text-cream/50 tracking-wide uppercase">
                      {testimonials[current].service}
                    </span>
                  </footer>
                </motion.article>
              </AnimatePresence>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      i === current ? 'bg-gold w-6' : 'bg-white/20'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-cream
                             hover:border-gold hover:text-gold transition-colors duration-150 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-sm text-cream
                             hover:border-gold hover:text-gold transition-colors duration-150 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
