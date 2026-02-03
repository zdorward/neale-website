# Neale Gold Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 4-page professional website for Neale Gold, a family law attorney in San Diego.

**Architecture:** Static Next.js 14 site with App Router, Tailwind CSS for styling, Google Fonts for typography. All pages server-rendered at build time.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, TypeScript, Google Fonts (Playfair Display, Inter)

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: `neale-website/` (project root)

**Step 1: Create Next.js project**

Run:
```bash
cd /Users/zackdorward/dev/neale && npx create-next-app@latest neale-website --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

Select defaults when prompted (or the command handles it with flags).

**Step 2: Verify project created**

Run:
```bash
ls /Users/zackdorward/dev/neale/neale-website
```

Expected: See `app/`, `public/`, `package.json`, `tailwind.config.ts`, etc.

**Step 3: Test dev server starts**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run dev &
sleep 5 && curl -s http://localhost:3000 | head -20
```

Expected: HTML output from Next.js

**Step 4: Stop dev server and commit**

Run:
```bash
pkill -f "next dev" || true
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: initialize Next.js project with Tailwind"
```

---

## Task 2: Configure Tailwind Theme & Fonts

**Files:**
- Modify: `neale-website/tailwind.config.ts`
- Modify: `neale-website/app/layout.tsx`
- Modify: `neale-website/app/globals.css`

**Step 1: Update Tailwind config with custom colors**

Replace `neale-website/tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: "#7C9A8E",
          light: "#9BB5A8",
          dark: "#5D7A6E",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          dark: "#F0EDE8",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#D4BC82",
          dark: "#B89A52",
        },
        charcoal: {
          DEFAULT: "#2D3436",
          light: "#4A4F51",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Update layout.tsx with fonts**

Replace `neale-website/app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neale Gold | Family Law Attorney in San Diego",
  description:
    "Compassionate family law representation in San Diego. Divorce, child custody, support, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-charcoal">{children}</body>
    </html>
  );
}
```

**Step 3: Simplify globals.css**

Replace `neale-website/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }
}
```

**Step 4: Verify build works**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds

**Step 5: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: configure Tailwind theme with brand colors and fonts"
```

---

## Task 3: Create Navbar Component

**Files:**
- Create: `neale-website/components/Navbar.tsx`

**Step 1: Create components directory and Navbar**

Create `neale-website/components/Navbar.tsx`:

```typescript
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl text-sage-dark">
              Neale Gold
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-charcoal hover:text-sage transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-charcoal p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-charcoal hover:text-sage transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
```

**Step 2: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website/components && git commit -m "feat: add responsive Navbar component"
```

---

## Task 4: Create Footer Component

**Files:**
- Create: `neale-website/components/Footer.tsx`

**Step 1: Create Footer component**

Create `neale-website/components/Footer.tsx`:

```typescript
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">Neale Gold</h3>
            <p className="text-sage-light text-sm">
              Family Law Attorney
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
              <li>San Diego, CA</li>
              <li>
                <a href="mailto:contact@nealegold.com" className="hover:text-white transition-colors">
                  contact@nealegold.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage mt-8 pt-8 text-center text-sm text-sage-light">
          <p>&copy; {currentYear} Neale Gold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website/components && git commit -m "feat: add Footer component"
```

---

## Task 5: Add Navbar and Footer to Layout

**Files:**
- Modify: `neale-website/app/layout.tsx`

**Step 1: Update layout to include Navbar and Footer**

Replace `neale-website/app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neale Gold | Family Law Attorney in San Diego",
  description:
    "Compassionate family law representation in San Diego. Divorce, child custody, support, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-cream text-charcoal min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 2: Verify build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds

**Step 3: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: integrate Navbar and Footer into layout"
```

---

## Task 6: Build Home Page

**Files:**
- Modify: `neale-website/app/page.tsx`
- Create: `neale-website/components/PracticeAreaCard.tsx`

**Step 1: Create PracticeAreaCard component**

Create `neale-website/components/PracticeAreaCard.tsx`:

```typescript
import Link from "next/link";

interface PracticeAreaCardProps {
  title: string;
  description: string;
  href: string;
}

export default function PracticeAreaCard({
  title,
  description,
  href,
}: PracticeAreaCardProps) {
  return (
    <Link
      href={href}
      className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-cream-dark"
    >
      <h3 className="font-serif text-xl text-sage-dark mb-2">{title}</h3>
      <p className="text-charcoal-light text-sm">{description}</p>
    </Link>
  );
}
```

**Step 2: Build Home page**

Replace `neale-website/app/page.tsx` with:

```typescript
import Link from "next/link";
import PracticeAreaCard from "@/components/PracticeAreaCard";

