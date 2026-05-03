// All services with pricing — single source of truth

export type ServiceSlug =
  | 'tutoring-k5'
  | 'tutoring-68'
  | 'tutoring-912'
  | 'ela-prep'
  | 'dsat-prep'
  | 'essay-competition'
  | 'undergrad'
  | 'scientific'
  | 'professional-writing'
  | 'editing'
  | 'college-admissions'
  | 'free-consult'

export interface Service {
  slug: ServiceSlug
  name: string
  shortName: string
  ratePerHour: number // in dollars
  isFree: boolean
  category: 'academic' | 'test-prep' | 'professional' | 'admissions'
  calEventSlug: string
  href: string
  stripeProductId?: string // filled in after Stripe product creation
}

export const SERVICES: Record<ServiceSlug, Service> = {
  'tutoring-k5': {
    slug: 'tutoring-k5',
    name: 'Tutoring (K–5)',
    shortName: 'K–5 Tutoring',
    ratePerHour: 100,
    isFree: false,
    category: 'academic',
    calEventSlug: 'tutoring-k5',
    href: '/services/tutoring',
  },
  'tutoring-68': {
    slug: 'tutoring-68',
    name: 'Tutoring (Grades 6–8)',
    shortName: '6–8 Tutoring',
    ratePerHour: 110,
    isFree: false,
    category: 'academic',
    calEventSlug: 'tutoring-68',
    href: '/services/tutoring',
  },
  'tutoring-912': {
    slug: 'tutoring-912',
    name: 'Tutoring (Grades 9–12)',
    shortName: '9–12 Tutoring',
    ratePerHour: 120,
    isFree: false,
    category: 'academic',
    calEventSlug: 'tutoring-912',
    href: '/services/tutoring',
  },
  'ela-prep': {
    slug: 'ela-prep',
    name: 'ELA Prep',
    shortName: 'ELA Prep',
    ratePerHour: 100,
    isFree: false,
    category: 'academic',
    calEventSlug: 'ela-prep',
    href: '/services/ela-prep',
  },
  'dsat-prep': {
    slug: 'dsat-prep',
    name: 'DSAT Prep',
    shortName: 'DSAT Prep',
    ratePerHour: 120,
    isFree: false,
    category: 'test-prep',
    calEventSlug: 'dsat-prep',
    href: '/services/dsat-prep',
  },
  'essay-competition': {
    slug: 'essay-competition',
    name: 'Competitive Essay Writing',
    shortName: 'Essay Competition',
    ratePerHour: 120,
    isFree: false,
    category: 'test-prep',
    calEventSlug: 'essay-competition',
    href: '/services/dsat-prep',
  },
  'undergrad': {
    slug: 'undergrad',
    name: 'Undergraduate Tutoring',
    shortName: 'Undergraduate',
    ratePerHour: 110,
    isFree: false,
    category: 'academic',
    calEventSlug: 'undergrad',
    href: '/services/undergraduate',
  },
  'scientific': {
    slug: 'scientific',
    name: 'Scientific Presentations',
    shortName: 'Scientific Presentations',
    ratePerHour: 120,
    isFree: false,
    category: 'professional',
    calEventSlug: 'scientific',
    href: '/services/scientific-presentations',
  },
  'professional-writing': {
    slug: 'professional-writing',
    name: 'Professional Writing Consulting',
    shortName: 'Professional Writing',
    ratePerHour: 120,
    isFree: false,
    category: 'professional',
    calEventSlug: 'professional-writing',
    href: '/services/professional-writing',
  },
  'editing': {
    slug: 'editing',
    name: 'Editing & Proofreading',
    shortName: 'Editing',
    ratePerHour: 80,
    isFree: false,
    category: 'professional',
    calEventSlug: 'editing',
    href: '/services/professional-writing',
  },
  'college-admissions': {
    slug: 'college-admissions',
    name: 'College Admissions Prep',
    shortName: 'College Admissions',
    ratePerHour: 100,
    isFree: false,
    category: 'admissions',
    calEventSlug: 'college-admissions',
    href: '/services/college-admissions',
  },
  'free-consult': {
    slug: 'free-consult',
    name: 'Free 30-Minute Consultation',
    shortName: 'Free Consultation',
    ratePerHour: 0,
    isFree: true,
    category: 'academic',
    calEventSlug: 'free-consult',
    href: '/consult',
  },
}

export const SERVICE_LIST = Object.values(SERVICES).filter((s) => !s.isFree)

// NJ Sales Tax rate — verify with NJ DOR for service exemptions
export const NJ_TAX_RATE = 0.06625

// Credit card processing fee passed through to client
export const CC_FEE_RATE = 0.03

export function calculatePricing(ratePerHour: number) {
  const subtotal = ratePerHour
  const njTax = Math.round(subtotal * NJ_TAX_RATE * 100) / 100
  const subtotalWithTax = subtotal + njTax
  const ccFee = Math.round(subtotalWithTax * CC_FEE_RATE * 100) / 100
  const total = Math.round((subtotalWithTax + ccFee) * 100) / 100

  return {
    subtotal,
    njTax,
    ccFee,
    total,
    subtotalCents: Math.round(subtotal * 100),
    njTaxCents: Math.round(njTax * 100),
    ccFeeCents: Math.round(ccFee * 100),
    totalCents: Math.round(total * 100),
  }
}
