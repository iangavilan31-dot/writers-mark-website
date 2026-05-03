import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SERVICES, calculatePricing, type ServiceSlug } from '@/lib/services'
import { z } from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

const CheckoutSchema = z.object({
  serviceSlug: z.string(),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  studentName: z.string().optional(),
  studentGrade: z.string().optional(),
  calBookingUid: z.string().optional(), // from Cal.com after scheduling
  sessionDate: z.string().optional(),
  utmSource: z.string().optional(),
  utmCampaign: z.string().optional(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = CheckoutSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const {
      serviceSlug,
      clientName,
      clientEmail,
      clientPhone,
      studentName,
      studentGrade,
      calBookingUid,
      sessionDate,
      utmSource,
      utmCampaign,
      notes,
    } = parsed.data

    const service = SERVICES[serviceSlug as ServiceSlug]
    if (!service || service.isFree) {
      return NextResponse.json({ error: 'Invalid service' }, { status: 400 })
    }

    const pricing = calculatePricing(service.ratePerHour)

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: service.name,
            description: `60-minute ${service.name} session · The Writer's Mark, LLC`,
            metadata: { service_slug: serviceSlug },
          },
          unit_amount: pricing.subtotalCents,
        },
        quantity: 1,
      },
    ]

    // Add NJ Sales Tax as a line item
    // NOTE: Verify with NJ DOR whether educational services are taxable
    if (pricing.njTaxCents > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'NJ Sales Tax (6.625%)',
            description: 'New Jersey Sales Tax as required by NJ DOR',
          },
          unit_amount: pricing.njTaxCents,
        },
        quantity: 1,
      })
    }

    // Add CC processing fee
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Credit Card Processing Fee (3%)',
          description: 'Payment processing fee',
        },
        unit_amount: pricing.ccFeeCents,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: clientEmail,
      success_url: `${process.env.SITE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}&service=${serviceSlug}`,
      cancel_url: `${process.env.SITE_URL}/book?service=${serviceSlug}&cancelled=true`,
      metadata: {
        service_slug: serviceSlug,
        service_name: service.name,
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone ?? '',
        student_name: studentName ?? '',
        student_grade: studentGrade ?? '',
        cal_booking_uid: calBookingUid ?? '',
        session_date: sessionDate ?? '',
        utm_source: utmSource ?? '',
        utm_campaign: utmCampaign ?? '',
        notes: notes?.slice(0, 500) ?? '', // Stripe metadata has 500 char limit per value
      },
      payment_intent_data: {
        metadata: {
          service_name: service.name,
          client_name: clientName,
        },
        description: `${service.name} — ${clientName} — The Writer's Mark`,
        statement_descriptor_suffix: 'WRITERSMARK',
      },
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `${service.name} · 60-minute session · The Writer's Mark, LLC`,
          metadata: {
            client_name: clientName,
            service_name: service.name,
          },
          footer: "The Writer's Mark, LLC · thewritersmark.us\nNJ Sales Tax (6.625%) applied per NJ DOR requirements.\nCancellation policy: 24-hour notice required. Thank you for choosing The Writer's Mark.",
          rendering_options: {
            amount_tax_display: 'include_inclusive_tax',
          },
        },
      },
      // Allow promotion codes for package discounts
      allow_promotion_codes: true,
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
