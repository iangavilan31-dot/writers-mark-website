import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  // Dropbox Sign sends a JSON body with event details
  const body = await req.json()
  const event = body?.event

  if (!event) {
    return NextResponse.json({ error: 'No event' }, { status: 400 })
  }

  // Always return 200 to acknowledge receipt
  // Dropbox Sign will retry if it doesn't get 200

  const eventType = event.event_type
  const signatureRequest = body?.signature_request

  if (!signatureRequest) {
    return new NextResponse('Hello API Event Received', { status: 200 })
  }

  const metadata = signatureRequest.metadata ?? {}
  const bookingId = metadata.booking_id
  const requestId = signatureRequest.signature_request_id

  switch (eventType) {
    case 'signature_request_signed': {
      // A signer completed their signature
      const signatures = signatureRequest.signatures ?? []
      const allSigned = signatures.every((s: any) => s.status_code === 'signed')

      if (!allSigned) {
        // Client signed but owner hasn't yet — update status
        if (bookingId) {
          await supabase
            .from('bookings')
            .update({ agreement_status: 'client_signed' })
            .eq('id', bookingId)
        }

        // Notify owner to countersign
        const adminUrl = `${process.env.SITE_URL ?? 'https://thewritersmark.us'}/admin/agreements`
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL!,
          to: process.env.OWNER_EMAIL!,
          subject: '✍️ Client signed agreement — your countersignature needed',
          html: `
            <p>A client has signed their New Client Agreement and is waiting for your countersignature.</p>
            <p>Booking ID: ${bookingId}</p>
            <p><strong>One-click access to all pending agreements:</strong> <a href="${adminUrl}">${adminUrl}</a></p>
            <p>Or log in to Dropbox Sign directly: <a href="https://app.hellosign.com">app.hellosign.com</a></p>
            <p>The signed document will be sent to both parties automatically once you countersign.</p>
          `,
        })
      }
      break
    }

    case 'signature_request_all_signed': {
      // Both parties signed — update to complete
      if (bookingId) {
        await supabase
          .from('bookings')
          .update({
            agreement_status: 'complete',
            dropbox_sign_request_id: requestId,
          })
          .eq('id', bookingId)
      }
      // Dropbox Sign automatically emails the final signed PDF to both parties
      break
    }

    case 'signature_request_declined': {
      // Client declined — notify owner
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: process.env.OWNER_EMAIL!,
        subject: '⚠️ Client declined agreement signing',
        html: `
          <p>A client declined to sign their New Client Agreement.</p>
          <p>Booking ID: ${bookingId}</p>
          <p>Please follow up with the client directly.</p>
        `,
      })
      break
    }

    default:
      break
  }

  return new NextResponse('Hello API Event Received', { status: 200 })
}
