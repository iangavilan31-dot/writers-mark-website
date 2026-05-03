import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'New Client Agreement | The Writer\'s Mark',
  description: 'Review and sign the New Client Agreement for The Writer\'s Mark, LLC. Secure digital signatures powered by Dropbox Sign.',
}

export default function AgreementPage() {
  return (
    <>
      <section className="bg-navy section-padding pt-40">
        <div className="container-content max-w-3xl">
          <p className="section-label text-gold mb-6">CLIENT AGREEMENT</p>
          <h1 className="heading-display text-cream mb-6">New Client Agreement</h1>
          <p className="font-sans text-cream/60 max-w-xl" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
            Please review and sign below. You'll receive a countersigned copy by email within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-content max-w-3xl">
          <div className="bg-white border border-border rounded-lg p-8 mb-8">
            <p className="section-label text-[10px] mb-4">NOTE</p>
            <p className="font-sans text-sm text-muted leading-relaxed">
              If you booked a session, a signing request was already sent to your email from Dropbox Sign.
              Use this page if you need to access or re-sign the agreement directly.
            </p>
          </div>

          {/* Dropbox Sign embedded widget — loads after template ID is configured */}
          <div className="bg-white border border-border rounded-lg overflow-hidden min-h-[600px] flex items-center justify-center">
            {/* This iframe is replaced by the Dropbox Sign embedded signing widget
                once DROPBOX_SIGN_TEMPLATE_ID is set in environment variables.
                Implementation: use @hellosign/embedded npm package to render inline */}
            <div className="text-center p-12">
              <p className="section-label text-[10px] mb-4">AGREEMENT SIGNING</p>
              <p className="font-serif font-semibold text-xl text-ink mb-4">
                Check Your Email
              </p>
              <p className="font-sans text-sm text-muted max-w-md leading-relaxed mb-8">
                When you booked your session, a signing request was sent to your email address
                from Dropbox Sign (noreply@hellosign.com). Click the link in that email to
                sign your agreement securely.
              </p>
              <p className="font-sans text-sm text-muted mb-6">
                Didn't receive it?
              </p>
              <Link href="/contact" className="btn-secondary">
                Contact Us →
              </Link>
            </div>
          </div>

          <p className="font-sans text-xs text-muted mt-6 text-center">
            Questions about the agreement?{' '}
            <Link href="/contact" className="text-ink underline cursor-pointer">Contact us →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
