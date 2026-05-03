import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'K–12 Writing Tutoring | Expert One-on-One Writing Instruction',
  description: 'One-on-one writing tutoring for grades 1–12. Reading comprehension, grammar, essay writing, and homework help from expert human tutors. From $100/hr.',
}

export default function TutoringPage() {
  return (
    <ServicePageTemplate
      label="ACADEMIC SERVICES"
      headline="Your Child Can Write. We'll Prove It."
      subhead="Personalized, one-on-one writing instruction for students in grades 1 through 12 — built around how your child actually learns, not a one-size-fits-all curriculum."
      bookSlug="tutoring-912"
      badge="100% Human · No AI · Remote & In-Person NJ Available"
      features={[
        { title: 'Reading Comprehension', body: 'We don\'t just teach kids to read — we teach them to understand, analyze, and discuss what they read. Critical thinking woven into every session.' },
        { title: 'Grammar & Mechanics', body: 'Sentence structure, punctuation, verb agreement, and the fundamentals that make everything else possible. Taught in context — not drilled in isolation.' },
        { title: 'Essay Structure & Development', body: 'The five-paragraph essay is a starting point, not the destination. We teach students how to build arguments, develop ideas, and write with purpose.' },
        { title: 'Homework Support', body: 'Stuck on an assignment? We work through it together — building skills, not just completing tasks. We explain the why, not just the what.' },
        { title: 'State Test Prep', body: 'NJ state assessments, standardized reading tests, and school-specific writing requirements — we know the formats and how to prepare for them.' },
        { title: 'Literary Analysis', body: 'Short stories, novels, poetry, and nonfiction — we help students develop the analytical vocabulary they need to write about literature precisely.' },
      ]}
      pricing={[
        { label: 'K–5 Tutoring (60 min)', price: 'From $100/hr' },
        { label: '6–8 Tutoring (60 min)', price: 'From $110/hr' },
        { label: '9–12 Tutoring (60 min)', price: 'From $120/hr' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
      faq={[
        { q: 'What grade levels do you work with?', a: 'Grades 1 through 12, across all subjects that require writing. We adapt our approach significantly for each stage.' },
        { q: 'Do you work in-person?', a: 'Primarily remote via secure video session. In-person available in New Jersey upon request.' },
        { q: 'Do you use AI tools?', a: 'No. Every session, every revision, every suggestion comes from a human expert. We have a strict no-AI policy.' },
        { q: 'How many sessions does my child need?', a: 'That depends on their goals and starting point — which is exactly what the free consultation is for.' },
      ]}
    />
  )
}
