import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact | Neale Gold - Appellate Attorney",
  description:
    "Contact Neale Gold for a consultation about your appellate matter in California.",
};

export const revalidate = 0; // Always fetch fresh data

async function getData() {
  return client.fetch(contactPageQuery);
}

export default async function Contact() {
  const contactPage = await getData();

  const address = contactPage?.officeAddress || "402 W. Broadway\nSuite 400\nSan Diego, California 92101";
  const phone = contactPage?.phone || "(858) 344-0747";
  const email = contactPage?.email || "nealegold@ngoldlaw.com";
  const confidentiality = contactPage?.confidentialityNote || "All communications are treated with the utmost confidentiality. The information you share will only be used to evaluate your case and will not be disclosed to third parties.";

  return (
    <div>
      {/* Header */}
      <section className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-white">Contact</h1>
          <p className="text-sage-light mt-4">
            {contactPage?.headerText || "Let's discuss your appeal"}
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
                  <h3 className="font-semibold text-charcoal mb-1">Office</h3>
                  <p className="text-charcoal-light whitespace-pre-line">
                    {address}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                  <a
                    href={`tel:${phone.replace(/[^\d]/g, '')}`}
                    className="text-sage hover:text-sage-dark transition-colors"
                  >
                    {phone}
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-charcoal mb-1">Email</h3>
                  <a
                    href={`mailto:${email}`}
                    className="text-sage hover:text-sage-dark transition-colors"
                  >
                    {email}
                  </a>
                </div>

                <div className="bg-cream-dark p-6 rounded-lg mt-8">
                  <h3 className="font-semibold text-charcoal mb-2">
                    Confidentiality
                  </h3>
                  <p className="text-charcoal-light text-sm">
                    {confidentiality}
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
