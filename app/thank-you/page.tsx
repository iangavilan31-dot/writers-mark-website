import Link from 'next/link'
import Image from 'next/image'
import Stripe from 'stripe'
import { CheckCircle } from 'lucide-react'
import { PrintButton } from './PrintButton'

export const dynamic = 'force-dynamic'

type SearchParams = { session_id?: string; service?: string }

type ReceiptData = {
  bookingId: string
  clientName: string | null
  clientEmail: string | null
  serviceName: string
  amountSubtotal: number | null
  amountTax: number | null
  amountFee: number | null
  amountTotal: number
  currency: string
  paidAt: Date | null
  invoiceUrl: string | null
}

async function fetchReceipt(sessionId: string | undefined): Promise<ReceiptData | null> {
  if (!sessionId) return null
  if (!process.env.STRIPE_SECRET_KEY) return null

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' })
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'invoice', 'customer'],
    })

    const lineItems = session.line_items?.data ?? []
    // Identify subtotal vs. tax/fee line items by description prefix
    let subtotal = 0
    let tax = 0
    let fee = 0
    let primaryName = ''
    for (const li of lineItems) {
      const name = (li.description ?? '').toLowerCase()
      const amount = li.amount_total ?? 0
      if (name.includes('tax') || name.includes('nj sales')) tax += amount
      else if (name.includes('fee') || name.includes('processing')) fee += amount
      else {
        subtotal += amount
        if (!primaryName) primaryName = li.description ?? ''
      }
    }

    const invoice = session.invoice as Stripe.Invoice | null
    const paidAt = session.created ? new Date(session.created * 1000) : null

    return {
      bookingId: session.metadata?.cal_booking_uid || sessionId.slice(-10).toUpperCase(),
      clientName: session.metadata?.client_name ?? session.customer_details?.name ?? null,
      clientEmail: session.customer_email ?? session.customer_details?.email ?? null,
      serviceName: session.metadata?.service_name ?? primaryName ?? 'Session',
      amountSubtotal: subtotal || null,
      amountTax: tax || null,
      amountFee: fee || null,
      amountTotal: session.amount_total ?? 0,
      currency: (session.currency ?? 'usd').toUpperCase(),
      paidAt,
      invoiceUrl: invoice?.hosted_invoice_url ?? null,
    }
  } catch (err) {
    console.error('Failed to load Stripe session for receipt:', err)
    return null
  }
}

function fmt(amountInCents: number | null, currency: string): string {
  if (amountInCents == null) return '—'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amountInCents / 100)
}

