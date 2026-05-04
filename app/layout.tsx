import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { MobileBookingBar } from '@/components/layout/MobileBookingBar'
import { PageTransition } from '@/components/layout/PageTransition'
import { Toaster } from 'sonner'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://thewritersmark.us'),
  title: {
    default: 'The Writer\'s Mark | Expert Writing Tutoring & Consulting | NJ & Nationwide',
    template: '%s | The Writer\'s Mark',
  },
  description: '30+ years of expert writing tutoring, SAT/DSAT prep, college admissions coaching, and professional writing consulting. Fully human. No AI. Based in NJ, serving nationwide.',
  keywords: ['writing tutoring', 'SAT prep', 'DSAT prep', 'college admissions', 'essay coaching', 'professional writing', 'NJ tutoring', 'writing consultant'],
  authors: [{ name: 'The Writer\'s Mark, LLC' }],
  creator: 'The Writer\'s Mark, LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thewritersmark.us',
    siteName: 'The Writer\'s Mark',
    title: 'The Writer\'s Mark | Expert Writing Tutoring & Consulting',
    description: 'Writing Doesn\'t Have to Suck. Expert tutoring and consulting since 1993.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Writer\'s Mark — Writing Doesn\'t Have to Suck.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Writer\'s Mark | Expert Writing Tutoring & Consulting',
    description: 'Writing Doesn\'t Have to Suck. Expert tutoring and consulting since 1993.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A2744',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Plausible Analytics — privacy first, no cookie banner needed */}
        <Script
          defer
          data-domain="thewritersmark.us"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: "The Writer's Mark, LLC",
              url: 'https://thewritersmark.us',
              description: 'Expert writing tutoring, test prep, college admissions coaching, and professional writing consulting since 1993.',
              foundingDate: '1993',
              areaServed: ['New Jersey', 'United States'],
              priceRange: '$80-$170',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Writing Services',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Navigation />
        <main id="main-content">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <MobileBookingBar />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
