"use client";

import { useState, type FormEvent } from "react";

type ContactFormProps = {
  recipientEmail: string;
};

export default function ContactForm({ recipientEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailSubject = encodeURIComponent(
      subject.trim() || `Client Inquiry — ${name.trim() || "KAiA. Website"}`
    );
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone / WhatsApp: ${phone || "Not provided"}\n\nMessage:\n${message}`
    );

    setSubmitted(true);
    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-ivory px-4 text-sm text-kaia-ink placeholder:text-kaia-taupe/60 outline-none transition-colors focus:border-kaia-burgundy"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
          >
            Email Address *
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-ivory px-4 text-sm text-kaia-ink placeholder:text-kaia-taupe/60 outline-none transition-colors focus:border-kaia-burgundy"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
          >
            Phone / WhatsApp (Optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+971 50 000 0000"
            className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-ivory px-4 text-sm text-kaia-ink placeholder:text-kaia-taupe/60 outline-none transition-colors focus:border-kaia-burgundy"
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
          >
            Inquiry Topic
          </label>
          <input
            id="contact-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sizing, custom length, or order status"
            className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-ivory px-4 text-sm text-kaia-ink placeholder:text-kaia-taupe/60 outline-none transition-colors focus:border-kaia-burgundy"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
        >
          Message *
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us how our atelier team can assist you..."
          className="mt-2 w-full border border-kaia-burgundy/25 bg-kaia-ivory p-4 text-sm text-kaia-ink placeholder:text-kaia-taupe/60 outline-none transition-colors focus:border-kaia-burgundy"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          className="w-full cursor-pointer border border-kaia-burgundy bg-kaia-burgundy px-9 py-3.5 text-[10px] font-medium tracking-[0.24em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy sm:w-auto"
        >
          Send Message
        </button>

        {submitted && (
          <p className="text-xs text-kaia-burgundy">
            Opening your mail app to send to{" "}
            <span className="font-medium underline">{recipientEmail}</span>.
          </p>
        )}
      </div>
    </form>
  );
}