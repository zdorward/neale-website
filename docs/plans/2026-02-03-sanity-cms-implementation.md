# Sanity CMS Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Sanity CMS so Neale can edit all website content through a visual interface at `/studio`.

**Architecture:** Sanity Studio embedded in Next.js at `/studio` route. Content stored in Sanity's hosted database. Pages fetch content via GROQ queries at build/request time. Singleton documents for pages, repeatable documents for practice areas.

**Tech Stack:** Sanity v3, next-sanity, @sanity/image-url, GROQ queries

---

## Task 1: Initialize Sanity Project

**Step 1: Install Sanity dependencies**

Run:
```bash
cd /Users/zackdorward/dev/neale-website && npm install sanity next-sanity @sanity/image-url @sanity/vision
```

**Step 2: Create Sanity project**

Run:
```bash
cd /Users/zackdorward/dev/neale-website && npx sanity@latest init --env --create-project "Neale Gold Law" --dataset production
```

When prompted:
- Select "Clean project with no predefined schema types"
- Output path: use default (current directory)

This creates `sanity.config.ts` and `.env.local` with project credentials.

**Step 3: Commit**

```bash
git add -A && git commit -m "feat: initialize Sanity project"
```

---

## Task 2: Create Sanity Schema Types

**Files:**
- Create: `sanity/schemaTypes/homePage.ts`
- Create: `sanity/schemaTypes/aboutPage.ts`
- Create: `sanity/schemaTypes/contactPage.ts`
- Create: `sanity/schemaTypes/practiceArea.ts`
- Create: `sanity/schemaTypes/index.ts`
- Create: `sanity/schema.ts`

**Step 1: Create homePage schema**

Create `sanity/schemaTypes/homePage.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
```

**Step 2: Create aboutPage schema**

Create `sanity/schemaTypes/aboutPage.ts`:

```typescript
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
```

**Step 3: Create contactPage schema**

Create `sanity/schemaTypes/contactPage.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headerText',
      title: 'Header Text',
      type: 'string',
    }),
    defineField({
      name: 'officeAddress',
      title: 'Office Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'confidentialityNote',
      title: 'Confidentiality Note',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' }
    },
  },
})
```

**Step 4: Create practiceArea schema**

Create `sanity/schemaTypes/practiceArea.ts`:

```typescript
import { defineType, defineField } from 'sanity'

export const practiceArea = defineType({
  name: 'practiceArea',
  title: 'Practice Area',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
```

**Step 5: Create schema index**

Create `sanity/schemaTypes/index.ts`:

```typescript
export { homePage } from './homePage'
export { aboutPage } from './aboutPage'
export { contactPage } from './contactPage'
export { practiceArea } from './practiceArea'
```

**Step 6: Create main schema file**

Create `sanity/schema.ts`:

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { homePage, aboutPage, contactPage, practiceArea } from './schemaTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, contactPage, practiceArea],
}
```

**Step 7: Commit**

```bash
git add sanity/ && git commit -m "feat: add Sanity schema types"
```

---

## Task 3: Configure Sanity Studio

**Files:**
- Create: `sanity.config.ts`
- Create: `app/studio/[[...tool]]/page.tsx`

**Step 1: Create Sanity config**

Create `sanity.config.ts` (or update if it exists):

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'neale-gold-law',
  title: 'Neale Gold Law',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Contact Page')
              .id('contactPage')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
            S.divider(),
            S.documentTypeListItem('practiceArea').title('Practice Areas'),
          ]),
    }),
    visionTool(),
  ],
  schema,
})
```

**Step 2: Create Studio route**

Create `app/studio/[[...tool]]/page.tsx`:

```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**Step 3: Commit**

```bash
git add sanity.config.ts app/studio && git commit -m "feat: configure Sanity Studio at /studio"
```

---

## Task 4: Create Sanity Client and Queries

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/image.ts`

**Step 1: Create Sanity client**

