import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

// This page is shown after successful Stripe payment
// Stripe redirects here with ?session_id=...&service=...

function ThankYouContent() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 pt-20">
      <div className="max-w-2xl w-full text-center">
        {/* Check icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <CheckCircle size={36} className="text-gold" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif font-bold text-cream mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          You're Booked.
        </h1>
        <p className="font-sans text-cream/60 text-lg mb-10">
          Thank you for booking with The Writer's Mark. We're looking forward to working with you.
        </p>

        {/* What to expect */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8 text-left">
          <h2 className="font-serif font-semibold text-gold text-xl mb-6">Check Your Email For:</h2>
          <div className="space-y-4">
            {[
              {
                icon: '✓',
                label: 'Booking Confirmation',
                desc: 'Full session details, payment summary, and invoice.',
              },
              {
                icon: '✓',
                label: 'Client Agreement',
                desc: 'A Dropbox Sign email with your service agreement to sign digitally.',
              },
              {
                icon: '✓',
                label: 'Calendar Invite',
                desc: 'Google Calendar event with video link for your session.',
              },
              {
                icon: '✓',
                label: 'Receipt from Stripe',
                desc: 'Official payment receipt with itemized breakdown.',
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <span className="text-gold font-bold mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-sans font-semibold text-sm text-cream">{item.label}</p>
                  <p className="font-sans text-xs text-cream/50 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/book" className="btn-primary justify-center py-4">
            Book Another Session
          </Link>
          <Link href="/" className="btn-secondary-light justify-center py-4">
            Return Home
          </Link>
        </div>

        {/* Cancellation reminder */}
        <p className="font-sans text-xs text-cream/30 mt-8">
          Reminder: sessions must be cancelled at least 24 hours in advance. Reply to your confirmation email to reschedule.
        </p>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  )
}
