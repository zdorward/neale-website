import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Neale Gold - Appellate Attorney",
  description:
    "Learn about Neale Gold's background, experience, and approach to appellate litigation in California.",
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
            <p className="text-charcoal-light mb-6 text-lg">
              Neale Gold is the principal attorney at Law Offices of Neale Gold,
              Professional Corporation, an appellate law firm in San Diego, California.
              She specializes in civil, dependency, and delinquency appeals, working
              with, and for, individual clients across the entire state.
            </p>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Experience & Recognition
            </h2>
            <p className="text-charcoal-light mb-6">
              Neale practices in all six appellate districts within California, and
              has previously been a member of the 9th Circuit Bar. She is a member
              of the United States Supreme Court Bar. She has maintained a busy
              appellate practice since 2007, having litigated over 800 appeals.
            </p>
            <p className="text-charcoal-light mb-6">
              Neale specializes in reviewing trial court records, researching and
              analyzing the law, and preparing appellate motions and briefs. She has
              been recognized for her outstanding representation on appeal, including
              the honor of receiving the prestigious Paul Bell Award. Starting in 2023
              to present, Neale was selected as a &quot;Super Lawyer,&quot; and given
              the designation as a top rated appellate attorney.
            </p>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Education & Admissions
            </h2>
            <ul className="text-charcoal-light mb-6 list-disc list-inside space-y-2">
              <li>J.D., California Western School of Law, 2003</li>
              <li>Member, United States Supreme Court Bar</li>
              <li>Admitted to all six California Appellate Districts</li>
              <li>Former Member, 9th Circuit Bar</li>
            </ul>

            <h2 className="text-2xl text-charcoal mb-4 mt-10">
              Awards & Recognition
            </h2>
            <ul className="text-charcoal-light mb-6 list-disc list-inside space-y-2">
              <li>Paul Bell Award recipient</li>
              <li>Super Lawyer designation (2023–present)</li>
              <li>Top Rated Appellate Attorney</li>
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