const featuredAreas = [
  {
    title: "Divorce & Separation",
    description:
      "Guiding you through the legal process with compassion and clarity.",
    href: "/practice-areas#divorce",
  },
  {
    title: "Child Custody",
    description:
      "Protecting your relationship with your children through fair custody arrangements.",
    href: "/practice-areas#custody",
  },
  {
    title: "Support Matters",
    description:
      "Ensuring fair child support and spousal support agreements.",
    href: "/practice-areas#support",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-sage py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl text-white mb-6">
            Compassionate Family Law Representation in San Diego
          </h1>
          <p className="text-lg text-sage-light mb-8 max-w-2xl mx-auto">
            Navigating family legal matters is never easy. I provide thoughtful,
            personalized guidance to help you move forward with confidence.
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
            {featuredAreas.map((area) => (
              <PracticeAreaCard
                key={area.title}
                title={area.title}
                description={area.description}
                href={area.href}
              />
            ))}
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
            A Different Approach to Family Law
          </h2>
          <p className="text-charcoal-light mb-8">
            I believe that even in difficult times, the legal process can be
            handled with dignity and respect. My goal is to help you find
            solutions that work for your family while protecting your rights
            and interests.
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

**Step 3: Verify build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds

**Step 4: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: build Home page with hero and practice areas preview"
```

---

## Task 7: Build About Page

**Files:**
- Create: `neale-website/app/about/page.tsx`

**Step 1: Create About page**

Create `neale-website/app/about/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Neale Gold - Family Law Attorney",
  description:
    "Learn about Neale Gold's background, experience, and approach to family law in San Diego.",
};

export default function About() {
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
          {/* Photo placeholder */}
          <div className="w-48 h-48 bg-cream-dark rounded-full mx-auto mb-10 flex items-center justify-center">
            <span className="text-charcoal-light text-sm">Photo</span>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl text-charcoal mb-4">
              Dedicated to Helping Families Navigate Change
            </h2>
            <p className="text-charcoal-light mb-6">
              I understand that when you&apos;re facing a family law matter,
              you&apos;re going through one of the most challenging times in
              your life. Whether you&apos;re considering divorce, working
              through custody arrangements, or addressing support issues, you
              deserve an attorney who listens, understands, and advocates for
              your best interests.
            </p>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">My Approach</h2>
            <p className="text-charcoal-light mb-6">
              I believe in a client-centered approach that focuses on finding
              practical solutions while minimizing conflict when possible.
              Every family is unique, and I take the time to understand your
              specific situation and goals before developing a strategy
              tailored to your needs.
            </p>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Education & Admissions
            </h2>
            <ul className="text-charcoal-light mb-6 list-disc list-inside space-y-2">
              <li>Juris Doctor, [Law School]</li>
              <li>Bachelor of Arts, [University]</li>
              <li>Admitted to the California State Bar</li>
              <li>Member, San Diego County Bar Association</li>
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

**Step 2: Verify build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds

**Step 3: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: build About page"
```

---

## Task 8: Build Practice Areas Page

**Files:**
- Create: `neale-website/app/practice-areas/page.tsx`

**Step 1: Create Practice Areas page**

Create `neale-website/app/practice-areas/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice Areas | Neale Gold - Family Law Attorney",
  description:
    "Family law services including divorce, child custody, support, property division, and prenuptial agreements in San Diego.",
};

const practiceAreas = [
  {
    id: "divorce",
    title: "Divorce & Legal Separation",
    description:
      "Whether you're considering divorce or legal separation, I'll guide you through every step of the process. I work to protect your interests while seeking fair resolutions on property division, support, and custody matters.",
  },
  {
    id: "custody",
    title: "Child Custody & Visitation",
    description:
      "Your relationship with your children is paramount. I help parents establish custody arrangements that serve the best interests of the children while protecting parental rights. This includes legal custody, physical custody, and visitation schedules.",
  },
  {
    id: "support",
    title: "Child & Spousal Support",
    description:
      "Support matters require careful attention to both parties' financial circumstances. I assist with establishing, modifying, or enforcing child support and spousal support orders to ensure fair outcomes.",
  },
  {
    id: "property",
    title: "Property Division",
    description:
      "California is a community property state, which affects how assets and debts are divided in divorce. I help clients understand their rights and work toward equitable division of marital property.",
  },
  {
    id: "prenup",
    title: "Prenuptial & Postnuptial Agreements",
    description:
      "Planning ahead can protect both parties in a marriage. I draft and review prenuptial and postnuptial agreements that clearly define property rights and expectations.",
  },
];

export default function PracticeAreas() {
  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">Practice Areas</h1>
          <p className="text-sage-light mt-4">
            Comprehensive family law services in San Diego
          </p>
        </div>
      </section>

      {/* Practice Areas List */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {practiceAreas.map((area) => (
              <div
                key={area.id}
                id={area.id}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl text-sage-dark mb-3">{area.title}</h2>
                <p className="text-charcoal-light">{area.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 p-8 bg-cream-dark rounded-lg">
            <h3 className="text-xl text-charcoal mb-4">
              Questions About Your Situation?
            </h3>
            <p className="text-charcoal-light mb-6">
              Every case is unique. Contact me to discuss how I can help with
              your specific family law matter.
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

**Step 2: Verify build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds

**Step 3: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: build Practice Areas page"
```

---

## Task 9: Create Contact Form Component

**Files:**
- Create: `neale-website/components/ContactForm.tsx`

**Step 1: Create ContactForm component**

Create `neale-website/components/ContactForm.tsx`:

```typescript
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success message
    // Later: integrate with email service (Formspree, Resend, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-sage/10 border border-sage rounded-lg p-8 text-center">
        <h3 className="text-xl text-sage-dark mb-2">Thank You</h3>
        <p className="text-charcoal-light">
          Your message has been received. I&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-cream-dark rounded focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 border border-cream-dark rounded focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 border border-cream-dark rounded focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1">
          How can I help? *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 border border-cream-dark rounded focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3 px-8 rounded transition-colors"
      >
        Send Message
      </button>

      <p className="text-xs text-charcoal-light text-center">
        Your information is kept strictly confidential.
      </p>
    </form>
  );
}
```

**Step 2: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website/components && git commit -m "feat: add ContactForm component"
```

---

## Task 10: Build Contact Page

**Files:**
- Create: `neale-website/app/contact/page.tsx`

**Step 1: Create Contact page**

Create `neale-website/app/contact/page.tsx`:

```typescript
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Neale Gold - Family Law Attorney",
  description:
    "Contact Neale Gold for a consultation about your family law matter in San Diego.",
};

export default function Contact() {
  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">Contact</h1>
          <p className="text-sage-light mt-4">
            Let&apos;s discuss your situation
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
                  <h3 className="font-semibold text-charcoal mb-1">Location</h3>
                  <p className="text-charcoal-light">
                    San Diego, California
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                  <a
                    href="mailto:contact@nealegold.com"
                    className="text-sage hover:text-sage-dark transition-colors"
                  >
                    contact@nealegold.com
                  </a>
                </div>

                <div className="bg-cream-dark p-6 rounded-lg mt-8">
                  <h3 className="font-semibold text-charcoal mb-2">
                    Confidentiality
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    All communications are treated with the utmost
                    confidentiality. The information you share will only be
                    used to evaluate your case and will not be disclosed to
                    third parties.
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

**Step 2: Verify full build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds with all 4 pages

**Step 3: Commit**

Run:
```bash
cd /Users/zackdorward/dev/neale && git add neale-website && git commit -m "feat: build Contact page with form"
```

---

## Task 11: Final Verification & Cleanup

**Step 1: Remove default Next.js favicon and add placeholder**

Run:
```bash
rm /Users/zackdorward/dev/neale/neale-website/app/favicon.ico 2>/dev/null || true
```

**Step 2: Run production build**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run build
```

Expected: Build succeeds, all routes generated

**Step 3: Test locally**

Run:
```bash
cd /Users/zackdorward/dev/neale/neale-website && npm run start &
sleep 3 && echo "Site running at http://localhost:3000"
```

Visit http://localhost:3000 and verify:
- Home page loads with hero, practice area cards, about section
- Navigation works (all 4 pages)
- Mobile menu works (resize browser)
- Footer appears on all pages
- Contact form shows success message on submit

**Step 4: Stop server and final commit**

Run:
```bash
pkill -f "next start" || true
cd /Users/zackdorward/dev/neale && git add -A && git commit -m "chore: final cleanup and verification"
```

---

## Summary

After completing all tasks, you'll have:
- A fully functional 4-page Next.js website
- Custom brand colors (sage, cream, gold) and typography
- Responsive design with mobile navigation
- Home, About, Practice Areas, and Contact pages
- A contact form (client-side, ready for backend integration)
- All code committed to git
