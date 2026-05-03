import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'bookings@thewritersmark.us'
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? 'owner@thewritersmark.us'

// ── Shared email header/footer HTML ──────────────────────────────────────────

function emailWrapper(content: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #FAFAF7; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0F0F0F; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { padding: 32px 40px; background-color: #1A2744; border-radius: 8px 8px 0 0; }
    .header-brand { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; font-weight: 700; color: #FAFAF7; letter-spacing: -0.5px; }
    .header-tagline { font-size: 11px; color: #C9A84C; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
    .body { background: #FFFFFF; padding: 40px; border-left: 1px solid #E8E4DC; border-right: 1px solid #E8E4DC; }
    .footer { background: #F0EDE6; padding: 24px 40px; border-radius: 0 0 8px 8px; border: 1px solid #E8E4DC; border-top: none; }
    .footer p { font-size: 12px; color: #6B6B6B; line-height: 1.6; }
    h1 { font-family: Georgia, serif; font-size: 28px; font-weight: 700; color: #0F0F0F; margin-bottom: 16px; line-height: 1.2; }
    h2 { font-family: Georgia, serif; font-size: 18px; font-weight: 600; color: #1A2744; margin: 24px 0 12px; }
    p { font-size: 15px; line-height: 1.7; color: #3a3a3a; margin-bottom: 16px; }
    .gold-line { width: 48px; height: 3px; background-color: #C9A84C; border-radius: 2px; margin-bottom: 20px; }
    .summary-box { background: #F0EDE6; border-radius: 6px; padding: 20px 24px; margin: 20px 0; }
    .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; border-bottom: 1px solid #E8E4DC; }
    .summary-row:last-child { border-bottom: none; font-weight: 700; font-size: 16px; padding-top: 12px; }
    .btn { display: inline-block; padding: 14px 32px; background-color: #C9A84C; color: #0F0F0F; font-weight: 600; font-size: 14px; text-decoration: none; border-radius: 2px; margin: 8px 0; }
    .badge { display: inline-block; padding: 4px 10px; background: #1A2744; color: #C9A84C; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 20px; margin-bottom: 16px; }
    .divider { height: 1px; background: #E8E4DC; margin: 24px 0; }
    .muted { color: #6B6B6B; font-size: 13px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="header-brand">The Writer's Mark</div>
      <div class="header-tagline">Writing Doesn't Have to Suck.</div>
    </div>
    <div class="body">
      ${content}
    </div>
    <div class="footer">
      <p>The Writer's Mark, LLC · thewritersmark.us · New Jersey · Est. 1993</p>
      <p style="margin-top:6px">Questions? Reply to this email or visit <a href="https://thewritersmark.us/contact" style="color:#1A2744">thewritersmark.us/contact</a></p>
      <p style="margin-top:6px">100% Human · No AI · Remote & In-Person NJ</p>
    </div>
  </div>
</body>
</html>`
}

// ── 1. Booking Confirmation (to client) ───────────────────────────────────────

interface BookingConfirmationParams {
  clientName: string
  clientEmail: string
  serviceName: string
  sessionDate?: string
  sessionRate: number
  njTax: number
  ccFee: number
  total: number
  bookingId: string
  stripeSessionId: string
}

export async function sendBookingConfirmation(params: BookingConfirmationParams) {
  const {
    clientName, clientEmail, serviceName, sessionDate,
    sessionRate, njTax, ccFee, total, bookingId,
  } = params

  const html = emailWrapper(`
    <span class="badge">Booking Confirmed</span>
    <div class="gold-line"></div>
    <h1>You're Booked, ${clientName.split(' ')[0]}.</h1>
    <p>Thank you for booking with The Writer's Mark. Here's a summary of your session — and what to expect next.</p>

    <h2>Session Details</h2>
    <div class="summary-box">
      <div class="summary-row">
        <span>Service</span>
        <span><strong>${serviceName}</strong></span>
      </div>
      <div class="summary-row">
        <span>Duration</span>
        <span>60 minutes</span>
      </div>
      ${sessionDate ? `<div class="summary-row"><span>Date & Time</span><span><strong>${sessionDate}</strong></span></div>` : ''}
      <div class="summary-row">
        <span>Delivery</span>
        <span>Remote (video) — link sent separately</span>
      </div>
    </div>

    <h2>Payment Summary</h2>
    <div class="summary-box">
      <div class="summary-row">
        <span>Session Rate (60 min)</span>
        <span>$${sessionRate.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>NJ Sales Tax (6.625%)</span>
        <span>$${njTax.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>CC Processing Fee (3%)</span>
        <span>$${ccFee.toFixed(2)}</span>
      </div>
      <div class="summary-row">
        <span>Total Paid</span>
        <span>$${total.toFixed(2)}</span>
      </div>
    </div>
    <p class="muted">A formal receipt has been sent to ${clientEmail} from our payment processor (Stripe).</p>

    <div class="divider"></div>

    <h2>What Happens Next</h2>
    <p>✅ <strong>Client Agreement</strong> — You'll receive a separate email from Dropbox Sign with your client agreement to sign. Please sign before your session.</p>
    <p>📅 <strong>Calendar Invite</strong> — A Google Calendar invite will arrive shortly with your session link.</p>
    <p>📋 <strong>Invoice</strong> — A detailed invoice is available in your Stripe receipt email.</p>
    <p>🔔 <strong>Reminder</strong> — We'll send a reminder 24 hours before your session.</p>

    <div class="divider"></div>

    <h2>Cancellation Policy</h2>
    <p class="muted">Sessions must be cancelled at least <strong>24 hours in advance</strong>. Late cancellations (under 24 hours) are billed at 50% of the session rate. No-shows are billed in full.</p>
    <p class="muted">To reschedule or cancel: reply to this email or visit your booking confirmation link.</p>

    <div class="divider"></div>
    <p><strong>We're looking forward to working with you.</strong><br>— The Writer's Mark Team</p>

    <p style="margin-top:20px"><a href="https://thewritersmark.us" class="btn">Visit Our Website</a></p>

    <p class="muted" style="margin-top:20px">Booking reference: ${bookingId}</p>
  `)

  return resend.emails.send({
    from: FROM,
    to: clientEmail,
    subject: `✓ Booking Confirmed — ${serviceName} · The Writer's Mark`,
    html,
  })
}

// ── 2. Owner Notification ─────────────────────────────────────────────────────

interface OwnerNotificationParams {
  clientName: string
  clientEmail: string
  clientPhone?: string
  serviceName: string
  sessionDate?: string
  total: number
  bookingId: string
}

export async function sendOwnerNotification(params: OwnerNotificationParams) {
  const { clientName, clientEmail, clientPhone, serviceName, sessionDate, total, bookingId } = params

  const html = emailWrapper(`
    <span class="badge">New Booking</span>
    <div class="gold-line"></div>
    <h1>New Session Booked</h1>
    <div class="summary-box">
      <div class="summary-row"><span>Client</span><span><strong>${clientName}</strong></span></div>
      <div class="summary-row"><span>Email</span><span>${clientEmail}</span></div>
      <div class="summary-row"><span>Phone</span><span>${clientPhone ?? 'Not provided'}</span></div>
      <div class="summary-row"><span>Service</span><span><strong>${serviceName}</strong></span></div>
      ${sessionDate ? `<div class="summary-row"><span>Session Date</span><span><strong>${sessionDate}</strong></span></div>` : ''}
      <div class="summary-row"><span>Total Collected</span><span><strong>$${total.toFixed(2)}</strong></span></div>
    </div>
    <p><strong>Action required:</strong></p>
    <p>1. The client agreement has been sent to the client via Dropbox Sign. You'll receive a countersign request after they sign.</p>
    <p>2. Confirm the session in Google Calendar.</p>
    <p class="muted">Booking ID: ${bookingId}</p>
  `)

  return resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `🆕 New Booking: ${clientName} — ${serviceName}`,
    html,
  })
}

// ── 3. Session Reminder (24 hrs before) ──────────────────────────────────────

export async function sendSessionReminder({
  clientName,
  clientEmail,
  serviceName,
  sessionDate,
  sessionLink,
}: {
  clientName: string
  clientEmail: string
  serviceName: string
  sessionDate: string
  sessionLink?: string
}) {
  const html = emailWrapper(`
    <span class="badge">Session Tomorrow</span>
    <div class="gold-line"></div>
    <h1>Your Session is Tomorrow</h1>
    <p>Just a reminder that you have a ${serviceName} session scheduled for <strong>${sessionDate}</strong>.</p>
    ${sessionLink ? `<p><a href="${sessionLink}" class="btn">Join Video Session</a></p>` : ''}
    <div class="divider"></div>
    <p class="muted">Need to reschedule? Please do so as soon as possible. Sessions cancelled with less than 24 hours notice are billed at 50%.</p>
    <p class="muted">Questions? Reply to this email.</p>
    <p><strong>See you tomorrow!</strong><br>— The Writer's Mark</p>
  `)

  return resend.emails.send({
    from: FROM,
    to: clientEmail,
    subject: `Reminder: ${serviceName} session tomorrow — The Writer's Mark`,
    html,
  })
}

// ── 4. Post-Session Review Request ───────────────────────────────────────────

export async function sendReviewRequest({
  clientName,
  clientEmail,
  serviceName,
  reviewLink,
}: {
  clientName: string
  clientEmail: string
  serviceName: string
  reviewLink: string
}) {
  const html = emailWrapper(`
    <div class="gold-line"></div>
    <h1>How Did We Do?</h1>
    <p>Hi ${clientName.split(' ')[0]},</p>
    <p>Thank you for your ${serviceName} session with The Writer's Mark. We hope it was exactly what you needed.</p>
    <p>If you have a moment, we'd love to hear about your experience. Honest feedback helps us serve every client better — and helps other students and professionals find us.</p>
    <p><a href="${reviewLink}" class="btn">Leave a Review (2 minutes)</a></p>
    <div class="divider"></div>
    <p class="muted">Your review is verified against your booking and published only after your approval. We show the real picture — good and areas for growth.</p>
    <p>Thank you for trusting us with your writing. We hope to work with you again.</p>
    <p>— The Writer's Mark Team</p>
  `)

  return resend.emails.send({
    from: FROM,
    to: clientEmail,
    subject: `How was your session? — The Writer's Mark`,
    html,
  })
}

// ── 5. Contact Form Auto-Reply ────────────────────────────────────────────────

export async function sendContactAutoReply({
  name,
  email,
}: {
  name: string
  email: string
}) {
  const html = emailWrapper(`
    <div class="gold-line"></div>
    <h1>We've Got Your Message.</h1>
    <p>Hi ${name.split(' ')[0]},</p>
    <p>Thank you for reaching out to The Writer's Mark. We've received your message and will respond within one business day.</p>
    <p>If your inquiry is time-sensitive, you can also book a free 30-minute consultation directly:</p>
    <p><a href="https://thewritersmark.us/consult" class="btn">Schedule Free Consultation</a></p>
    <div class="divider"></div>
    <p class="muted">During high-demand seasons (August–October for college admissions, January–April for DSAT prep), response time may extend to 2 business days.</p>
    <p>— The Writer's Mark Team</p>
  `)

  return resend.emails.send({
    from: FROM,
    to: email,
    subject: `We received your message — The Writer's Mark`,
    html,
  })
}
