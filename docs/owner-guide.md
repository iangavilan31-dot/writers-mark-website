# The Writer's Mark — Owner's Guide

Hi Joseph,

Welcome to your new site. This is a plain-English walkthrough of how everything works — what your clients experience, what shows up in your inbox automatically, and how you use the parts of the site that are just for you. No technical setup required on your end.

Bookmark this — it's everything you need.

---

## 1. The five URLs you'll actually use

| What it is | URL | Who uses it |
|---|---|---|
| Your website | `thewritersmark.us` | Everyone |
| Where clients book | `thewritersmark.us/book` | Clients |
| Free 30-min consultation | `thewritersmark.us/consult` | Prospective clients |
| Reviews page | `thewritersmark.us/reviews` | Everyone |
| **Your owner console** | `thewritersmark.us/admin` | **Just you** |

Everything else (services, about, contact, staff) hangs off the main site.

---

## 2. What a client experiences when they book a session

Step by step, here's what happens from their side:

1. They land on your site (homepage, a service page, or a QR-code link from a flyer).
2. They click **"Book a Session"**.
3. They pick a service (Tutoring, ELA Prep, etc.). The site shows them the rate.
4. They pick a date and time on the calendar — the calendar shows your real availability from your Google Calendar.
5. They enter their info (name, email, phone, student details if applicable).
6. The site shows them a payment summary:
   - Session rate
   - **NJ Sales Tax (6.625%)** — added automatically
   - **Credit card processing fee (3%)** — added automatically
   - **Total**
7. They pay by credit card.
8. They land on a "You're Booked" page that shows them a **branded receipt with your logo** — they can hit "Print / Save as PDF" to keep a copy.
9. The system automatically emails them four things: a booking confirmation, a Google Calendar invite, the client agreement to sign (via Dropbox Sign), and an official Stripe receipt.

**You do nothing during this entire flow.** The site handles the booking, takes the payment, sends the agreement, and shows the client their receipt — automatically.

---

## 3. What lands in your inbox after every booking

You don't have to refresh anything. The system emails you automatically:

| Email you receive | When | What you do |
|---|---|---|
| **🆕 New Booking** | The moment a client pays | Read it. The session is already on your Google Calendar. |
| **✍️ Client signed agreement — your countersignature needed** | When the client signs the agreement | Click the link to your owner console (see Section 4) and countersign |
| **⚠️ Client declined agreement** | If a client refuses to sign | Follow up with them directly |
| **Booking reminder (to client)** | 24 hrs before each session | Nothing — the client gets it; you're cc'd |

Every email coming from the site has your gold logo at the top.

---

## 4. Your owner console

This is the part of the site that's just for you. Clients can't see it.

### How to get in

1. Go to **`thewritersmark.us/admin`**
2. A login box pops up. It looks like the kind your bank uses.
3. **Username:** anything (just type any letter, e.g. `a`)
4. **Password:** the password Ian set up for you (he'll tell you what it is)
5. You're in.

Your browser will remember the password for the rest of the day, so you only do this once per session.

### What you'll see

A simple page with two tiles:

- **Client Agreements** — pending countersignatures + history
- **Reviews** — coming soon (reviews currently auto-publish; this tile is a placeholder for future moderation tools)

### Pending agreements (the main reason you'll log in)

Click **"Client Agreements"** and you'll see two tables:

**Table 1 — Awaiting your signature.** Every client who has signed their agreement and is waiting on you is listed here, with their name, email, the service they booked, and when they booked it. Click the gold **"Open in Dropbox Sign"** button to countersign — this opens Dropbox Sign in a new tab where you complete the signing in 30 seconds. The system then automatically emails the fully-signed PDF to both you and the client.

**Table 2 — Recently completed.** Audit trail of agreements that are fully signed. Useful if you need to confirm a specific client signed, or if you want to see your most recent activity.

### What if I forget my admin password?

Email Me — Is can reset it.

---

## 5. The reviews page

`thewritersmark.us/reviews` shows verified reviews from real clients, plus a "Submit a Review" button.

**How it works:**
- A past client clicks "Submit a Review," fills in their email, name, service, rating, and review text.
- The review is **published immediately** to your reviews page and shows up for every visitor on every device.
- You'll get an email notification with the review text every time one comes in.

**If someone posts something inappropriate:** email Ian. Reviews can be removed, and if it becomes a recurring problem we can add an approval step where you have to OK a review before it goes live.

---

## 6. The handful of one-time setups you'll need to do

These are *one-time* steps in services you control. After this, you don't touch the technical side again.

### A. Add your logo to Stripe (2 minutes — for branded invoices)

The receipt on your website already shows your logo. Stripe's *own* PDF invoices (which they email separately to clients) need to be branded too:

1. Log into `dashboard.stripe.com`
2. Click **Settings → Business → Branding**
3. Upload `logo.jpg` (Ian has the file — same one used on the site)
4. Save

Done. Every Stripe-generated invoice from now on has your gold logo on it.

### B. Connect Google Calendar to Cal.com (5 minutes — for the scheduler)

When you sign up for Cal.com, it asks to connect a calendar. Pick your Writer's Mark Google Calendar. After that, the scheduler on your site mirrors your busy times automatically — clients can never book a slot when you're already busy.

### C. Add Ian as a manager on your Google Business Profile

This is what lets the site connect to your Google reviews and shows up better when people search "writing tutor near me."

1. Go to `business.google.com`
2. Find your Writer's Mark, LLC listing
3. **Users → Add user** → enter Ian's email → choose **Manager**

---

## 7. Quick answers to "what happens if..."

**...a client says they never got their booking confirmation?**
Their email provider may have flagged it as spam. Ask them to check there. The booking definitely went through if you got the "New Booking" notification — the appointment is on your Google Calendar.

**...a client wants to reschedule?**
They can reply to their confirmation email, or you can move the slot in Google Calendar — Cal.com syncs both ways.

**...a client doesn't sign the agreement?**
They get auto-reminded by Dropbox Sign. If they decline outright, you get an email. You can always cancel the session and refund them through Stripe.

**...the site goes down?**
It's hosted on Vercel, which has 99.99%+ uptime. If something's actually broken, email Ian — these things are usually fixed in minutes.

**...I want to update my service descriptions, prices, or staff bios?**
Email Ian for now. (Eventually you'll edit these directly through Sanity, the content tool we already wired up — Ian can train you on it in 10 minutes when you're ready.)

**...I want to add a new staff member?**
Send Ian: name, title, credentials, headshot, and a short bio. He'll add them to the "Meet the Staff" page within a day.

---

## 8. The TL;DR

- Clients book and pay through `thewritersmark.us/book`. You do nothing during the booking.
- After every booking you get an email and the session is on your Google Calendar.
- When a client signs their agreement, you get an email — go to `/admin/agreements` and countersign in 30 seconds.
- Your branded logo is on the website, on every email, and on the receipt page. Once you upload it to Stripe (2-min step in Section 6A), it'll be on Stripe's invoices too.
- Reviews go live the moment a client submits them.
- For anything weird, technical, or that doesn't fit into the boxes above — email Ian.

That's it. The whole thing.

— Ian
