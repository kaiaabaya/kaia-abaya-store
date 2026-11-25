import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | KAiA. Luxury Abayas",
  description:
    "Discover the story behind KAiA. — a luxury modest couture atelier crafting architectural abayas in fluid silks, luminous jacquards, and breathable crepes.",
  alternates: {
    canonical: "/pages/about-us",
  },
  openGraph: {
    type: "website",
    title: "About Us | KAiA. Luxury Abayas",
    description:
      "Quiet luxury, architectural drape, and timeless modest couture — explore the KAiA. Atelier story.",
    url: "https://kaiaabaya.com/pages/about-us",
  },
};

const ATELIER_PILLARS = [
  {
    number: "01",
    title: "Architectural Drape",
    description:
      "Every silhouette is patterned for fluid movement—balancing structured shoulders with effortless volume that flatters without weight.",
  },
  {
    number: "02",
    title: "Curated Fabrics",
    description:
      "We source breathable Japanese and Korean crepes, luminous jacquards, and soft-touch silks selected for year-round comfort and longevity.",
  },
  {
    number: "03",
    title: "Bespoke Finishing",
    description:
      "Each abaya is finished by hand in small batches and paired with a complimentary matching sheila, with custom length adjustments available upon request.",
  },
];

export default function AboutUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About KAiA. Luxury Abayas",
        description:
          "Discover the story behind KAiA. — a luxury modest couture atelier crafting architectural abayas.",
        url: "https://kaiaabaya.com/pages/about-us",
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
            name: "About Us",
            item: "https://kaiaabaya.com/pages/about-us",
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

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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
          <span className="text-kaia-burgundy">About Us</span>
        </nav>

        {/* Hero Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            The House of KAiA.
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl lg:text-[44px]">
            Modest Couture, Reimagined
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-kaia-burgundy/35" />
          <p className="mt-6 text-sm leading-relaxed text-kaia-taupe sm:text-base">
            Born from a reverence for quiet luxury and refined craftsmanship,
            KAiA. designs contemporary abayas that honor timeless modesty while
            embracing modern, architectural tailoring.
          </p>
        </header>

        {/* Editorial Story Split */}
        <section className="mt-16 grid grid-cols-1 items-center gap-12 border-t border-kaia-burgundy/15 pt-16 lg:grid-cols-12">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-kaia-burgundy/10 bg-kaia-linen lg:col-span-5">
            <Image
              src="/home.webp"
              alt="KAiA. Luxury Abayas Atelier — Editorial Silhouette"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-6 lg:col-span-7 lg:pl-6">
            <p className="text-[10px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              Our Philosophy
            </p>
            <h2 className="font-serif text-2xl font-light tracking-[0.08em] text-kaia-ink uppercase sm:text-3xl">
              Designed for Grace in Every Movement
            </h2>
            <p className="text-sm leading-relaxed text-kaia-taupe sm:text-[15px]">
              At KAiA., we believe true elegance never needs to shout. Every
              piece begins with the tactile quality of the textile—how it
              catches natural light, how it breathes through warm afternoons,
              and how it drapes from morning gatherings to evening occasions.
            </p>
            <p className="text-sm leading-relaxed text-kaia-taupe sm:text-[15px]">
              Rather than chasing fleeting trends, our atelier focuses on
              considered proportions, tonal embroidery, and clean seamwork. The
              result is a capsule wardrobe of abayas meant to be worn, loved,
              and kept for seasons to come.
            </p>

            <div className="pt-4">
              <Link
                href="/collections/all"
                title="Explore the KAiA. Abaya Collection"
                className="inline-block border border-kaia-burgundy bg-kaia-burgundy px-8 py-3.5 text-[10px] font-medium tracking-[0.24em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy"
              >
                Explore the Collection
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Atelier Pillars */}
        <section className="mt-20 border-t border-kaia-burgundy/15 pt-16">
          <div className="text-center">
            <p className="text-[10px] font-medium tracking-[0.3em] text-kaia-burgundy uppercase">
              Our Craft
            </p>
            <h2 className="mt-3 font-serif text-2xl font-light tracking-[0.12em] text-kaia-ink uppercase sm:text-3xl">
              The KAiA. Standard
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {ATELIER_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="border border-kaia-burgundy/15 bg-kaia-linen/40 p-8"
              >
                <span className="font-serif text-2xl text-kaia-burgundy/60">
                  {pillar.number}
                </span>
                <h3 className="mt-4 text-xs font-medium tracking-[0.24em] text-kaia-ink uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-kaia-taupe">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Contact CTA */}
        <section className="mt-20 border-t border-kaia-burgundy/15 pt-14 text-center">
          <p className="font-serif text-xl italic text-kaia-ink sm:text-2xl">
            Need help with sizing or a custom length?
          </p>
          <p className="mt-2 text-sm text-kaia-taupe">
            Our atelier team is always happy to assist with measurements and
            styling guidance. Reach us directly at{" "}
            <a
              href="mailto:Kaia_ae@outlook.com"
              className="font-medium text-kaia-burgundy underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Kaia_ae@outlook.com
            </a>
            .
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/collections/new-arrivals"
              title="Browse KAiA. New Arrivals"
              className="border border-kaia-burgundy bg-kaia-burgundy px-7 py-3 text-[10px] font-medium tracking-[0.22em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy"
            >
              Shop New Arrivals
            </Link>
            <a
              href="mailto:Kaia_ae@outlook.com"
              title="Email KAiA. Atelier"
              className="border border-kaia-burgundy/30 px-7 py-3 text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase transition-colors hover:border-kaia-burgundy hover:text-kaia-burgundy"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}