// Sanity schema definitions — import all schemas here

export const staffMember = {
  name: 'staffMember',
  title: 'Staff Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g. "Lead Writing Tutor & DSAT Specialist"',
      validation: (R: any) => R.required(),
    },
    {
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
      description: 'Square photo preferred. Will be cropped to circle.',
    },
    {
      name: 'credentials',
      title: 'Credentials / Education',
      type: 'text',
      description: 'e.g. "M.A. English, Rutgers University · B.A. Communications, Montclair State"',
    },
    {
      name: 'specialties',
      title: 'Specialty Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'ELA Prep',
          'DSAT Prep',
          'Competitive Essay',
          'College Admissions',
          'K–12 Tutoring',
          'Undergraduate',
          'Scientific Presentations',
          'Professional Writing',
          'Editing',
          'Environmental Writing',
        ],
      },
    },
    {
      name: 'bio',
      title: 'Full Bio',
      type: 'array',
      of: [{ type: 'block' }],
      description: '150–200 words recommended.',
    },
    {
      name: 'calLink',
      title: 'Cal.com Event Link (optional)',
      type: 'url',
      description: 'If this staff member has their own Cal.com booking link, paste it here.',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Owner appears at 1.',
      initialValue: 10,
    },
    {
      name: 'active',
      title: 'Active (show on site)',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}

export const testimonial = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'The client review text.',
      validation: (R: any) => R.required().min(20),
    },
    {
      name: 'clientName',
      title: 'Client Display Name',
      type: 'string',
      description: 'e.g. "Parent of 11th Grader" or "Environmental Consultant"',
    },
    {
      name: 'clientRole',
      title: 'Location / Context',
      type: 'string',
      description: 'e.g. "Maplewood, NJ" or "Rutgers University"',
    },
    {
      name: 'service',
      title: 'Service Used',
      type: 'string',
      options: {
        list: [
          'K–12 Tutoring',
          'ELA Prep',
          'DSAT Prep',
          'Competitive Essay Writing',
          'Undergraduate Tutoring',
          'Scientific Presentations',
          'Professional Writing',
          'College Admissions',
          'Editing',
        ],
      },
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    },
    {
      name: 'approved',
      title: 'Approved for display',
      type: 'boolean',
      description: 'Toggle ON to publish this testimonial.',
      initialValue: false,
    },
    {
      name: 'featured',
      title: 'Featured (appears prominently)',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'featureOnHomepage',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: ['Direct submission', 'Google Review', 'Email', 'Manual entry'],
      },
      initialValue: 'Direct submission',
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'service',
    },
  },
}

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // Prevent accidental deletion
  fields: [
    {
      name: 'businessEmail',
      title: 'Business Email',
      type: 'string',
    },
    {
      name: 'businessPhone',
      title: 'Business Phone',
      type: 'string',
      description: 'Displayed in footer and contact page if provided.',
    },
    {
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      description: 'Optional banner shown at top of site (e.g. holiday hours, special offer)',
      fields: [
        { name: 'active', type: 'boolean', title: 'Show Banner', initialValue: false },
        { name: 'text', type: 'string', title: 'Banner Text' },
        { name: 'link', type: 'url', title: 'Banner Link (optional)' },
        { name: 'linkText', type: 'string', title: 'Link Text (optional)' },
      ],
    },
    {
      name: 'holidaySchedule',
      title: 'Holiday / Closure Notice',
      type: 'text',
      description: 'Displayed on booking page if sessions are temporarily unavailable.',
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'facebook', type: 'url', title: 'Facebook URL' },
        { name: 'instagram', type: 'url', title: 'Instagram URL' },
      ],
    },
  ],
}

// Export all schemas as array for Sanity config
export const schemaTypes = [staffMember, testimonial, siteSettings]
