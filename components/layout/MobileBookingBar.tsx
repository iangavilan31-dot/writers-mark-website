'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Sticky bottom booking bar — mobile only, appears after hero scroll
export function MobileBookingBar() {
  const pathname = usePathname()

  // Don't show on booking pages
  if (pathname === '/book' || pathname === '/consult' || pathname?.startsWith('/thank-you')) {
    return null
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
    >
      {/* Safe area for iOS home indicator */}
      <div className="bg-white border-t border-border px-4 pt-3 pb-safe-area-inset-bottom"
           style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <div className="flex gap-2">
          <Link
            href="/consult"
            className="flex-1 btn-secondary text-center py-3.5 text-sm justify-center"
          >
            Free Consult
          </Link>
          <Link
            href="/book"
            className="flex-[2] btn-primary text-center py-3.5 text-sm justify-center"
          >
            Book a Session →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