Create `sanity/lib/client.ts`:

```typescript
import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
```

**Step 2: Create GROQ queries**

Create `sanity/lib/queries.ts`:

```typescript
import { groq } from 'next-sanity'

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroHeadline,
  heroDescription,
  aboutHeading,
  aboutText
}`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  photo,
  introParagraph,
  experienceHeading,
  experienceText,
  education,
  awards
}`

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  headerText,
  officeAddress,
  phone,
  email,
  confidentialityNote
}`

export const practiceAreasQuery = groq`*[_type == "practiceArea"] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description,
  featured,
  order
}`

export const featuredPracticeAreasQuery = groq`*[_type == "practiceArea" && featured == true] | order(order asc){
  _id,
  title,
  "slug": slug.current,
  description
}`
```

**Step 3: Create image helper**

Create `sanity/lib/image.ts`:

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

**Step 4: Commit**

```bash
git add sanity/lib && git commit -m "feat: add Sanity client and GROQ queries"
```

---

## Task 5: Update Pages to Fetch from Sanity

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/practice-areas/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `components/Footer.tsx`

**Step 1: Update Home page**

Replace `app/page.tsx`:

```typescript
import Link from "next/link";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import { client } from "@/sanity/lib/client";
import { homePageQuery, featuredPracticeAreasQuery } from "@/sanity/lib/queries";

async function getData() {
  const [homePage, practiceAreas] = await Promise.all([
    client.fetch(homePageQuery),
    client.fetch(featuredPracticeAreasQuery),
  ]);
  return { homePage, practiceAreas };
}

export default async function Home() {
  const { homePage, practiceAreas } = await getData();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-sage py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl text-white mb-6">
            {homePage?.heroHeadline || "Appellate Litigation in California"}
          </h1>
          <p className="text-lg text-sage-light mb-8 max-w-2xl mx-auto">
            {homePage?.heroDescription || "Over 800 appeals litigated. Practicing in all six California appellate districts."}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* Practice Areas Preview */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center text-charcoal mb-12">
            How I Can Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {practiceAreas?.length > 0 ? (
              practiceAreas.map((area: any) => (
                <PracticeAreaCard
                  key={area._id}
                  title={area.title}
                  description={area.description}
                  href={`/practice-areas#${area.slug}`}
                />
              ))
            ) : (
              <>
                <PracticeAreaCard title="Appeals" description="Reviewing trial court records and presenting compelling arguments." href="/practice-areas#appeals" />
                <PracticeAreaCard title="Writs" description="Extraordinary and emergency relief from the Court of Appeal." href="/practice-areas#writs" />
                <PracticeAreaCard title="Legal Research" description="Thorough research and preparation of pleadings." href="/practice-areas#research" />
              </>
            )}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/practice-areas"
              className="text-sage hover:text-sage-dark underline transition-colors"
            >
              View All Practice Areas
            </Link>
          </div>
        </div>
      </section>

      {/* Brief About Section */}
      <section className="bg-cream-dark py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl text-charcoal mb-6">
            {homePage?.aboutHeading || "Appellate Excellence Since 2007"}
          </h2>
          <p className="text-charcoal-light mb-8">
            {homePage?.aboutText || "I combine appellate intellectual rigor with empathic problem-solving skills to deliver outstanding representation."}
          </p>
          <Link
            href="/about"
            className="inline-block border-2 border-sage text-sage hover:bg-sage hover:text-white font-semibold py-3 px-8 rounded transition-colors"
          >
            Learn More About Me
          </Link>
        </div>
      </section>
    </div>
  );
}
```

**Step 2: Update About page**

Replace `app/about/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "About | Neale Gold - Appellate Attorney",
  description:
    "Learn about Neale Gold's background, experience, and approach to appellate litigation in California.",
};

async function getData() {
  return client.fetch(aboutPageQuery);
}

