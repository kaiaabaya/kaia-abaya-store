import type { Metadata } from "next";
import Link from "next/link";
import SizeGuideClient from "@/components/SizeGuideClient";

export const metadata: Metadata = {
  title: "Size Guide | KAiA. Luxury Abayas",
  description:
    "Find your perfect KAiA. abaya fit with our interactive size finder, Gulf abaya length chart (50–62) in inches and centimeters, and measuring guide.",
  alternates: {
    canonical: "/pages/size-guide",
  },
  openGraph: {
    type: "website",
    title: "Size Guide | KAiA. Luxury Abayas",
    description:
      "Interactive abaya size chart (50–62), measuring instructions, and complimentary custom length tailoring by KAiA.",
    url: "https://kaiaabaya.com/pages/size-guide",
  },
};

const MEASURING_STEPS = [
  {
    step: "01",
    title: "Abaya Length",
    detail:
      "Measure straight down from the highest point of your shoulder (near the base of the neck) to your ankle or preferred hem length with footwear on.",
  },
  {
    step: "02",
    title: "Half Bust Width",
    detail:
      "Lay a favorite well-fitting abaya flat and measure horizontally across the chest, 1 inch (2.5 cm) below the underarm seams.",
  },
  {
    step: "03",
    title: "Sleeve Length",
    detail:
      "Measure from the center back of your neck, over the shoulder point, and down along the outer arm to your wrist bone.",
  },
];

const FIT_FAQS = [
  {
    question: "How do KAiA. abayas fit?",
    answer:
      "All KAiA. silhouettes are designed with an architectural, fluid drape that offers generous ease through the bust and hips. Choose your size primarily based on your height and preferred hem length.",
  },
  {
    question: "What if I am between two lengths?",
    answer:
      "If you frequently wear heels, we recommend sizing up to the next length. Alternatively, you can request a complimentary custom length (such as 53 or 55 inches) via our concierge before your order ships.",
  },
  {
    question: "Does every abaya include a matching sheila?",
    answer:
      "Yes. Every KAiA. abaya is paired with a complimentary color-matched sheila measuring 78 × 28 inches (200 × 70 cm).",
  },
];

export default function SizeGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Size Guide | KAiA. Luxury Abayas",
        description:
          "Interactive abaya size guide (50–62) in inches and centimeters, measuring instructions, and custom length guidance.",
        url: "https://kaiaabaya.com/pages/size-guide",
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
            name: "Size Guide",
            item: "https://kaiaabaya.com/pages/size-guide",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FIT_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
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
          <span className="text-kaia-burgundy">Size Guide</span>
        </nav>

        {/* Page Header */}
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            Atelier Tailoring &amp; Proportions
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl lg:text-[42px]">
            Abaya Size Guide
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-kaia-burgundy/35" />
          <p className="mt-5 text-sm leading-relaxed text-kaia-taupe">
            Use our interactive size finder and measurement chart below to
            select the ideal drape and length for your silhouette.
          </p>
        </header>

        {/* Interactive Fit Finder + Table */}
        <SizeGuideClient />

        {/* How to Measure Section */}
        <section
          aria-labelledby="how-to-measure-heading"
          className="mt-20 border-t border-kaia-burgundy/15 pt-16"
        >
          <div className="text-center">
            <p className="text-[10px] font-medium tracking-[0.3em] text-kaia-burgundy uppercase">
              Precision Fit
            </p>
            <h2
              id="how-to-measure-heading"
              className="mt-2 font-serif text-2xl font-light tracking-[0.12em] text-kaia-ink uppercase sm:text-3xl"
            >
              How to Measure
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-3">
            {MEASURING_STEPS.map((item) => (
              <div
                key={item.step}
                className="border border-kaia-burgundy/15 bg-kaia-linen/40 p-7"
              >
                <span className="font-serif text-2xl text-kaia-burgundy/65">
                  {item.step}
                </span>
                <h3 className="mt-3 text-xs font-semibold tracking-[0.22em] text-kaia-ink uppercase">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-kaia-taupe sm:text-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Sizing FAQ */}
        <section
          aria-labelledby="sizing-faq-heading"
          className="mt-20 border-t border-kaia-burgundy/15 pt-16"
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[10px] font-medium tracking-[0.3em] text-kaia-burgundy uppercase">
                Fit Notes
              </p>
              <h2
                id="sizing-faq-heading"
                className="mt-2 font-serif text-2xl font-light tracking-[0.12em] text-kaia-ink uppercase sm:text-3xl"
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-10 divide-y divide-kaia-burgundy/15 border-y border-kaia-burgundy/15">
              {FIT_FAQS.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-serif text-lg text-kaia-ink">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-kaia-taupe">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs text-kaia-taupe">
                Still unsure about your size? Write to{" "}
                <a
                  href="mailto:Kaia_ae@outlook.com"
                  className="font-medium text-kaia-burgundy underline underline-offset-4"
                >
                  Kaia_ae@outlook.com
                </a>{" "}
                and our stylists will guide you.
              </p>
              <div className="mt-6">
                <Link
                  href="/collections/all"
                  title="Shop KAiA. Abaya Collection"
                  className="inline-block border border-kaia-burgundy bg-kaia-burgundy px-8 py-3.5 text-[10px] font-medium tracking-[0.24em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy"
                >
                  Shop the Collection
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}