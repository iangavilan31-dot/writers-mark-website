import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendBookingConfirmation, sendOwnerNotification } from '@/lib/emails'
import { sendAgreementRequest } from '@/lib/signatures'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
  })
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status !== 'paid') return NextResponse.json({ received: true })

    const meta = session.metadata!
    const {
      service_slug,
      service_name,
      client_name,
      client_email,
      client_phone,
      student_name,
      student_grade,
      cal_booking_uid,
      session_date,
      utm_source,
      utm_campaign,
      notes,
    } = meta

    // Parse pricing from line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
    const subtotal = (lineItems.data[0]?.amount_total ?? 0) / 100
    const njTax = (lineItems.data[1]?.amount_total ?? 0) / 100
    const ccFee = (lineItems.data[2]?.amount_total ?? 0) / 100
    const total = (session.amount_total ?? 0) / 100

    // 1. Save booking to Supabase
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        client_name,
        client_email,
        client_phone,
        student_name: student_name || null,
        student_grade: student_grade || null,
        service: service_slug,
        session_date: session_date || null,
        session_rate: subtotal,
        subtotal,
        nj_tax: njTax,
        cc_fee: ccFee,
        total_charged: total,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string,
        cal_booking_uid: cal_booking_uid || null,
        utm_source: utm_source || null,
        utm_campaign: utm_campaign || null,
        notes: notes || null,
        status: 'confirmed',
        agreement_status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('DB insert error:', dbError)
      // Don't return error — still try to send emails
    }

    const bookingId = booking?.id ?? 'unknown'

    // 2. Send confirmation email to client
    await sendBookingConfirmation({
      clientName: client_name,
      clientEmail: client_email,
      serviceName: service_name,
      sessionDate: session_date,
      sessionRate: subtotal,
      njTax,
      ccFee,
      total,
      bookingId,
      stripeSessionId: session.id,
    })

    // 3. Notify owner
    await sendOwnerNotification({
      clientName: client_name,
      clientEmail: client_email,
      clientPhone: client_phone,
      serviceName: service_name,
      sessionDate: session_date,
      total,
      bookingId,
    })

    // 4. Send Dropbox Sign agreement request
    await sendAgreementRequest({
      clientName: client_name,
      clientEmail: client_email,
      serviceName: service_name,
      sessionDate: session_date,
      sessionRate: `$${subtotal}/hr`,
      bookingId,
      stripeSessionId: session.id,
    })
  }

  return NextResponse.json({ received: true })
}
