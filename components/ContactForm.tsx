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
