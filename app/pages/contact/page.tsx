import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | KAiA. Luxury Abayas",
  description:
    "Get in touch with the KAiA. Atelier team for bespoke length requests, sizing guidance, and order inquiries.",
  alternates: {
    canonical: "/pages/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact Us | KAiA. Luxury Abayas",
    description:
      "Reach the KAiA. Atelier team for personal styling, sizing advice, and order support.",
    url: "https://kaiaabaya.com/pages/contact",
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Contact KAiA. Luxury Abayas",
        description:
          "Get in touch with the KAiA. Atelier team for bespoke length requests, sizing guidance, and order inquiries.",
        url: "https://kaiaabaya.com/pages/contact",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://kaiaabaya.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "https://kaiaabaya.com/pages/contact",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-kaia-ivory pt-32 pb-20 text-kaia-ink lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase"
        >
          <Link
            href="/"
            title="KAiA. Home Page"
            className="transition-colors hover:text-kaia-burgundy"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-kaia-burgundy">Contact Us</span>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            Client Concierge
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl lg:text-[42px]">
            Contact the Atelier
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-kaia-burgundy/35" />
          <p className="mt-5 text-sm leading-relaxed text-kaia-taupe">
            Whether you require guidance on silhouette sizing, complimentary
            custom length tailoring, or assistance with an existing order, our
            concierge is at your service.
          </p>
        </header>

        {/* 2-Column Layout: Direct Atelier Info + Form */}
        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-kaia-burgundy/15 pt-14 lg:grid-cols-12">
          {/* Left Column: Direct Details */}
          <aside className="space-y-8 lg:col-span-4">
            <div className="border border-kaia-burgundy/15 bg-kaia-linen/40 p-7">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-kaia-burgundy uppercase">
                Direct Email
              </p>
              <a
                href="mailto:Kaia_ae@outlook.com"
                className="mt-2.5 block font-serif text-lg text-kaia-ink underline decoration-kaia-burgundy/40 underline-offset-4 transition-colors hover:text-kaia-burgundy"
              >
                Kaia_ae@outlook.com
              </a>
              <p className="mt-2 text-xs leading-relaxed text-kaia-taupe">
                We respond to all client inquiries within 24 hours.
              </p>
            </div>

            <div className="border border-kaia-burgundy/15 bg-kaia-linen/40 p-7">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-kaia-burgundy uppercase">
                Bespoke Length &amp; Sizing
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-kaia-taupe">
                Every KAiA. abaya includes complimentary length adjustment and a
                color-matched sheila. Share your height or preferred length in
                inches/cm when reaching out.
              </p>
              <Link
                href="/collections/all"
                title="Explore KAiA. Collection"
                className="mt-4 inline-block text-[10px] font-medium tracking-[0.2em] text-kaia-burgundy uppercase underline underline-offset-4 hover:opacity-75"
              >
                Browse Collection →
              </Link>
            </div>
          </aside>

          {/* Right Column: Contact Form */}
          <div className="border border-kaia-burgundy/15 bg-kaia-linen/40 p-8 sm:p-10 lg:col-span-8">
            <h2 className="mb-6 font-serif text-xl font-light tracking-[0.1em] text-kaia-ink uppercase">
              Send an Inquiry
            </h2>
            <ContactForm recipientEmail="Kaia_ae@outlook.com" />
          </div>
        </div>
      </div>
    </main>
  );
}