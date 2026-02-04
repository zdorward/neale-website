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
