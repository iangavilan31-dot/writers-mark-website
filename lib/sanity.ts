import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-05-03',
  useCdn: true, // Use CDN for public reads
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// ── Queries ───────────────────────────────────────────────────────────────────

export const STAFF_QUERY = `
  *[_type == "staffMember" && active == true] | order(order asc) {
    _id,
    name,
    title,
    "photo": photo.asset->url,
    credentials,
    specialties,
    bio,
    calLink,
    order
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && approved == true] | order(featured desc, _createdAt desc) {
    _id,
    quote,
    clientName,
    clientRole,
    service,
    rating,
    featured,
    featureOnHomepage
  }
`

export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && approved == true && featureOnHomepage == true][0...3] {
    _id,
    quote,
    clientName,
    clientRole,
    service,
    rating
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    businessEmail,
    businessPhone,
    socialLinks,
    holidaySchedule,
    announcementBanner
  }
`
