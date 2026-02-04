import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'introParagraph',
      title: 'Introduction Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'experienceHeading',
      title: 'Experience Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'experienceText',
      title: 'Experience Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'education',
      title: 'Education & Admissions',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
