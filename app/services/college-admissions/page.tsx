import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'College Admissions Essay Coaching | Personal Statement Experts',
  description: 'Expert college admissions essay coaching — personal statements, supplementals, activity descriptions, and application strategy. Human, honest, effective. From $100/hr.',
}

export default function CollegeAdmissionsPage() {
  return (
    <ServicePageTemplate
      label="COLLEGE ADMISSIONS"
      headline="The College Essay Isn't About Your Grades. It's About You."
      subhead="Most college essays fail for the same reason: they try to impress instead of connect. We help students find the story only they can tell — and tell it in a way admissions officers actually remember."
      bookSlug="college-admissions"
      badge="100% Human · Your Voice, Amplified · No AI · No Ghostwriting"
      features={[
        { title: 'Common App Personal Statement', body: '650 words. The most important essay you\'ve written. We guide you through topic selection, drafting, revision, and final polish — keeping your voice intact throughout.' },
        { title: 'Supplemental Essays', body: '"Why us?" essays, short-answer responses, additional writing samples. Many applications require 3–8 additional essays. We work through every one.' },
        { title: 'Activity Descriptions & Short Answers', body: '150-character activity descriptions that say more than they appear to. We know how to use the character limits strategically.' },
        { title: 'Application Strategy', body: 'Which schools to apply to, how to position your application narrative, how to decide what to write about — honest strategic guidance, not a pitch.' },
        { title: 'Scholarship Essays', body: 'Separate scholarship applications require separate essays. We treat each one with the same rigor as the main application.' },
        { title: 'Graduate School Applications', body: 'Statements of purpose, personal histories, writing samples — graduate admissions requires a different register than undergrad. We know the difference.' },
      ]}
      pricing={[
        { label: 'Admissions Coaching (60 min)', price: 'From $100/hr' },
        { label: 'Personal Statement Package', price: 'Custom quote' },
        { label: 'Full Application Package', price: 'Custom quote' },
        { label: 'Free Consultation (30 min)', price: '$0' },
      ]}
      faq={[
        { q: 'Will you write my essay for me?', a: 'No. We coach, guide, and edit — but the words are always yours. Ghostwritten essays are a form of academic dishonesty that admissions officers can detect. We don\'t do it.' },
        { q: 'Do you use AI to help write or edit?', a: 'Never. AI-generated college essays are detectable and can result in application rejection. Every suggestion we make is human.' },
        { q: 'When should we start?', a: 'Ideally summer before senior year. We can work with students as early as sophomore year for strategic planning and as late as November for regular decision deadlines.' },
      ]}
    />
  )
}
