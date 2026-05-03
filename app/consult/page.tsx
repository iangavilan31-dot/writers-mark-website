import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Consultation | Free 30-Minute Writing Assessment',
  description: 'Schedule your free 30-minute consultation with The Writer\'s Mark. No commitment, no credit card required. We\'ll assess your needs and build a plan together.',
}

const whatHappens = [
  'Listen to your goals (or your child\'s goals)',
  'Review any writing samples you want to share',
  'Give you an honest assessment of where things stand',
  'Outline what a realistic plan looks like',
  'Answer every question you have',
  'Tell you if we think another service would serve you better',
]

const whatYouLeave = [
  'Exactly which service fits your needs',
  'A realistic timeline and expectation',
  'What the investment looks like',
  'Whether The Writer\'s Mark is the right fit',
]

export default function ConsultPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-8">
            <span className="section-label text-gold text-[10px]">FREE · 30 MINUTES · NO CREDIT CARD</span>
          </div>
          <h1 className="heading-display text-cream mb-6">Let's Talk First.</h1>
          <p className="font-sans text-cream/60 max-w-2xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            A free 30-minute call where we listen to your goals, assess your current situation,
            and tell you honestly what a realistic plan looks like. No pitch. No pressure.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: what to expect */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <p className="section-label text-[10px] mb-5">WHAT HAPPENS IN 30 MINUTES</p>
                <ul className="space-y-3">
                  {whatHappens.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">→</span>
                      <span className="font-sans text-sm text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="section-label text-[10px] mb-5">YOU'LL LEAVE KNOWING</p>
                <ul className="space-y-3">
                  {whatYouLeave.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-sans text-sm text-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="section-label text-[10px] mb-3">WHAT TO PREPARE</p>
                <p className="font-sans text-sm text-muted leading-relaxed">
                  Any writing samples (optional but helpful), notes on your goals or challenges,
                  and questions you want answered.
                </p>
              </div>

              <div className="pt-8 border-t border-border bg-cream-dark rounded-lg p-6">
                <p className="font-sans text-sm text-muted leading-relaxed">
                  <strong className="text-ink">After your consultation:</strong> If you decide to
                  move forward, you can book and pay online in minutes. If you don't — no hard
                  feelings and no follow-up pressure.
                </p>
              </div>
            </div>

            {/* Right: Cal.com embed */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="px-8 py-5 border-b border-border">
                  <p className="section-label text-[10px] mb-1">SCHEDULE YOUR CONSULTATION</p>
                  <p className="font-serif font-semibold text-lg text-ink">Free 30-Minute Consultation</p>
                  <p className="font-sans text-xs text-muted mt-1">No charge · No credit card required</p>
                </div>
                <div className="p-4">
                  {/* Cal.com embed — free-consult event type */}
                  <iframe
                    src="https://cal.com/the-writers-mark/free-consult?embed=true&embedType=inline&layout=month_view"
                    width="100%"
                    height="580"
                    frameBorder="0"
                    title="Schedule Free Consultation"
                    className="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
