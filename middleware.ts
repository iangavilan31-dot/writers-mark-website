import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  const response = NextResponse.next()

  // ── 1. QR/UTM persistence ──────────────────────────────────────────────────
  // When a user arrives via a UTM-tagged URL, store params in a cookie
  // so they persist through the booking flow even if the URL changes
  const utmSource = searchParams.get('utm_source')
  const utmCampaign = searchParams.get('utm_campaign')

  if (utmSource) {
    response.cookies.set('utm_source', utmSource, {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  if (utmCampaign) {
    response.cookies.set('utm_campaign', utmCampaign, {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: 'lax',
    })
  }

  // ── 2. Admin route protection ──────────────────────────────────────────────
  // Password protection is disabled until a permanent password is configured.
  // To enable: set ADMIN_PASSWORD in Vercel env vars and uncomment the block below.
  //
  // if (pathname.startsWith('/admin')) {
  //   const authHeader = req.headers.get('authorization')
  //   if (!authHeader || !authHeader.startsWith('Basic ')) {
  //     return new NextResponse('Authentication required', {
  //       status: 401,
  //       headers: { 'WWW-Authenticate': 'Basic realm="The Writer\'s Mark Admin"' },
  //     })
  //   }
  //   const [, password] = Buffer.from(authHeader.slice(6), 'base64').toString().split(':')
  //   if (password !== process.env.ADMIN_PASSWORD) {
  //     return new NextResponse('Invalid credentials', {
  //       status: 401,
  //       headers: { 'WWW-Authenticate': 'Basic realm="The Writer\'s Mark Admin"' },
  //     })
  //   }
  // }

  // ── 3. Service-specific booking deep links ────────────────────────────────
  // /book/[service] → /book?service=[service]
  // This allows QR codes to use clean URLs like /book/dsat-prep
  const bookMatch = pathname.match(/^\/book\/(.+)$/)
  if (bookMatch) {
    const serviceSlug = bookMatch[1]
    const url = req.nextUrl.clone()
    url.pathname = '/book'
    url.searchParams.set('service', serviceSlug)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/book/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
