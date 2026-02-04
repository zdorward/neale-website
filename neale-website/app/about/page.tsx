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
