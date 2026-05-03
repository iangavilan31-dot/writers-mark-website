import Link from 'next/link'
import { CTABlock } from '@/components/sections/CTABlock'
import { ArrowRight } from 'lucide-react'

interface ServicePageProps {
  label: string
  headline: string
  subhead: string
  bookSlug: string
  badge?: string
  features: { title: string; body: string }[]
  pricing: { label: string; price: string }[]
  faq?: { q: string; a: string }[]
  taxNote?: boolean
}

export function ServicePageTemplate({
  label,
  headline,
  subhead,
  bookSlug,
  badge,
  features,
  pricing,
  faq,
  taxNote = true,
}: ServicePageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <p className="section-label text-gold mb-6">{label}</p>
          <h1 className="heading-display text-cream mb-6 text-balance">{headline}</h1>
          <p className="font-sans text-cream/60 max-w-2xl mb-10" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            {subhead}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={`/book?service=${bookSlug}`} className="btn-primary py-5 px-10 text-base justify-center sm:justify-start">
              Book a Session <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/consult" className="btn-secondary-light py-5 px-10 text-base justify-center sm:justify-start">
              Free Consultation
            </Link>
          </div>
          {badge && (
            <p className="font-sans text-xs text-cream/30 mt-5">{badge}</p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="max-w-prose mb-14">
            <p className="section-label mb-4">WHAT WE COVER</p>
            <h2 className="heading-xl text-ink heading-accented">In Every Session</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-border rounded-lg p-7">
                <span className="gold-bar" aria-hidden="true" />
                <h3 className="heading-md text-ink mb-3">{f.title}</h3>
                <p className="body-lg text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding-sm bg-cream-dark/40">
        <div className="container-content max-w-2xl">
          <p className="section-label mb-6">PRICING</p>
          <div className="bg-white border border-border rounded-lg overflow-hidden">
            {pricing.map((row, i) => (
              <div key={row.label} className={`flex items-center justify-between px-7 py-5 ${i < pricing.length - 1 ? 'border-b border-border' : ''}`}>
                <span className="font-sans font-medium text-sm text-ink">{row.label}</span>
                <span className="font-sans font-bold text-sm text-ink">{row.price}</span>
              </div>
            ))}
          </div>
          {taxNote && (
            <p className="font-sans text-xs text-muted mt-4">
              NJ Sales Tax (6.625%) and CC processing fee (~3%) applied at checkout.
              Cancellations require 24 hours notice.
            </p>
          )}
          <div className="mt-6 flex gap-4">
            <Link href={`/book?service=${bookSlug}`} className="btn-primary flex-1 justify-center">
              Book a Session →
            </Link>
            <Link href="/consult" className="btn-secondary flex-1 justify-center">
              Free Consult
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="container-content max-w-2xl">
            <p className="section-label mb-8">COMMON QUESTIONS</p>
            <div className="space-y-6">
              {faq.map((item) => (
                <div key={item.q} className="border-b border-border pb-6">
                  <h3 className="font-sans font-semibold text-sm text-ink mb-2">{item.q}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABlock
        heading="Ready to Get Started?"
        body="Book your first session online in minutes — or start with a free 30-minute consultation."
        primaryLabel="Book a Session"
        primaryHref={`/book?service=${bookSlug}`}
        secondaryLabel="Free Consultation"
        secondaryHref="/consult"
        variant="gold"
      />
    </>
  )
}
