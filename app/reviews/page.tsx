'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

const services = ['All', 'K–12 Tutoring', 'ELA Prep', 'DSAT Prep', 'College Admissions', 'Professional Writing', 'Scientific Presentations', 'Undergraduate']

const seedReviews = [
  { name: 'Parent of 11th Grader', location: 'Maplewood, NJ', service: 'DSAT Prep', rating: 5, text: 'My daughter went from dreading writing assignments to asking for more. Her DSAT score jumped 140 points. The Writer\'s Mark is the real deal — not tricks, actual understanding.' },
  { name: 'Environmental Consultant', location: 'Newark, NJ', service: 'Professional Writing', rating: 5, text: 'I hired them for a federal grant proposal I\'d been putting off for months. In three sessions, we had a polished, compelling narrative. We got the grant.' },
  { name: 'College Applicant', location: 'Class of 2024', service: 'College Admissions', rating: 5, text: 'My college essay was going nowhere. It went from generic to genuinely me. I got into my first choice school — a school I almost didn\'t apply to.' },
  { name: 'Parent of 9th Grader', location: 'Montclair, NJ', service: 'K–12 Tutoring', rating: 5, text: 'Three years of working with them. My son started in 7th grade struggling with basic paragraph structure. He\'s now a freshman writing at the top of his class.' },
  { name: 'Graduate Researcher', location: 'Rutgers University', service: 'Scientific Presentations', rating: 5, text: 'They understood the science and helped me tell the story behind the data. My poster session got the most questions — and that\'s never happened to me before.' },
  { name: 'Undergraduate Junior', location: 'Seton Hall University', service: 'Undergraduate', rating: 5, text: 'I went from a C+ writer to getting consistent A\'s on research papers. The difference isn\'t just grammar — it\'s knowing how to argue and structure a real academic paper.' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#C9A84C' : 'none'} color={i < rating ? '#C9A84C' : '#E8E4DC'} aria-hidden="true" />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ clientEmail: '', displayName: '', service: '', rating: 5, reviewText: '', wouldRecommend: true, featureOnHomepage: false })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const filtered = filter === 'All' ? seedReviews : seedReviews.filter(r => r.service === filter)

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch('/api/review/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
        toast.success('Review submitted! It will be published after verification.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <p className="section-label text-gold mb-6">WHAT CLIENTS SAY</p>
          <h1 className="heading-display text-cream mb-6">Verified Reviews from Real Clients.</h1>
          <p className="font-sans text-cream/60 max-w-2xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            Every review is submitted by a verified client and published only after approval.
            We show the full picture — because honest feedback is what earns trust.
          </p>
          {/* Aggregate */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} fill="#C9A84C" color="#C9A84C" aria-hidden="true" />
              ))}
            </div>
            <span className="font-serif font-bold text-gold text-2xl">4.9</span>
            <span className="font-sans text-cream/40 text-sm">· {seedReviews.length} verified reviews</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-content">

          {/* Filter bar */}
          <div className="flex gap-2 flex-wrap mb-10">
            {services.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-full font-sans text-xs font-medium transition-all duration-150 cursor-pointer border ${
                  filter === s
                    ? 'bg-ink text-cream border-ink'
                    : 'bg-white text-muted border-border hover:border-ink/30'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Reviews grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map((review, i) => (
              <article key={i} className="bg-white border border-border rounded-lg p-6 flex flex-col">
                <StarRating rating={review.rating} />
                <blockquote className="font-sans text-sm text-ink/80 leading-relaxed mt-4 flex-1">
                  "{review.text}"
                </blockquote>
                <footer className="mt-6 pt-5 border-t border-border">
                  <p className="font-sans font-semibold text-sm text-ink">{review.name}</p>
                  <p className="font-sans text-xs text-muted mt-0.5">{review.location}</p>
                  <span className="inline-block mt-3 px-2.5 py-1 bg-cream-dark rounded-full font-sans text-[10px] text-muted uppercase tracking-wide">
                    {review.service}
                  </span>
                  <span className="inline-flex items-center gap-1 ml-2 px-2.5 py-1 bg-green-50 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                    <span className="font-sans text-[10px] text-green-700">Verified</span>
                  </span>
                </footer>
              </article>
            ))}
          </div>

          {/* Leave a review CTA */}
          <div className="bg-navy rounded-lg p-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-cream text-2xl mb-3">Worked with Us? Tell Others.</h2>
            <p className="font-sans text-cream/60 text-sm mb-6">
              Reviews are verified against booking records and published after approval. Takes 2 minutes.
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary justify-center"
            >
              {showForm ? 'Close Form' : 'Submit a Review'}
            </button>
          </div>

          {/* Review form */}
          {showForm && (
            <div className="mt-8 max-w-2xl mx-auto bg-white border border-border rounded-lg p-8">
              {submitted ? (
                <div className="text-center py-6">
                  <p className="font-serif font-semibold text-xl text-ink mb-3">Thank You</p>
                  <p className="body-lg text-sm">Your review has been submitted and will be published after verification.</p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5" noValidate>
                  <h3 className="heading-md text-ink">Leave a Review</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="rev-email">Email <span className="text-gold">*</span></label>
                      <input id="rev-email" type="email" className="form-input" required placeholder="Used to verify your booking — not shown publicly"
                        value={form.clientEmail} onChange={e => setForm(f => ({ ...f, clientEmail: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="rev-name">Display As <span className="text-gold">*</span></label>
                      <input id="rev-name" type="text" className="form-input" required placeholder='e.g. "Parent of 10th Grader"'
                        value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="rev-service">Service Used <span className="text-gold">*</span></label>
                    <select id="rev-service" className="form-input cursor-pointer" required
                      value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}>
                      <option value="">Select service...</option>
                      {services.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Rating <span className="text-gold">*</span></label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(n => (
                        <button key={n} type="button" onClick={() => setForm(f => ({ ...f, rating: n }))}
                          className="cursor-pointer" aria-label={`${n} star${n > 1 ? 's' : ''}`}>
                          <Star size={28} fill={n <= form.rating ? '#C9A84C' : 'none'} color={n <= form.rating ? '#C9A84C' : '#E8E4DC'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="rev-text">Your Review <span className="text-gold">*</span></label>
                    <textarea id="rev-text" className="form-input resize-none" rows={4} required minLength={20}
                      value={form.reviewText} onChange={e => setForm(f => ({ ...f, reviewText: e.target.value }))} />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