export default async function About() {
  const aboutPage = await getData();

  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">About Neale Gold</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Photo */}
          <div className="w-48 h-48 bg-cream-dark rounded-full mx-auto mb-10 flex items-center justify-center overflow-hidden">
            {aboutPage?.photo ? (
              <Image
                src={urlFor(aboutPage.photo).width(192).height(192).url()}
                alt="Neale Gold"
                width={192}
                height={192}
                className="object-cover"
              />
            ) : (
              <span className="text-charcoal-light text-sm">Photo</span>
            )}
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-charcoal-light mb-6 text-lg">
              {aboutPage?.introParagraph || "Neale Gold is the principal attorney at Law Offices of Neale Gold, Professional Corporation, an appellate law firm in San Diego, California."}
            </p>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              {aboutPage?.experienceHeading || "Experience & Recognition"}
            </h2>
            {aboutPage?.experienceText ? (
              <div className="text-charcoal-light mb-6">
                <PortableText value={aboutPage.experienceText} />
              </div>
            ) : (
              <p className="text-charcoal-light mb-6">
                Neale practices in all six appellate districts within California and has litigated over 800 appeals since 2007.
              </p>
            )}

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Education & Admissions
            </h2>
            <ul className="text-charcoal-light mb-6 list-disc list-inside space-y-2">
              {aboutPage?.education?.length > 0 ? (
                aboutPage.education.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <>
                  <li>J.D., California Western School of Law, 2003</li>
                  <li>Member, United States Supreme Court Bar</li>
                  <li>Admitted to all six California Appellate Districts</li>
                </>
              )}
            </ul>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Awards & Recognition
            </h2>
            <ul className="text-charcoal-light mb-6 list-disc list-inside space-y-2">
              {aboutPage?.awards?.length > 0 ? (
                aboutPage.awards.map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))
              ) : (
                <>
                  <li>Paul Bell Award recipient</li>
                  <li>Super Lawyer designation (2023–present)</li>
                  <li>Top Rated Appellate Attorney</li>
                </>
              )}
            </ul>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 3: Update Practice Areas page**

Replace `app/practice-areas/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { practiceAreasQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Practice Areas | Neale Gold - Appellate Attorney",
  description:
    "Appellate litigation services including appeals, writs, legal research, and creative problem solving in California.",
};

async function getData() {
  return client.fetch(practiceAreasQuery);
}

export default async function PracticeAreas() {
  const practiceAreas = await getData();

  const defaultAreas = [
    { slug: "appeals", title: "Appeals", description: "Neale will review the trial court record, select appellate issues for review, research and write appellate briefs, present oral argument, and file petitions for rehearing, or review in the California Supreme Court." },
    { slug: "writs", title: "Statutory & Common Law Writs", description: "Neale will prepare original or statutory writs where an appellate remedy is unavailable and the client is seeking extraordinary and emergency relief from the Court of Appeal." },
    { slug: "research", title: "Legal Research, Law, & Motion", description: "Neale will provide research on any relevant legal issue, assist in setting up an issue in trial court proceedings for appropriate appellate preservation." },
    { slug: "problem-solving", title: "Creative Problem Solving", description: "Neale will use the combination of her appellate intellectual rigor with her empathic social work skills to assist clients with creative problem solving." },
  ];

  const areas = practiceAreas?.length > 0 ? practiceAreas : defaultAreas;

  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">Practice Areas</h1>
          <p className="text-sage-light mt-4">
            Appellate litigation services throughout California
          </p>
        </div>
      </section>

      {/* Practice Areas List */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {areas.map((area: any) => (
              <div
                key={area.slug || area._id}
                id={area.slug}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl text-sage-dark mb-3">{area.title}</h2>
                <p className="text-charcoal-light">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 p-8 bg-cream-dark rounded-lg">
            <h3 className="text-xl text-charcoal mb-4">
              Questions About Your Appeal?
            </h3>
            <p className="text-charcoal-light mb-6">
              Every case is unique. Contact me to discuss how I can help with
              your appellate matter.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 4: Update Contact page**

Replace `app/contact/page.tsx`:

```typescript
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact | Neale Gold - Appellate Attorney",
  description:
    "Contact Neale Gold for a consultation about your appellate matter in California.",
};

