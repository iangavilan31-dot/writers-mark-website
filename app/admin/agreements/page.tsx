import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

export const metadata = {
  title: "Pending Agreements · The Writer's Mark Admin",
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

type AgreementRow = {
  id: string
  client_name: string
  client_email: string
  service: string
  session_date: string | null
  agreement_status: string | null
  dropbox_sign_request_id: string | null
  created_at: string
}

async function loadAgreements(): Promise<{ pending: AgreementRow[]; recent: AgreementRow[]; error: string | null }> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { pending: [], recent: [], error: 'Supabase env vars not configured.' }
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  const { data, error } = await supabase
    .from('bookings')
    .select('id, client_name, client_email, service, session_date, agreement_status, dropbox_sign_request_id, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return { pending: [], recent: [], error: error.message }
  }

  const rows = (data ?? []) as AgreementRow[]
  const pending = rows.filter((r) => r.agreement_status === 'client_signed')
  const recent = rows.filter((r) => r.agreement_status === 'complete').slice(0, 20)

  return { pending, recent, error: null }
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

export default async function AdminAgreementsPage() {
  const { pending, recent, error } = await loadAgreements()

  return (
    <section className="min-h-screen bg-cream pt-32 pb-20">
      <div className="container-content max-w-5xl">
        <div className="flex items-center gap-4 mb-2">
          <Image src="/logo.jpg" alt="" width={48} height={48} className="rounded-md" aria-hidden="true" />
          <div>
            <p className="section-label text-gold mb-1">ADMIN · AGREEMENTS</p>
            <h1 className="font-serif font-bold text-3xl text-ink">Pending Countersignatures</h1>
          </div>
        </div>
        <p className="font-sans text-sm text-muted mb-10 max-w-2xl">
          Clients who have signed their New Client Agreement and are waiting on your countersignature.
          Click <em>Open in Dropbox Sign</em> to countersign.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-8 text-sm">
            <strong>Couldn&rsquo;t load agreements:</strong> {error}
          </div>
        )}

        <div className="bg-white border border-border rounded-lg overflow-hidden mb-12">
          <div className="px-6 py-4 border-b border-border bg-cream-dark/40 flex items-center justify-between">
            <h2 className="font-serif font-semibold text-ink text-lg">Awaiting your signature</h2>
            <span className="font-sans text-xs text-muted">{pending.length} pending</span>
          </div>
          {pending.length === 0 ? (
            <p className="px-6 py-8 font-sans text-sm text-muted text-center">
              Nothing pending. You&rsquo;re all caught up.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left bg-cream-dark/20 text-xs text-muted uppercase tracking-wide">
                  <th className="px-6 py-3 font-sans font-semibold">Client</th>
                  <th className="px-6 py-3 font-sans font-semibold">Service</th>
                  <th className="px-6 py-3 font-sans font-semibold">Booked</th>
                  <th className="px-6 py-3 font-sans font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-6 py-4">
                      <p className="font-sans font-semibold text-sm text-ink">{row.client_name}</p>
                      <p className="font-sans text-xs text-muted">{row.client_email}</p>
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-ink/80">{row.service}</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted">{formatDate(row.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="https://app.hellosign.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2 px-4 text-xs"
                      >
                        Open in Dropbox Sign →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-cream-dark/40 flex items-center justify-between">
            <h2 className="font-serif font-semibold text-ink text-lg">Recently completed</h2>
            <span className="font-sans text-xs text-muted">{recent.length} shown</span>
          </div>
          {recent.length === 0 ? (
            <p className="px-6 py-8 font-sans text-sm text-muted text-center">No completed agreements yet.</p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left bg-cream-dark/20 text-xs text-muted uppercase tracking-wide">
                  <th className="px-6 py-3 font-sans font-semibold">Client</th>
                  <th className="px-6 py-3 font-sans font-semibold">Service</th>
                  <th className="px-6 py-3 font-sans font-semibold">Booked</th>
                  <th className="px-6 py-3 font-sans font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    <td className="px-6 py-4">
                      <p className="font-sans font-semibold text-sm text-ink">{row.client_name}</p>
                      <p className="font-sans text-xs text-muted">{row.client_email}</p>
                    </td>
                    <td className="px-6 py-4 font-sans text-sm text-ink/80">{row.service}</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted">{formatDate(row.created_at)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                        <span className="font-sans text-[10px] text-green-700 font-semibold">Complete</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-10">
          <Link href="/admin" className="font-sans text-sm text-muted hover:text-ink transition-colors">
            ← Back to admin home
          </Link>
        </div>
      </div>
    </section>
  )
}
