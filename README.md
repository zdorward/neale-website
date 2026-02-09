# Neale Gold Law Office Website

Professional website for Neale Gold, an appellate attorney in California with over 800 cases litigated.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Sanity
- **Styling**: Tailwind CSS 4
- **Email**: Resend
- **Runtime**: Node.js 22

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Sanity Studio

Access the CMS at [http://localhost:3000/studio](http://localhost:3000/studio).

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `SANITY_API_READ_TOKEN` - Sanity API token for server-side fetching
- `RESEND_API_KEY` - Resend API key for contact form emails

## Project Structure

```
app/
├── page.tsx              # Home page
├── about/                # About page
├── practice-areas/       # Practice areas page
├── contact/              # Contact page
├── studio/               # Sanity Studio
└── api/
    ├── contact/          # Contact form endpoint
    └── revalidate/       # Sanity webhook revalidation

components/               # React components
sanity/                   # Sanity configuration and schemas
```
