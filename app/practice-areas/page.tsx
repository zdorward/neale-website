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
