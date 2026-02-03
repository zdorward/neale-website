# Neale Gold - Family Law Website Design

## Overview

Personal website for Neale Gold, a family law attorney in San Diego, California. The site establishes professional credibility, educates potential clients, and drives consultation inquiries.

## Brand Direction

**Tone:** Warm and approachable - "trusted family advisor" rather than "intimidating law firm"

**Color Palette:**
- Primary: Soft sage green (#7C9A8E) - calming, trustworthy
- Secondary: Warm cream (#FAF8F5) - welcoming background
- Accent: Muted gold (#C9A962) - ties to her name, adds warmth
- Text: Charcoal (#2D3436) - softer than pure black

**Typography:**
- Headings: Playfair Display (serif) - professional but warm
- Body: Inter (sans-serif) - readable and modern

## Pages

### Home
- Hero with headline: "Compassionate Family Law Representation in San Diego"
- Brief intro paragraph about her approach
- 3 cards highlighting key practice areas
- Call-to-action: "Schedule a Consultation"
- Footer with contact info

### About
- Professional photo placeholder
- Background, education, bar admissions
- Her approach to family law
- Optional personal touch

### Practice Areas
- Divorce & Legal Separation
- Child Custody & Visitation
- Child & Spousal Support
- Property Division
- Prenuptial Agreements

Each with 2-3 sentence description.

### Contact
- Contact form (name, email, phone, message)
- Office address (San Diego)
- Phone / email
- Confidentiality note

## Technical Architecture

**Stack:**
- Next.js 14 (App Router)
- Tailwind CSS
- Google Fonts (Playfair Display + Inter)
- Static generation, Vercel hosting

**Project Structure:**
```
neale-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── practice-areas/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   └── PracticeAreaCard.tsx
├── public/
└── tailwind.config.ts
```

**Excluded (YAGNI):**
- No CMS or database
- No authentication
- No blog
- No booking integration

## Contact Information

- Name: Neale Gold
- Location: San Diego, California
- Practice: Family Law
