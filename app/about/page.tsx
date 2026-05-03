import type { Metadata } from 'next'
import Link from 'next/link'
import { CTABlock } from '@/components/sections/CTABlock'

export const metadata: Metadata = {
  title: 'About Us | 30+ Years of Expert Writing Instruction',
  description: 'Founded in 1993, The Writer\'s Mark has helped students and professionals find their voice and sharpen their craft. Meet the team behind the work.',
}

const values = [
  {
    number: '01',
    heading: 'Human First',
    body: 'Writing is one of the most intimate things a person can do. We take that seriously. Every session is one-on-one, every strategy is personalized, and every word you write is yours. We don\'t outsource. We don\'t automate. We don\'t use AI.',
  },
  {
    number: '02',
    heading: 'Honest Assessment',
    body: 'We\'ll tell you what\'s working and what isn\'t. If a piece needs significant work, we say so. If a student needs a different approach, we\'ll find it. We\'d rather give you a straight answer than an easy one.',
  },
  {
    number: '03',
    heading: 'Every Level, Every Goal',
    body: 'There is no writing challenge too small or too complex for our team. We meet you where you are — then help you get further than you thought possible.',
  },
  {
    number: '04',
    heading: 'Your Voice, Amplified',
    body: 'We are editors, coaches, and strategists — not ghostwriters. Our job is to help you say what you mean, the way you mean it, in the strongest possible form.',
  },
]

const stats = [
  { value: '30+', label: 'Years in Practice' },
  { value: '100%', label: 'Human — No AI' },
  { value: '1st→PhD', label: 'Grade Levels Served' },
  { value: 'NJ', label: 'Based, Serving Nationwide' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <p className="section-label text-gold mb-6">OUR STORY</p>
          <h1 className="heading-display text-cream mb-6">
            Thirty Years of Getting It Right.
          </h1>
          <p className="font-sans text-cream/60 max-w-2xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            What began in 1993 as JTC & Associates is now The Writer's Mark — the same
            dedication to craft, the same commitment to the humans behind every word.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="bg-navy border-t border-white/10">
        <div className="container-content py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="font-serif font-bold text-gold" style={{ fontSize: '2rem' }}>{stat.value}</p>
                <p className="font-sans text-xs text-cream/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Origin */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="section-label mb-4">WHERE WE CAME FROM</p>
              <h2 className="heading-xl text-ink mb-6 heading-accented">
                Founded in 1993.
              </h2>
              <div className="space-y-5 body-lg">
                <p>
                  Our practice was built on a simple conviction: writing is a skill, not a talent —
                  and every student, professional, and thinker deserves to express themselves with
                  clarity and confidence.
                </p>
                <p>
                  For over three decades, we've worked one-on-one with students from first grade
                  through doctoral programs, and with professionals ranging from environmental
                  consultants to C-suite executives.
                </p>
                <p>
                  In 2024, we rebranded as The Writer's Mark to reflect both the depth of our
                  service offerings and the mark that good writing leaves on everything it touches.
                  We are based in New Jersey and serve clients nationwide through secure,
                  flexible remote sessions.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="bg-navy rounded-lg p-10">
              <span className="font-serif text-gold/30 leading-none select-none" style={{ fontSize: '6rem', lineHeight: 0.8 }} aria-hidden="true">"</span>
              <p className="font-serif text-cream text-xl leading-relaxed mt-4">
                Writing is a skill, not a talent. Every student and professional deserves to
                express themselves with clarity and confidence.
              </p>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-sans font-semibold text-sm text-cream">Joseph Cavera</p>
                <p className="font-sans text-xs text-cream/40 mt-1">Owner & Managing Consultant, The Writer's Mark, LLC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-dark/40">
        <div className="container-content">
          <div className="max-w-prose mb-16">
            <p className="section-label mb-4">WHAT WE BELIEVE</p>
            <h2 className="heading-xl text-ink heading-accented">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.number} className="bg-white border border-border rounded-lg p-8">
                <span className="font-serif font-bold text-ink/10 text-6xl leading-none select-none" aria-hidden="true">{v.number}</span>
                <h3 className="heading-md text-ink mt-4 mb-3">{v.heading}</h3>
                <p className="body-lg text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        heading="Ready to Work Together?"
        body="Start with a free 30-minute consultation — no commitment, no pressure, just a real conversation about your goals."
        primaryLabel="Schedule Free Consultation"
        primaryHref="/consult"
        secondaryLabel="Meet the Team"
        secondaryHref="/staff"
        variant="gold"
      />
    </>
  )
}
