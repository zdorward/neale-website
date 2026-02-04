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

export const revalidate = 0; // Always fetch fresh data

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
                src={urlFor(aboutPage.photo).width(384).height(384).quality(100).url()}
                alt="Neale Gold"
                width={192}
                height={192}
                className="object-cover w-full h-full"
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
