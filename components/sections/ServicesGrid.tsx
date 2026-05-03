'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    label: 'ACADEMIC',
    name: 'Tutoring (K–12)',
    href: '/services/tutoring',
    description: 'Reading, writing, grammar, and homework support for grades 1 through 12. Personalized to your child\'s pace, curriculum, and learning style.',
    price: 'From $100/hr',
    bookHref: '/book?service=tutoring',
  },
  {
    label: 'ACADEMIC',
    name: 'ELA Prep',
    href: '/services/ela-prep',
    description: 'Deep English Language Arts preparation — essay structure, literary analysis, reading comprehension, and grammar aligned to state standards.',
    price: 'From $100/hr',
    bookHref: '/book?service=ela-prep',
  },
  {
    label: 'TEST PREP',
    name: 'DSAT Prep & Competitive Essay Writing',
    href: '/services/dsat-prep',
    description: 'Raise your Digital SAT score and compete at the highest levels. Strategy, timing, subject mastery — and the essay chops to win competitions.',
    price: 'From $120/hr',
    bookHref: '/book?service=dsat-prep',
  },
  {
    label: 'HIGHER ED',
    name: 'Undergraduate Tutoring',
    href: '/services/undergraduate',
    description: 'College-level writing support across disciplines. Research papers, lab reports, literary analysis — the writing your professors actually expect.',
    price: 'From $110/hr',
    bookHref: '/book?service=undergrad',
  },
  {
    label: 'PROFESSIONAL',
    name: 'Scientific Presentations',
    href: '/services/scientific-presentations',
    description: 'Poster sessions, conference talks, grant narratives, and academic scientific writing — clarity and precision for the sciences.',
    price: 'From $120/hr',
    bookHref: '/book?service=scientific',
  },
  {
    label: 'PROFESSIONAL',
    name: 'Professional Writing Consulting',
    href: '/services/professional-writing',
    description: 'Business proposals, executive communications, reports, and content strategy. Writing that represents your organization at its best.',
    price: 'From $120/hr',
    bookHref: '/book?service=professional-writing',
  },
  {
    label: 'ADMISSIONS',
    name: 'College Admissions Prep',
    href: '/services/college-admissions',
    description: 'Personal statements, supplemental essays, activity descriptions, and application strategy — in your voice, amplified. Not ghostwritten.',
    price: 'From $100/hr',
    bookHref: '/book?service=college-admissions',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

function ServiceCard({ service }: { service: typeof services[number] }) {
  return (
    <motion.article
      variants={cardVariants}
      className="card-service group flex flex-col h-full"
    >
      <div className="flex-1">
        <p className="section-label text-[10px] text-gold mb-4">{service.label}</p>
        <span className="gold-bar" aria-hidden="true" />
        <h3 className="heading-md text-ink mb-4 group-hover:text-navy transition-colors duration-200">
          {service.name}
        </h3>
        <p className="body-lg text-sm leading-relaxed mb-6">{service.description}</p>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-border mt-auto">
        <span className="font-sans font-semibold text-sm text-ink">{service.price}</span>
        <Link
          href={service.href}
          className="btn-ghost text-sm flex items-center gap-1 group/link"
          aria-label={`Learn more about ${service.name}`}
        >
          <span>Learn More</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-150 group-hover/link:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  )
}

export function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding bg-cream-dark/30" aria-labelledby="services-heading">
      <div className="container-content">
        {/* Section header */}
        <div className="max-w-prose mb-16">
          <p className="section-label mb-4">WHAT WE DO</p>
          <h2
            id="services-heading"
            className="heading-xl text-ink mb-6 heading-accented"
          >
            Every Stage. Every Student. Every Deadline.
          </h2>
          <p className="body-lg">
            From first-graders learning to write their first sentence to PhD candidates polishing
            a dissertation — The Writer's Mark meets you where you are and gets you where you
            need to be.
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {services.map((service) => (
            <div key={service.href} role="listitem">
              <ServiceCard service={service} />
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-sans text-sm text-muted mb-4">
            Not sure which service fits?
          </p>
          <Link href="/consult" className="btn-secondary">
            Start with a Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
