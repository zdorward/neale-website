import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice Areas | Neale Gold - Appellate Attorney",
  description:
    "Appellate litigation services including appeals, writs, legal research, and creative problem solving in California.",
};

const practiceAreas = [
  {
    id: "appeals",
    title: "Appeals",
    description:
      "Neale will review the trial court record, select appellate issues for review, research and write appellate briefs, present oral argument, and file petitions for rehearing, or review in the California Supreme Court.",
  },
  {
    id: "writs",
    title: "Statutory & Common Law Writs",
    description:
      "Neale will prepare original or statutory writs where an appellate remedy is unavailable and the client is seeking extraordinary and emergency relief from the Court of Appeal, concerning a trial court order.",
  },
  {
    id: "research",
    title: "Legal Research, Law, & Motion",
    description:
      "Neale will provide research on any relevant legal issue, assist in setting up an issue in trial court proceedings for appropriate appellate preservation, and prepare relevant pleadings or motions.",
  },
  {
    id: "problem-solving",
    title: "Creative Problem Solving",
    description:
      "Neale will use the combination of her appellate intellectual rigor with her empathic social work skills to assist clients with creative problem solving, sometimes outside the box of litigating an appeal.",
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
            Appellate litigation services throughout California
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
