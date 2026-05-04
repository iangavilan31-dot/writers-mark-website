import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: "Admin · The Writer's Mark",
  robots: { index: false, follow: false },
}

const tiles = [
  {
    href: '/admin/agreements',
    title: 'Client Agreements',
    desc: 'See pending countersignatures and recently signed agreements.',
  },
  {
    href: '/admin/reviews',
    title: 'Reviews',
    desc: 'Manage submitted reviews. (Stub — reviews currently auto-approve.)',
  },
]

export default function AdminHome() {
  return (
    <section className="min-h-screen bg-cream pt-32 pb-20">
      <div className="container-content max-w-4xl">
        <div className="flex items-center gap-4 mb-10">
          <Image src="/logo.jpg" alt="" width={56} height={56} className="rounded-md" aria-hidden="true" />
          <div>
            <p className="section-label text-gold mb-1">ADMIN</p>
            <h1 className="font-serif font-bold text-3xl text-ink">The Writer&rsquo;s Mark Console</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block bg-white border border-border rounded-lg p-6 hover:border-gold transition-colors duration-150"
            >
              <p className="font-serif font-semibold text-lg text-ink mb-1">{t.title}</p>
              <p className="font-sans text-sm text-muted">{t.desc}</p>
            </Link>
          ))}
        </div>

        <p className="font-sans text-xs text-muted mt-10">
          This area is restricted to The Writer&rsquo;s Mark, LLC owner.
        </p>
      </div>
    </section>
  )
}
