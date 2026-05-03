import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'DSAT Prep & Competitive Essay Writing | The Writer\'s Mark',
  description: 'Expert Digital SAT prep and competitive essay coaching. Strategy, timing, and subject mastery. Serving NJ and nationwide. From $120/hr.',
}

export default function DSATPage() {
  return (
    <ServicePageTemplate
      label="TEST PREP & COMPETITION"
      headline="Score Higher. Write Better. Win More."
      subhead="The Digital SAT is a different test than what came before — and most tutors are still teaching the old one. We prepare students for the actual exam, and for the essay competitions where real academic reputations are built."
      bookSlug="dsat-prep"
      badge="Digital SAT Specialists · Human Instruction Only · No AI"
      features={[
        { title: 'Reading & Writing Module', body: 'Vocabulary in context, craft and structure analysis, cross-text connections, rhetorical synthesis, command of evidence — every question type, every skill.' },
        { title: 'Math Module', body: 'Algebra, advanced algebra, problem-solving, data analysis, geometry, and trig. Plus adaptive module strategy — understanding how Module 2 difficulty is set by Module 1 performance.' },
        { title: 'Full Test Strategy', body: 'Pacing, Bluebook platform fluency, elimination strategy, mental stamina for the full exam. We train for the actual testing environment.' },
        { title: 'Scholastic Art & Writing Awards', body: 'America\'s largest recognition program for creative teens. We coach argument development, originality, and narrative structure.' },
        { title: 'National History Day & Academic Competitions', body: 'Research papers and documentaries requiring strong historical argumentation, citation, and scholarly voice.' },
        { title: 'Science & Philosophy Competitions', body: 'Competitions tied to academic research programs — we work on the writing, argument construction, and rubric alignment.' },
      ]}
      pricing={[
        { label: 'DSAT Prep (60 min)', price: 'From $120/hr' },
        { label: 'Essay Competition Coaching (60 min)', price: 'From $120/hr' },
        { label: 'Full Package (10 sessions)', price: 'Custom quote' },
        { label: 'Free Score Analysis (30 min)', price: '$0' },
      ]}
      faq={[
        { q: 'How is the Digital SAT different from the old SAT?', a: 'The format, passage types, and math structure all changed. The Digital SAT uses adaptive modules — your Module 2 difficulty is determined by Module 1 performance. Most tutors are still teaching the old test.' },
        { q: 'How many sessions before I see improvement?', a: 'Most students see meaningful score movement within 5–8 sessions. Realistic goals depend on baseline score and availability — we discuss this in your free score analysis.' },
        { q: 'Do you guarantee a score increase?', a: 'We don\'t guarantee specific scores — no honest tutor does. We do guarantee expert preparation, a clear strategy, and the kind of practice that produces real improvement.' },
      ]}
    />
  )
}
