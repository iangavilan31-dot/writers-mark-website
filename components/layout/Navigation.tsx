'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const services = [
  {
    category: 'ACADEMIC',
    items: [
      { name: 'Tutoring (K–12)', href: '/services/tutoring' },
      { name: 'ELA Prep', href: '/services/ela-prep' },
      { name: 'DSAT Prep & Essay Writing', href: '/services/dsat-prep' },
      { name: 'Undergraduate Tutoring', href: '/services/undergraduate' },
      { name: 'College Admissions Prep', href: '/services/college-admissions' },
    ],
  },
  {
    category: 'PROFESSIONAL',
    items: [
      { name: 'Professional Writing Consulting', href: '/services/professional-writing' },
      { name: 'Scientific Presentations', href: '/services/scientific-presentations' },
    ],
  },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-content">
          <nav
            className="flex items-center justify-between h-20"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="The Writer's Mark — Home">
              <Image
                src="/logo.jpg"
                alt=""
                width={44}
                height={44}
                priority
                className="rounded-md"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serif font-bold text-lg text-ink tracking-tight transition-colors group-hover:text-navy">
                  The Writer's Mark
                </span>
                <span className="section-label text-[10px] mt-0.5 text-gold">
                  EST. 1993
                </span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Services dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="nav-link flex items-center gap-1 py-2"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-white border border-border rounded-lg shadow-xl p-6"
                      role="menu"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        {services.map((group) => (
                          <div key={group.category}>
                            <p className="section-label text-[10px] mb-3 text-muted">{group.category}</p>
                            <ul className="space-y-1">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="block px-3 py-2 text-sm font-sans font-medium text-ink rounded-sm
                                               hover:bg-cream-dark hover:text-navy transition-colors duration-150 cursor-pointer"
                                    role="menuitem"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 pt-5 border-t border-border flex gap-3">
                        <Link href="/consult" className="btn-secondary py-2.5 px-5 text-xs flex-1 justify-center">
                          Free Consultation
                        </Link>
                        <Link href="/book" className="btn-primary py-2.5 px-5 text-xs flex-1 justify-center">
                          Book a Session
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" className="nav-link">About</Link>
              <Link href="/staff" className="nav-link">Our Team</Link>
              <Link href="/reviews" className="nav-link">Reviews</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/consult" className="btn-secondary py-2.5 px-6 text-sm">
                Free Consult
              </Link>
              <Link href="/book" className="btn-primary py-2.5 px-6 text-sm">
                Book a Session
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -mr-2 text-ink cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex-1 overflow-y-auto pt-24 pb-8 px-6">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-1"
              >
                {/* Mobile Services Accordion */}
                <div>
                  <button
                    className="flex items-center justify-between w-full py-4 font-serif text-2xl text-ink font-medium border-b border-border cursor-pointer"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-expanded={mobileServicesOpen}
                  >
                    Services
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="py-3 pl-4 space-y-4">
                          {services.map((group) => (
                            <div key={group.category}>
                              <p className="section-label text-[10px] mb-2">{group.category}</p>
                              <ul className="space-y-1">
                                {group.items.map((item) => (
                                  <li key={item.href}>
                                    <Link
                                      href={item.href}
                                      className="block py-2 font-sans text-base text-muted hover:text-ink transition-colors cursor-pointer"
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Team', href: '/staff' },
                  { label: 'Reviews', href: '/reviews' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-4 font-serif text-2xl text-ink font-medium border-b border-border cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="mt-8 space-y-3"
              >
                <Link href="/book" className="btn-primary w-full justify-center text-base py-5">
                  Book a Session
                </Link>
                <Link href="/consult" className="btn-secondary w-full justify-center text-base py-5">
                  Free 30-Min Consultation
                </Link>
              </motion.div>

              {/* Mobile footer info */}
              <div className="mt-10 pt-6 border-t border-border">
                <p className="section-label text-[10px] mb-2">THE WRITER'S MARK, LLC</p>
                <p className="font-sans text-sm text-muted">New Jersey · Serving Nationwide</p>
                <p className="font-sans text-sm text-muted">Est. 1993 · 100% Human · No AI</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
