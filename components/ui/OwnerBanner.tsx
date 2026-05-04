'use client'

import { useState } from 'react'
import Link from 'next/link'

export function OwnerBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t-2 border-gold px-4 py-3 flex items-center justify-between gap-4 sm:px-8">
      <p className="font-sans text-sm text-cream">
        <span className="text-gold font-semibold">Hi Joseph 👋</span>
        {' '}— New to the site? Click here for a plain-English guide to everything.
      </p>
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link
          href="/owner-guide"
          className="btn-primary py-2 px-5 text-sm whitespace-nowrap"
        >
          Owner's Guide →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-cream/40 hover:text-cream transition-colors text-xl leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}