async function getData() {
  return client.fetch(contactPageQuery);
}

export default async function Contact() {
  const contactPage = await getData();

  const address = contactPage?.officeAddress || "402 W. Broadway\nSuite 400\nSan Diego, California 92101";
  const phone = contactPage?.phone || "(858) 344-0747";
  const email = contactPage?.email || "nealegold@ngoldlaw.com";
  const confidentiality = contactPage?.confidentialityNote || "All communications are treated with the utmost confidentiality. The information you share will only be used to evaluate your case and will not be disclosed to third parties.";

  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">Contact</h1>
          <p className="text-sage-light mt-4">
            {contactPage?.headerText || "Let's discuss your appeal"}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl text-charcoal mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl text-charcoal mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Office</h3>
                  <p className="text-charcoal-light whitespace-pre-line">
                    {address}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                  <a
                    href={`tel:${phone.replace(/[^\d]/g, '')}`}
                    className="text-sage hover:text-sage-dark transition-colors"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-sage hover:text-sage-dark transition-colors"
                  >
                    {email}
                  </a>
                </div>

                <div className="bg-cream-dark p-6 rounded-lg mt-8">
                  <h3 className="font-semibold text-charcoal mb-2">
                    Confidentiality
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    {confidentiality}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

**Step 5: Update Footer**

Replace `components/Footer.tsx`:

```typescript
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

async function getData() {
  return client.fetch(contactPageQuery);
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const contactPage = await getData();

  const phone = contactPage?.phone || "(858) 344-0747";
  const email = contactPage?.email || "nealegold@ngoldlaw.com";
  const addressLines = (contactPage?.officeAddress || "402 W. Broadway, Suite 400\nSan Diego, CA 92101").split('\n');

  return (
    <footer className="bg-sage-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">Neale Gold</h3>
            <p className="text-sage-light text-sm">
              Appellate Attorney
              <br />
              San Diego, California
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-sage-light hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-sage-light hover:text-white transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-light hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-sage-light">
              {addressLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
              <li>
                <a href={`tel:${phone.replace(/[^\d]/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage mt-8 pt-8 text-center text-sm text-sage-light">
          <p>&copy; {currentYear} Law Offices of Neale Gold, P.C. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 6: Install PortableText**

Run:
```bash
npm install @portabletext/react
```

**Step 7: Commit**

```bash
git add -A && git commit -m "feat: update pages to fetch content from Sanity"
```

---

## Task 6: Update Environment and Deploy

**Step 1: Create .env.example**

Create `.env.example`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

**Step 2: Add .env.local to .gitignore if not present**

Verify `.gitignore` contains `.env.local`.

**Step 3: Verify build**

Run:
```bash
npm run build
```

**Step 4: Commit and push**

```bash
git add -A && git commit -m "feat: complete Sanity CMS integration" && git push
```

**Step 5: Add environment variables to Vercel**

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` with your project ID
3. Add `NEXT_PUBLIC_SANITY_DATASET` with value `production`
4. Redeploy

---

## Task 7: Seed Initial Content

After deployment, go to `/studio` and create:

1. **Home Page** document with current content
2. **About Page** document with current content
3. **Contact Page** document with current content
4. **Practice Areas** (4 documents) with current content

This populates Sanity with the existing website content so nothing is lost.

---

## Summary

After completing all tasks:
- Sanity Studio available at `/studio`
- All pages fetch content from Sanity with fallbacks
- Neale can edit all content through visual interface
- Contact info in footer syncs with Contact page
- Environment variables needed for deployment
