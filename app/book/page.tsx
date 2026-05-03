'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { SERVICE_LIST, calculatePricing, type ServiceSlug } from '@/lib/services'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

type Step = 'select-service' | 'schedule' | 'details' | 'payment'

function BookingFlow() {
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get('service') as ServiceSlug | null
  const utmSource = searchParams.get('utm_source') ?? ''
  const utmCampaign = searchParams.get('utm_campaign') ?? ''

  const [step, setStep] = useState<Step>(preselectedService ? 'schedule' : 'select-service')
  const [selectedService, setSelectedService] = useState<ServiceSlug | null>(preselectedService)
  const [calBookingUid, setCalBookingUid] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const [clientForm, setClientForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    studentName: '',
    studentGrade: '',
    notes: '',
  })

  const service = selectedService ? SERVICE_LIST.find(s => s.slug === selectedService) : null
  const pricing = service ? calculatePricing(service.ratePerHour) : null

  // Listen for Cal.com booking event (they fire a postMessage)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'CAL:BOOKING_SUCCESSFUL') {
        setCalBookingUid(e.data?.data?.uid ?? '')
        setStep('details')
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleCheckout = async () => {
    if (!selectedService || !service || !pricing) return
    setIsLoading(true)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: selectedService,
          ...clientForm,
          calBookingUid,
          utmSource,
          utmCampaign,
        }),
      })

      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const steps: { key: Step; label: string }[] = [
    { key: 'select-service', label: 'Service' },
    { key: 'schedule', label: 'Schedule' },
    { key: 'details', label: 'Your Info' },
    { key: 'payment', label: 'Payment' },
  ]

  const currentStepIndex = steps.findIndex(s => s.key === step)

  return (
    <div className="min-h-screen bg-cream-dark/30 pt-28 pb-20">
      <div className="container-content max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <p className="section-label mb-3">BOOKING</p>
          <h1 className="heading-xl text-ink mb-3">Book Your Session</h1>
          <p className="body-lg">
            Select your service, choose a time, and pay securely. Your confirmation,
            invoice, and client agreement will arrive by email instantly.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-2 ${i <= currentStepIndex ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < currentStepIndex
                    ? 'bg-gold text-ink'
                    : i === currentStepIndex
                    ? 'bg-ink text-cream'
                    : 'bg-border text-muted'
                }`}>
                  {i < currentStepIndex ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="font-sans text-sm font-medium text-ink">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={14} className="text-border flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          {/* STEP 1: Select Service */}
          {step === 'select-service' && (
            <motion.div
              key="select-service"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-border rounded-lg p-8">
                <h2 className="heading-md text-ink mb-6">Which service are you booking?</h2>
                <div className="space-y-2">
                  {SERVICE_LIST.map((svc) => {
                    const pricing = calculatePricing(svc.ratePerHour)
                    return (
                      <button
                        key={svc.slug}
                        onClick={() => {
                          setSelectedService(svc.slug)
                          setStep('schedule')
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded border cursor-pointer transition-all duration-150 text-left
                          ${selectedService === svc.slug
                            ? 'border-gold bg-gold/5'
                            : 'border-border hover:border-ink/30 hover:bg-cream-dark'
                          }`}
                        aria-pressed={selectedService === svc.slug}
                      >
                        <div>
                          <p className="font-sans font-semibold text-sm text-ink">{svc.name}</p>
                          <p className="section-label text-[10px] mt-0.5 text-gold">
                            {svc.category.toUpperCase()}
                          </p>
                        </div>
                        <span className="font-sans font-semibold text-sm text-muted whitespace-nowrap ml-4">
                          ${svc.ratePerHour}/hr
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="font-sans text-xs text-muted mt-6">
                  Not sure? <a href="/consult" className="text-ink underline cursor-pointer">Start with a free consultation →</a>
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Schedule (Cal.com embed) */}
          {step === 'schedule' && service && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="px-8 py-5 border-b border-border flex items-center justify-between">
                  <div>
                    <p className="section-label text-[10px] mb-1">SELECTED SERVICE</p>
                    <p className="font-serif font-semibold text-lg text-ink">{service.name}</p>
                  </div>
                  <button
                    onClick={() => setStep('select-service')}
                    className="font-sans text-xs text-muted hover:text-ink underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
                <div className="p-4">
                  {/* Cal.com inline embed */}
                  {/* Replace YOUR_CAL_USERNAME with actual Cal.com username */}
                  <iframe
                    src={`https://cal.com/the-writers-mark/${service.calEventSlug}?embed=true&embedType=inline&layout=month_view`}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title={`Schedule ${service.name}`}
                    className="rounded"
                  />
                  {/* Cal.com fires postMessage on booking — caught by useEffect above */}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Client Details */}
          {step === 'details' && service && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-border rounded-lg p-8">
                <h2 className="heading-md text-ink mb-6">Your Information</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label" htmlFor="clientName">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="clientName"
                        type="text"
                        className="form-input"
                        placeholder="Jane Smith"
                        required
                        autoComplete="name"
                        value={clientForm.clientName}
                        onChange={e => setClientForm(f => ({ ...f, clientName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="clientEmail">
                        Email Address <span className="text-gold">*</span>
                      </label>
                      <input
                        id="clientEmail"
                        type="email"
                        className="form-input"
                        placeholder="jane@email.com"
                        required
                        autoComplete="email"
                        value={clientForm.clientEmail}
                        onChange={e => setClientForm(f => ({ ...f, clientEmail: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="form-label" htmlFor="clientPhone">Phone Number (optional)</label>
                    <input
                      id="clientPhone"
                      type="tel"
                      className="form-input"
                      placeholder="(201) 555-0100"
                      autoComplete="tel"
                      value={clientForm.clientPhone}
                      onChange={e => setClientForm(f => ({ ...f, clientPhone: e.target.value }))}
                    />
                  </div>
                  {/* Student fields — shown for academic services */}
                  {(service.category === 'academic' || service.category === 'test-prep' || service.category === 'admissions') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label" htmlFor="studentName">Student Name (if booking for a child)</label>
                        <input
                          id="studentName"
                          type="text"
                          className="form-input"
                          placeholder="Alex Smith"
                          value={clientForm.studentName}
                          onChange={e => setClientForm(f => ({ ...f, studentName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="studentGrade">Grade Level / Year</label>
                        <input
                          id="studentGrade"
                          type="text"
                          className="form-input"
                          placeholder="e.g. 9th grade, College Junior"
                          value={clientForm.studentGrade}
                          onChange={e => setClientForm(f => ({ ...f, studentGrade: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="form-label" htmlFor="notes">Goals or Notes for This Session (optional)</label>
                    <textarea
                      id="notes"
                      className="form-input resize-none"
                      rows={3}
                      placeholder="What do you hope to accomplish? Any specific challenges or assignments to focus on?"
                      value={clientForm.notes}
                      onChange={e => setClientForm(f => ({ ...f, notes: e.target.value }))}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!clientForm.clientName || !clientForm.clientEmail}
                  className="btn-primary mt-8 w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Payment Summary */}
          {step === 'payment' && service && pricing && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-border rounded-lg p-8">
                <h2 className="heading-md text-ink mb-6">Review & Pay</h2>

                {/* Summary */}
                <div className="bg-cream-dark rounded p-5 mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">Service</span>
                    <span className="font-sans font-semibold text-sm text-ink">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">Duration</span>
                    <span className="font-sans text-sm text-ink">60 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">Client</span>
                    <span className="font-sans text-sm text-ink">{clientForm.clientName}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">Session Rate</span>
                    <span className="font-sans text-sm text-ink">${pricing.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">NJ Sales Tax (6.625%)</span>
                    <span className="font-sans text-sm text-ink">${pricing.njTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-sm text-muted">CC Processing Fee (3%)</span>
                    <span className="font-sans text-sm text-ink">${pricing.ccFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-sans font-bold text-base text-ink">Total Due</span>
                    <span className="font-sans font-bold text-base text-ink">${pricing.total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="btn-primary w-full justify-center py-5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Redirecting to Stripe...' : `Pay $${pricing.total.toFixed(2)} Securely →`}
                </button>

                <p className="font-sans text-xs text-muted text-center mt-4">
                  🔒 Secured by Stripe. Your card information never touches our servers.
                </p>
                <p className="font-sans text-xs text-muted text-center mt-2">
                  After payment: you'll receive a confirmation email, invoice, Google Calendar invite, and client agreement to sign — all automatically.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Export with Suspense wrapper (required for useSearchParams)
export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream-dark/30 pt-28 flex items-center justify-center">
        <div className="animate-pulse-gold w-12 h-12 rounded-full border-2 border-gold" />
      </div>
    }>
      <BookingFlow />
    </Suspense>
  )
}
