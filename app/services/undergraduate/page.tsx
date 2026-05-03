import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Undergraduate Writing Tutoring | College-Level Writing Support',
  description: 'College-level writing tutoring for undergraduates. Research papers, lab reports, literary analysis, thesis chapters — expert human support. From $110/hr.',
}

export default function UndergraduatePage() {
  return (
    <ServicePageTemplate
      label="HIGHER EDUCATION"
      headline="College Writing Expects More. We'll Get You There."
      subhead="College professors grade differently than high school teachers. We close the gap — teaching you not just how to write correctly, but how to write at the level your institution expects."
      bookSlug="undergrad"
      features={[
        { title: 'Research Papers', body: 'Source integration, citation (MLA, APA, Chicago), argument construction, and the voice that distinguishes a B paper from an A.' },
        { title: 'Literary & Textual Analysis', body: 'Close reading, theoretical frameworks, and the kind of thesis that actually makes an argument — not just a description of the text.' },
        { title: 'Lab Reports & Scientific Writing', body: 'Abstract, introduction, methods, results, discussion — written with the precision and format your discipline requires.' },
        { title: 'Thesis Chapters', body: 'Undergraduate thesis support from outline through final chapter. We work with students across disciplines and departments.' },
        { title: 'Discipline-Specific Writing', body: 'History, social sciences, humanities, STEM — every discipline has its own writing conventions. We know them.' },
        { title: 'General Essay Improvement', body: 'Bring us any essay. We\'ll tell you what\'s strong, what\'s weak, and what to do about it — with specific, actionable feedback.' },
      ]}
      pricing={[
        { label: 'Undergraduate Tutoring (60 min)', price: 'From $110/hr' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
    />
  )
}