function FallbackBody() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8 text-left">
      <h2 className="font-serif font-semibold text-gold text-xl mb-6">Check Your Email For:</h2>
      <div className="space-y-4">
        {[
          { label: 'Booking Confirmation', desc: 'Full session details, payment summary, and invoice.' },
          { label: 'Client Agreement', desc: 'A Dropbox Sign email with your service agreement to sign digitally.' },
          { label: 'Calendar Invite', desc: 'Google Calendar event with video link for your session.' },
          { label: 'Receipt from Stripe', desc: 'Official payment receipt with itemized breakdown.' },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <span className="text-gold font-bold mt-0.5 flex-shrink-0">✓</span>
            <div>
              <p className="font-sans font-semibold text-sm text-cream">{item.label}</p>
              <p className="font-sans text-xs text-cream/50 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
  const receipt = await fetchReceipt(searchParams.session_id)

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 pt-20 pb-16 print:bg-white print:pt-8 print:min-h-0">
      <div className="max-w-2xl w-full">
        {/* On-screen header */}
        <div className="text-center mb-8 print:hidden">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <CheckCircle size={36} className="text-gold" aria-hidden="true" />
            </div>
          </div>
          <h1 className="font-serif font-bold text-cream mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            You&rsquo;re Booked.
          </h1>
          <p className="font-sans text-cream/60 text-lg">
            Thank you for booking with The Writer&rsquo;s Mark. We&rsquo;re looking forward to working with you.
          </p>
        </div>

        {/* Print-friendly receipt */}
        {receipt ? (
          <div className="bg-white text-ink rounded-lg p-8 mb-8 print:rounded-none print:p-0 print:shadow-none">
            {/* Branded header */}
            <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
              <Image src="/logo.jpg" alt="" width={64} height={64} className="rounded-md" aria-hidden="true" />
              <div>
                <p className="font-serif font-bold text-xl text-ink leading-tight">The Writer&rsquo;s Mark, LLC</p>
                <p className="font-sans text-xs text-muted">Est. 1993 · New Jersey · thewritersmark.us</p>
              </div>
              <div className="ml-auto text-right">
                <p className="section-label text-gold text-[10px]">RECEIPT</p>
                <p className="font-sans text-xs text-muted mt-1">
                  {receipt.paidAt ? receipt.paidAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
                </p>
              </div>
            </div>

            {/* Bill-to */}
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <p className="section-label text-[9px] text-muted mb-1">BILL TO</p>
                <p className="font-sans font-semibold text-ink">{receipt.clientName ?? 'Client'}</p>
                {receipt.clientEmail && <p className="font-sans text-xs text-muted">{receipt.clientEmail}</p>}
              </div>
              <div className="text-right">
                <p className="section-label text-[9px] text-muted mb-1">REFERENCE</p>
                <p className="font-mono text-xs text-ink/80">{receipt.bookingId}</p>
              </div>
            </div>

            {/* Line items */}
            <div className="border border-border rounded-md overflow-hidden mb-6">
              <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 bg-cream-dark/40 text-xs uppercase tracking-wide text-muted font-semibold">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-t border-border text-sm">
                <span className="font-sans text-ink">{receipt.serviceName} — 60-minute session</span>
                <span className="font-sans tabular-nums text-ink">{fmt(receipt.amountSubtotal, receipt.currency)}</span>
              </div>
              {receipt.amountTax != null && (
                <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-t border-border text-sm">
                  <span className="font-sans text-muted">NJ Sales Tax (6.625%)</span>
                  <span className="font-sans tabular-nums text-ink">{fmt(receipt.amountTax, receipt.currency)}</span>
                </div>
              )}
              {receipt.amountFee != null && (
                <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-t border-border text-sm">
                  <span className="font-sans text-muted">CC Processing Fee (3%)</span>
                  <span className="font-sans tabular-nums text-ink">{fmt(receipt.amountFee, receipt.currency)}</span>
                </div>
              )}
              <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-4 border-t border-border bg-cream-dark/20 text-base font-semibold">
                <span className="font-sans text-ink">Total Paid</span>
                <span className="font-sans tabular-nums text-ink">{fmt(receipt.amountTotal, receipt.currency)}</span>
              </div>
            </div>

            <p className="font-sans text-xs text-muted">
              Paid by credit card via Stripe. NJ Sales Tax (6.625%) applied per NJ DOR requirements.
              Cancellation policy: 24-hour notice required. Thank you for choosing The Writer&rsquo;s Mark.
            </p>

            {receipt.invoiceUrl && (
              <p className="font-sans text-xs text-muted mt-4 print:hidden">
                Need a copy? View the official invoice on Stripe:{' '}
                <a href={receipt.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-ink underline">
                  open invoice →
                </a>
              </p>
            )}
          </div>
        ) : (
          <FallbackBody />
        )}

        {/* CTAs (hidden on print) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
          {receipt && <PrintButton />}
          <Link href="/book" className="btn-primary justify-center py-4">
            Book Another Session
          </Link>
          <Link href="/" className="btn-secondary-light justify-center py-4">
            Return Home
          </Link>
        </div>

        <p className="font-sans text-xs text-cream/30 mt-8 text-center print:hidden">
          Reminder: sessions must be cancelled at least 24 hours in advance. Reply to your confirmation email to reschedule.
        </p>
      </div>
    </div>
  )
}
