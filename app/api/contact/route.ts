import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendContactAutoReply } from '@/lib/emails'
import { Resend } from 'resend'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = ContactSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data' },
      { status: 400 }
    )
  }

  const { name, email, phone, subject, message } = parsed.data

  // Rate limiting — simple check: max 3 submissions per email per day
  const { count } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())

  if ((count ?? 0) >= 3) {
    return NextResponse.json(
      { error: 'Too many submissions. Please email us directly.' },
      { status: 429 }
    )
  }

  // Save to Supabase
  await supabase.from('contact_submissions').insert({
    name, email, phone: phone ?? null, subject, message,
  })

  // Notify owner
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: process.env.OWNER_EMAIL!,
    subject: `📬 Contact Form: ${subject} — ${name}`,
    html: `
      <p><strong>New contact form submission</strong></p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone ?? 'Not provided'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 4px;">${message}</p>
      <p><a href="mailto:${email}">Reply to ${name} →</a></p>
    `,
    replyTo: email,
  })

  // Auto-reply to sender
  await sendContactAutoReply({ name, email })

  return NextResponse.json({ success: true })
}
