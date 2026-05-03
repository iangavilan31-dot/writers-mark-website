import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'ELA Prep | English Language Arts Instruction',
  description: 'Expert ELA prep for state assessments, school exams, and reading/writing proficiency. Grades 3–12, fully human, no AI. From $100/hr.',
}

export default function ELAPrepPage() {
  return (
    <ServicePageTemplate
      label="ACADEMIC SERVICES"
      headline="English Language Arts Done Right."
      subhead="Deep ELA instruction that builds real skills: reading analysis, argument construction, grammar mastery, and the kind of writing that scores at the top — not just test tricks."
      bookSlug="ela-prep"
      features={[
        { title: 'Reading Comprehension & Analysis', body: 'We train students to read closely — to identify arguments, trace themes, analyze language, and draw evidence-based conclusions. The foundation of every ELA exam.' },
        { title: 'Essay Writing & Argumentation', body: 'Thesis construction, evidence selection, paragraph organization, transitions, and conclusions. Structure and thinking taught simultaneously.' },
        { title: 'Grammar & Style', body: 'Not just the rules — the why behind them. Students learn to identify and correct their own patterns, not just pass a grammar worksheet.' },
        { title: 'Literary Analysis', body: 'Short stories, novels, poetry, and nonfiction. We help students develop the analytical vocabulary they need to write about literature precisely.' },
        { title: 'NJSLA & State Test Prep', body: 'NJSLA, AP English, Regents, MCAS, and other state assessments. We know these tests and prepare students for exactly what\'s on them.' },
        { title: 'Vocabulary in Context', body: 'Building the word knowledge that strengthens both reading comprehension and written expression — in ways that actually stick.' },
      ]}
      pricing={[
        { label: 'ELA Prep (60 min)', price: 'From $100/hr' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
    />
  )
}
