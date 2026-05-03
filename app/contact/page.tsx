'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'

const subjects = [
  'General Question',
  'Pricing Inquiry',
  'Session Booking Help',
  'Partnership / School',
  'Press',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        toast.success('Message sent! We\'ll respond within one business day.')
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <p className="section-label text-gold mb-6">GET IN TOUCH</p>
          <h1 className="heading-display text-cream mb-6">We'd Love to Hear From You.</h1>
          <p className="font-sans text-cream/60 max-w-xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            Whether you have a question, want to discuss a project, or aren't sure where to start —
            send us a message. We respond within one business day.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Quick options */}
            <div className="space-y-6">
              <div>
                <p className="section-label text-[10px] mb-6">FASTEST OPTIONS</p>
                <div className="space-y-4">
                  <Link href="/book" className="flex items-center justify-between p-5 bg-white border border-border rounded-lg hover:border-gold transition-colors cursor-pointer group">
                    <div>
                      <p className="font-sans font-semibold text-sm text-ink">Book a Session</p>
                      <p className="font-sans text-xs text-muted mt-0.5">Pay and schedule online</p>
                    </div>
                    <ArrowRight size={16} className="text-muted group-hover:text-gold transition-colors" />
                  </Link>
                  <Link href="/consult" className="flex items-center justify-between p-5 bg-white border border-border rounded-lg hover:border-gold transition-colors cursor-pointer group">
                    <div>
                      <p className="font-sans font-semibold text-sm text-ink">Free Consultation</p>
                      <p className="font-sans text-xs text-muted mt-0.5">30 min, no charge</p>
                    </div>
                    <ArrowRight size={16} className="text-muted group-hover:text-gold transition-colors" />
                  </Link>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="section-label text-[10px] mb-4">DIRECT</p>
                <a
                  href="tel:+12012706975"
                  className="font-sans font-semibold text-ink hover:text-gold transition-colors cursor-pointer block mb-2"
                >
                  (201) 270-6975
                </a>
                <a
                  href="mailto:jcavera@thewritersmark.us"
                  className="font-sans text-sm text-muted hover:text-ink transition-colors cursor-pointer block"
                >
                  jcavera@thewritersmark.us
                </a>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="section-label text-[10px] mb-3">WHERE WE WORK</p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Primarily remote via secure video session. In-person available in New Jersey upon request.
                </p>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="section-label text-[10px] mb-3">RESPONSE TIME</p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Within one business day. During peak seasons (Aug–Oct, Jan–Apr) allow up to 2 business days.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="bg-white border border-border rounded-lg p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl" aria-hidden="true">✓</span>
                  </div>
                  <h2 className="heading-md text-ink mb-3">Message Sent</h2>
                  <p className="body-lg text-sm">We've received your message and will respond within one business day.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="btn-secondary mt-8 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-8 space-y-5" noValidate>
                  <h2 className="heading-md text-ink mb-2">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="name">Full Name <span className="text-gold">*</span></label>
                      <input id="name" type="text" className="form-input" required autoComplete="name"
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="email">Email <span className="text-gold">*</span></label>
                      <input id="email" type="email" className="form-input" required autoComplete="email"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="phone">Phone (optional)</label>
                      <input id="phone" type="tel" className="form-input" autoComplete="tel"
                        value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="subject">What's this about? <span className="text-gold">*</span></label>
                      <select id="subject" className="form-input cursor-pointer" required
                        value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                        <option value="">Select...</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label" htmlFor="message">Message <span className="text-gold">*</span></label>
                    <textarea id="message" className="form-input resize-none" rows={5} required minLength={20}
                      placeholder="How can we help?"
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !form.name || !form.email || !form.subject || !form.message}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
