import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Scientific Presentations & Writing | The Writer\'s Mark',
  description: 'Expert scientific writing and presentation consulting. Poster sessions, conference talks, grant narratives, and academic writing for scientists. From $120/hr.',
}

export default function ScientificPresentationsPage() {
  return (
    <ServicePageTemplate
      label="PROFESSIONAL & ACADEMIC"
      headline="Science Is Only As Powerful As Its Communication."
      subhead="Your research is rigorous. Your writing should match. We help scientists and academics present their work with the clarity, structure, and precision that the scientific community — and funding bodies — expect."
      bookSlug="scientific"
      features={[
        { title: 'Conference Poster Sessions', body: 'Layout narrative, visual hierarchy guidance, abstract writing, and the key question every poster reader asks: "So what?" We make sure your poster answers it clearly.' },
        { title: 'Conference & Symposium Talks', body: 'Presentation structure, slide narrative, transition language, and the flow that keeps a specialized audience engaged. We work on the words — you bring the science.' },
        { title: 'Grant Narratives', body: 'Specific aims, significance, approach, and innovation — written with the rhetorical clarity that grant reviewers need to say yes. NSF, NIH, and EPA-format experience.' },
        { title: 'Journal Article Writing', body: 'Abstract, introduction, discussion, and conclusion sections. We help you present findings in the voice your target journal expects.' },
        { title: 'Dissertation Chapters', body: 'Literature review, methodology, results discussion — written with the precision and hedged language that academic review demands.' },
        { title: 'Environmental & Technical Reports', body: 'NJDEP filings, impact assessments, and technical documentation — 30+ years of expertise in environmental consulting writing.' },
      ]}
      pricing={[
        { label: 'Scientific Writing Consulting (60 min)', price: 'From $120/hr' },
        { label: 'Grant Narrative Review', price: 'Project rate (quoted)' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
    />
  )
}
