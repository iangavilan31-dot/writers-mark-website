import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('reviews')
    .select('id, display_name, service, rating, review_text, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })
    .limit(200)

  if (error) {
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 })
  }

  return NextResponse.json({
    reviews: (data ?? []).map((r) => ({
      id: r.id,
      name: r.display_name,
      service: r.service,
      rating: r.rating,
      text: r.review_text,
    })),
  })
}
