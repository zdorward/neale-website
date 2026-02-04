# Sanity CMS Integration Design

## Overview

Add Sanity CMS to the Neale Gold website so Neale can edit all content herself through a visual interface at `/studio`.

## Content Schema

**Singleton Documents (one of each):**
- **homePage** - hero headline, hero description, about section heading, about section text
- **aboutPage** - intro paragraph, experience text, education list, awards list, photo
- **contactPage** - header text, office address, phone, email, confidentiality note

**Repeatable Documents:**
- **practiceArea** - id, title, description, order (for sorting), featured (boolean for homepage)

Contact info from contactPage will also be used in the Footer.

## Technical Architecture

**Packages:**
- `sanity` - CMS framework
- `next-sanity` - Next.js integration
- `@sanity/image-url` - image handling

**File Structure:**
```
neale-website/
├── sanity/
│   ├── schemaTypes/
│   │   ├── homePage.ts
│   │   ├── aboutPage.ts
│   │   ├── contactPage.ts
│   │   └── practiceArea.ts
│   ├── lib/
│   │   ├── client.ts
│   │   └── queries.ts
│   └── schema.ts
├── app/
│   └── studio/[[...tool]]/page.tsx
└── sanity.config.ts
```

## Data Flow

1. Neale edits content in Sanity Studio (`/studio`)
2. Content saved to Sanity's hosted database
3. Next.js pages fetch content via GROQ queries
4. Pages render with fresh content

## Access Control

- Sanity handles authentication
- Only invited project members can access studio
- Add Neale's email as Editor in sanity.io/manage

## Environment Variables

Required in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (for server-side fetching)
