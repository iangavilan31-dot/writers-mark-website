import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Professional Writing Consulting | Business Writing Experts',
  description: 'Expert business writing consulting for proposals, reports, executive communications, and content strategy. Fully human, no AI. NJ & nationwide. From $120/hr.',
}

export default function ProfessionalWritingPage() {
  return (
    <ServicePageTemplate
      label="PROFESSIONAL SERVICES"
      headline="Your Writing Represents Your Organization. Make It Count."
      subhead="Poorly written proposals lose contracts. Weak executive communications erode credibility. We work with professionals and organizations to ensure their writing is as capable as they are."
      bookSlug="professional-writing"
      badge="No AI · Human Expertise · NJ & Nationwide"
      features={[
        { title: 'Business Proposals & RFP Responses', body: 'We help you win. Proposal writing is a distinct skill — we know how to structure an argument, build a narrative arc, and write to the evaluator\'s rubric.' },
        { title: 'Executive Communications', body: 'Board presentations, shareholder letters, staff memos, internal announcements — the writing that sets the tone for your entire organization.' },
        { title: 'Reports & White Papers', body: 'Technical and analytical writing that\'s rigorous but readable. We translate complexity into clarity without losing substance.' },
        { title: 'Environmental & Technical Reports', body: 'NJDEP filings, environmental assessments, impact statements. We have specific expertise in environmental consulting documentation from 30+ years of practice.' },
        { title: 'Website Copy & Content Strategy', body: 'Not generic content — strategic copy that converts. We write for your voice, your audience, and your business goals.' },
        { title: 'Editing & Proofreading', body: 'Send us your draft. We return it stronger — not just corrected, but improved. We don\'t just fix errors; we sharpen arguments and clarify structure.' },
      ]}
      pricing={[
        { label: 'Writing Consulting (60 min)', price: 'From $120/hr' },
        { label: 'Editing & Proofreading', price: 'From $80–$150/hr' },
        { label: 'Proposal Writing', price: 'Project rate (quoted)' },
        { label: 'Website Copy', price: 'Project rate (quoted)' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
    />
  )
}
