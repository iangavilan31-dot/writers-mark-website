import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const serviceLinks = [
  { name: 'Tutoring (K–12)', href: '/services/tutoring' },
  { name: 'ELA Prep', href: '/services/ela-prep' },
  { name: 'DSAT Prep & Essay Writing', href: '/services/dsat-prep' },
  { name: 'Undergraduate Tutoring', href: '/services/undergraduate' },
  { name: 'Scientific Presentations', href: '/services/scientific-presentations' },
  { name: 'Professional Writing', href: '/services/professional-writing' },
  { name: 'College Admissions Prep', href: '/services/college-admissions' },
]

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Meet the Staff', href: '/staff' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'New Client Agreement', href: '/agreement' },
  { name: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-cream" role="contentinfo">
      {/* Main footer */}
      <div className="container-content py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <p className="font-serif font-bold text-xl text-cream tracking-tight leading-none">
                The Writer's Mark
              </p>
              <p className="section-label text-gold text-[10px] mt-1.5">EST. 1993</p>
            </div>
            <p className="font-sans text-sm text-cream/50 leading-relaxed mb-6">
              Writing Doesn't Have to Suck.
            </p>
            <div className="space-y-2">
              <p className="font-sans text-xs text-cream/40">New Jersey · Serving Nationwide</p>
              <p className="font-sans text-xs text-cream/40">Remote Sessions · In-Person NJ</p>
              <p className="font-sans text-xs text-cream/40">100% Human · No AI</p>
            </div>

            {/* Gold accent line */}
            <div className="mt-8 w-12 h-px bg-gold/40" />
          </div>

          {/* Services column */}
          <div>
            <p className="section-label text-[10px] text-cream/30 mb-5">SERVICES</p>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-150 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="section-label text-[10px] text-cream/30 mb-5">COMPANY</p>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cream/60 hover:text-cream transition-colors duration-150 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <p className="section-label text-[10px] text-cream/30 mb-5">GET STARTED</p>
            <div className="space-y-4">
              <Link
                href="/book"
                className="flex items-center gap-2 font-sans font-semibold text-sm text-gold
                           hover:text-gold-light transition-colors duration-150 group cursor-pointer"
              >
                Book a Session
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/consult"
                className="flex items-center gap-2 font-sans text-sm text-cream/60
                           hover:text-cream transition-colors duration-150 group cursor-pointer"
              >
                Free Consultation
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="mt-8 p-4 border border-white/10 rounded">
              <p className="section-label text-[9px] text-cream/30 mb-2">PAYMENT</p>
              <p className="font-sans text-xs text-cream/40 leading-relaxed">
                Secure checkout via Stripe. NJ Sales Tax (6.625%) applied at checkout. All major credit cards accepted.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-content py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream/30">
            © {new Date().getFullYear()} The Writer's Mark, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/agreement" className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors cursor-pointer">
              Client Agreement
            </Link>
            <Link href="/contact" className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors cursor-pointer">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
