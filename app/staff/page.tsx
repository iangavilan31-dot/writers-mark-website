import type { Metadata } from 'next'
import { CTABlock } from '@/components/sections/CTABlock'

export const metadata: Metadata = {
  title: 'Meet the Staff | Expert Writing Tutors & Consultants',
  description: 'Meet the team at The Writer\'s Mark — experienced writing tutors, test prep specialists, and professional writing consultants serving students and professionals nationwide.',
}

// Placeholder staff — replaced by Sanity CMS data once Joseph sends headshots/bios
const placeholderStaff = [
  {
    name: 'Joseph Cavera',
    title: 'Owner & Managing Consultant',
    credentials: 'Founder, The Writer\'s Mark, LLC · Est. 1993',
    specialties: ['Professional Writing', 'College Admissions', 'DSAT Prep', 'ELA Prep'],
    bio: 'Joseph founded The Writer\'s Mark in 1993 and has spent over three decades helping students and professionals find their voice. He brings expertise across academic tutoring, standardized test preparation, college admissions coaching, and professional writing consulting to every client engagement.',
  },
]

export default function StaffPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <p className="section-label text-gold mb-6">THE TEAM</p>
          <h1 className="heading-display text-cream mb-6">
            Expert Instructors.<br />Real Experience. No AI.
          </h1>
          <p className="font-sans text-cream/60 max-w-2xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            Every member of our team is a credentialed writing professional — not a student worker,
            not a gig-economy tutor. When you work with The Writer's Mark, you work with someone
            who has mastered what they teach.
          </p>
        </div>
      </section>

      {/* Staff grid */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {placeholderStaff.map((member) => (
              <article key={member.name} className="flex flex-col">
                {/* Photo placeholder — replaced with Sanity image */}
                <div className="w-full aspect-square bg-cream-dark rounded-lg mb-6 flex items-center justify-center border border-border overflow-hidden">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-navy/10 mx-auto mb-3 flex items-center justify-center">
                      <span className="font-serif font-bold text-2xl text-navy/40">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-muted">Photo coming soon</p>
                  </div>
                </div>

                {/* Info */}
                <div className="gold-bar" aria-hidden="true" />
                <h2 className="heading-md text-ink mb-1">{member.name}</h2>
                <p className="section-label text-[10px] text-gold mb-3">{member.title}</p>
                <p className="font-sans text-xs text-muted mb-4">{member.credentials}</p>

                {/* Specialty tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {member.specialties.map((s) => (
                    <span key={s} className="px-2.5 py-1 bg-cream-dark border border-border rounded-full font-sans text-[10px] font-medium text-ink">
                      {s}
                    </span>
                  ))}
                </div>

                <p className="body-lg text-sm leading-relaxed">{member.bio}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 bg-cream-dark border border-border rounded-lg text-center max-w-2xl mx-auto">
            <p className="section-label text-[10px] mb-3">OUR STANDARD</p>
            <h3 className="heading-md text-ink mb-4">Who We Are (and Who We're Not)</h3>
            <p className="body-lg text-sm">
              We are not a tutoring marketplace. We don't have a roster of hundreds of contractors
              with spotty availability. Every person on our team is carefully selected and committed
              to the same standard of quality. When you book with The Writer's Mark, you get someone
              who has seen your exact challenge before — and knows how to solve it.
            </p>
          </div>
        </div>
      </section>

      <CTABlock
        heading="Ready to Get Started?"
        body="Book a session or start with a free 30-minute consultation."
        primaryLabel="Book a Session"
        primaryHref="/book"
        secondaryLabel="Free Consultation"
        secondaryHref="/consult"
        variant="navy"
      />
    </>
  )
}
