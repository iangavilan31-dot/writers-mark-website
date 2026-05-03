import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Differentiators } from '@/components/sections/Differentiators'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTABlock } from '@/components/sections/CTABlock'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Differentiators />
      <CTABlock
        heading="Not Sure Where to Start?"
        body="Book a free 30-minute consultation. We'll listen, assess, and tell you honestly whether we're the right fit — and what a realistic plan looks like. No pressure. No pitch. Just a conversation."
        primaryLabel="Schedule Free Consultation"
        primaryHref="/consult"
        secondaryLabel="Browse All Services"
        secondaryHref="/services"
        variant="gold"
      />
      <Testimonials />
      <CTABlock
        heading="Ready to Begin?"
        body="Book your first session online in minutes. Choose your service, pick your time, pay securely — and get a confirmation, invoice, and client agreement instantly."
        primaryLabel="Book a Session"
        primaryHref="/book"
        secondaryLabel="Learn About Our Team"
        secondaryHref="/staff"
        variant="navy"
      />
    </>
  )
}
