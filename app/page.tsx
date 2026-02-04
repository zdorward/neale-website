import Link from "next/link";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import { client } from "@/sanity/lib/client";
import { homePageQuery, featuredPracticeAreasQuery } from "@/sanity/lib/queries";

export const revalidate = 0; // Always fetch fresh data

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
