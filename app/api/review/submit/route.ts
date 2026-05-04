import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'

const ReviewSchema = z.object({
  clientEmail: z.string().email(),
  displayName: z.string().min(1),
  service: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(20, 'Review must be at least 20 characters'),
  wouldRecommend: z.boolean(),
  featureOnHomepage: z.boolean().default(false),
})

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  const body = await req.json()
  const parsed = ReviewSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid review data', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { clientEmail, displayName, service, rating, reviewText, wouldRecommend, featureOnHomepage } = parsed.data

  // Verify the email exists in completed bookings
  const { data: booking } = await supabase
    .from('bookings')
    .select('id, client_name, service, status')
    .eq('client_email', clientEmail)
    .in('status', ['confirmed', 'completed'])
    .limit(1)
    .single()

  const isVerified = !!booking

  // Save review (auto-approved so it appears immediately)
  const { data: review, error } = await supabase
    .from('reviews')
    .insert({
      booking_id: booking?.id ?? null,
      client_email: clientEmail,
      display_name: displayName,
      service,
      rating,
      review_text: reviewText,
      would_recommend: wouldRecommend,
      approved: true,
      featured: false,
      feature_on_homepage: featureOnHomepage,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
  }

  // Notify owner to review and approve
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.OWNER_EMAIL!,
    subject: `⭐ New ${rating}-star review awaiting approval — ${displayName}`,
    html: `
      <p><strong>New client review awaiting approval.</strong></p>
      <p><strong>Name:</strong> ${displayName}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Rating:</strong> ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)</p>
      <p><strong>Verified booking:</strong> ${isVerified ? '✅ Yes' : '⚠️ No — manual check recommended'}</p>
      <p><strong>Review:</strong></p>
      <blockquote style="border-left: 3px solid #C9A84C; padding-left: 16px; margin: 12px 0; color: #444;">
        "${reviewText}"
      </blockquote>
      <p>Would recommend: ${wouldRecommend ? 'Yes' : 'No'}</p>
      <p><strong>To approve:</strong> Log in to the admin panel at ${process.env.SITE_URL}/admin/reviews</p>
      <p>Review ID: ${review.id}</p>
    `,
  })

  return NextResponse.json({ success: true, reviewId: review.id })
}
