import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Owner's Guide | The Writer's Mark",
  robots: { index: false, follow: false },
}

export default function OwnerGuidePage() {
  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-navy/10">
          <p className="section-label text-gold mb-3">OWNER&rsquo;S GUIDE</p>
          <h1 className="font-serif font-bold text-navy" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            The Writer&rsquo;s Mark — Owner&rsquo;s Guide
          </h1>
          <p className="font-sans text-muted mt-3 text-lg">
            Hi Joseph — plain-English walkthrough of everything. Bookmark this page.
          </p>
        </div>

        <div className="space-y-12 font-sans text-ink/80 leading-relaxed">

          {/* Section 1 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">1. The five URLs you&rsquo;ll actually use</h2>
            <div className="overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full text-sm">
                <thead className="bg-navy text-cream">
                  <tr>
                    <th className="text-left px-4 py-3 font-sans font-semibold">What it is</th>
                    <th className="text-left px-4 py-3 font-sans font-semibold">URL</th>
                    <th className="text-left px-4 py-3 font-sans font-semibold">Who uses it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {[
                    ['Your website', 'thewritersmark.us', 'Everyone'],
                    ['Where clients book', 'thewritersmark.us/book', 'Clients'],
                    ['Free consultation', 'thewritersmark.us/consult', 'Prospective clients'],
                    ['Reviews page', 'thewritersmark.us/reviews', 'Everyone'],
                    ['Your owner console', 'thewritersmark.us/admin', 'Just you'],
                  ].map(([what, url, who]) => (
                    <tr key={url} className="bg-white even:bg-cream/40">
                      <td className="px-4 py-3 font-medium text-navy">{what}</td>
                      <td className="px-4 py-3 font-mono text-sm text-gold">{url}</td>
                      <td className="px-4 py-3 text-muted">{who}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">2. What a client experiences when they book</h2>
            <ol className="space-y-3 list-none">
              {[
                'They land on your site — homepage, a service page, or a QR-code link from a flyer.',
                'They click "Book a Session."',
                'They pick a service. The site shows them the rate.',
                'They pick a date and time — the calendar shows your real availability from Google Calendar.',
                'They enter their info (name, email, phone, student details if applicable).',
                'The site shows them a payment summary: session rate + NJ Sales Tax (6.625%) + CC processing fee (3%) = Total.',
                'They pay by credit card.',
                'They land on a branded "You\'re Booked" receipt page with your logo — they can print or save it as PDF.',
                'The system automatically emails them: booking confirmation, calendar invite, client agreement to sign, and a Stripe receipt.',
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold text-ink text-xs font-bold font-sans flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 bg-navy/5 border-l-4 border-gold px-5 py-4 rounded-sm">
              <p className="font-semibold text-navy">You do nothing during this entire flow.</p>
              <p className="text-muted mt-1">The site handles the booking, takes the payment, sends the agreement, and shows the client their receipt — automatically.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">3. What lands in your inbox after every booking</h2>
            <div className="overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full text-sm">
                <thead className="bg-navy text-cream">
                  <tr>
                    <th className="text-left px-4 py-3 font-sans font-semibold">Email you receive</th>
                    <th className="text-left px-4 py-3 font-sans font-semibold">When</th>
                    <th className="text-left px-4 py-3 font-sans font-semibold">What you do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10">
                  {[
                    ['🆕 New Booking', 'The moment a client pays', 'Read it. Session is already on your Google Calendar.'],
                    ['✍️ Client signed agreement', 'When client signs', 'Go to /admin/agreements and countersign.'],
                    ['⚠️ Client declined agreement', 'If client refuses to sign', 'Follow up with them directly.'],
                    ['Session reminder (to client)', '24 hrs before each session', 'Nothing — client gets it; you\'re cc\'d.'],
                  ].map(([email, when, action]) => (
                    <tr key={email} className="bg-white even:bg-cream/40">
                      <td className="px-4 py-3 font-medium text-navy">{email}</td>
                      <td className="px-4 py-3 text-muted">{when}</td>
                      <td className="px-4 py-3">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">4. Your owner console</h2>
            <div className="space-y-4">
              <div className="bg-white border border-navy/10 rounded-sm p-5">
                <h3 className="font-semibold text-navy mb-3">How to get there</h3>
                <p className="text-sm">Go to <span className="font-mono text-gold">thewritersmark.us/admin</span> — no password required right now, just click through.</p>
                <p className="text-muted text-sm mt-2">Bookmark it for easy access.</p>
              </div>
              <div className="bg-white border border-navy/10 rounded-sm p-5">
                <h3 className="font-semibold text-navy mb-2">Pending agreements — the main reason you&rsquo;ll log in</h3>
                <p className="text-sm">Click <strong>Client Agreements</strong>. You&rsquo;ll see clients who have signed and are waiting on your countersignature. Click the gold <strong>&ldquo;Open in Dropbox Sign&rdquo;</strong> button — countersign in 30 seconds. The fully-signed PDF is automatically emailed to both you and the client.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">5. One-time setups (do these once, never again)</h2>
            <div className="space-y-5">
              <div className="bg-white border border-navy/10 rounded-sm p-5">
                <h3 className="font-semibold text-navy mb-3">A. Add your logo to Stripe (2 min)</h3>
                <ol className="space-y-1 text-sm text-muted">
                  <li>1. Log into <span className="font-mono">dashboard.stripe.com</span></li>
                  <li>2. Click <strong>Settings → Business → Branding</strong></li>
                  <li>3. Upload your logo — you can download it here: <a href="/logo.jpg" download className="text-gold underline">Download logo.jpg</a></li>
                  <li>4. Save — every Stripe invoice now has your logo on it</li>
                </ol>
              </div>
              <div className="bg-white border border-navy/10 rounded-sm p-5">
                <h3 className="font-semibold text-navy mb-3">B. Connect Google Calendar to Cal.com (5 min)</h3>
                <ol className="space-y-1 text-sm text-muted">
                  <li>1. When you sign up for Cal.com, it asks to connect a calendar</li>
                  <li>2. Pick your Writer&rsquo;s Mark Google Calendar</li>
                  <li>3. The scheduler on your site now mirrors your availability automatically — clients can never book a slot when you&rsquo;re busy</li>
                </ol>
              </div>
              <div className="bg-white border border-navy/10 rounded-sm p-5">
                <h3 className="font-semibold text-navy mb-3">C. Verify your Google Business Profile</h3>
                <ol className="space-y-1 text-sm text-muted">
                  <li>1. Go to <span className="font-mono">business.google.com</span></li>
                  <li>2. Find your Writer&rsquo;s Mark, LLC listing</li>
                  <li>3. Make sure your hours, address, and contact info are up to date</li>
                  <li>4. This is what shows up when people search &ldquo;writing tutor near me&rdquo;</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-serif font-bold text-navy text-2xl mb-5">6. Quick answers to &ldquo;what happens if...&rdquo;</h2>
            <div className="space-y-4">
              {[
                ['A client says they never got their booking confirmation?', "Their email provider may have flagged it as spam. Ask them to check there. The booking went through if you got the 'New Booking' notification — the appointment is on your Google Calendar."],
                ['A client wants to reschedule?', 'They can reply to their confirmation email, or you can move the slot in Google Calendar — Cal.com syncs both ways.'],
                ["A client doesn't sign the agreement?", 'They get auto-reminded by Dropbox Sign. If they decline outright, you get an email. You can cancel and refund through Stripe.'],
                ['The site goes down?', "It's hosted on Vercel (99.99%+ uptime). If something's actually broken, email me — these things are usually fixed in minutes."],
                ['I want to update prices, descriptions, or staff bios?', "Email me for now. Eventually you'll edit these directly through the built-in content tool — I can walk you through it in 10 minutes when you're ready."],
              ].map(([q, a]) => (
                <div key={String(q)} className="bg-white border border-navy/10 rounded-sm p-5">
                  <p className="font-semibold text-navy mb-1">...{q}</p>
                  <p className="text-sm text-muted">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TL;DR */}
          <section className="bg-navy text-cream rounded-sm p-8">
            <h2 className="font-serif font-bold text-xl mb-5">The TL;DR</h2>
            <ul className="space-y-2 text-sm text-cream/80">
              {[
                'Clients book and pay through thewritersmark.us/book. You do nothing during the booking.',
                'After every booking you get an email and the session is on your Google Calendar.',
                'When a client signs their agreement, go to /admin/agreements and countersign in 30 seconds.',
                'Your branded logo is on the website, every email, and the receipt page.',
                'Reviews go live the moment a client submits them.',
                'Questions about anything? Email me — iangavilan31@gmail.com.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gold mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>
    </div>
  )
}
