import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CollectionSection from "@/components/CollectionSection";
import { getCollections, getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Collections | KAiA. Luxury Abayas",
  description:
    "Explore KAiA. collections — signature abayas, new arrivals, and curated modest couture silhouettes.",
  alternates: {
    canonical: "/collections",
  },
};

type SpotlightCard = {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl?: string;
  imageAlt: string;
  linkTitle: string;
};

export default async function CollectionsIndexPage() {
  const [collections, products] = await Promise.all([
    getCollections(12),
    getProducts(12),
  ]);

  const allCollection = collections.find((c) => c.handle === "all");
  const newArrivalsCollection = collections.find(
    (c) => c.handle === "new-arrivals"
  );

  const primaryImage =
    allCollection?.image?.url ||
    newArrivalsCollection?.image?.url ||
    products[0]?.featuredImage?.url;

  const secondaryImage =
    newArrivalsCollection?.image?.url ||
    products[1]?.featuredImage?.url ||
    products[0]?.featuredImage?.url;

  const spotlightCards: SpotlightCard[] = [
    {
      key: "abaya-collection",
      title: "Abaya Collection",
      subtitle: "Signature Silhouettes",
      href: "/collections/abaya-collection",
      imageUrl: primaryImage,
      imageAlt:
        allCollection?.image?.altText?.trim() ||
        "KAiA. Signature Abaya Collection — Luxury Modest Couture",
      linkTitle: "Explore KAiA. Abaya Collection",
    },
    {
      key: "home-page",
      title: "Home Page",
      subtitle: "Editorial Sanctuary",
      href: "/",
      imageUrl: "/home.webp",
      imageAlt: "Return to KAiA. Luxury Abayas Editorial Home Page",
      linkTitle: "Return to KAiA. Home Page",
    },
    {
      key: "new-arrivals",
      title: "New Arrivals",
      subtitle: "Latest Capsule Edit",
      href: "/collections/new-arrivals",
      imageUrl: secondaryImage,
      imageAlt:
        newArrivalsCollection?.image?.altText?.trim() ||
        "KAiA. New Arrivals — Latest Luxury Abaya Capsule",
      linkTitle: "Browse KAiA. New Arrivals",
    },
  ];

  return (
    <main className="min-h-screen bg-kaia-ivory pt-32 pb-16 text-kaia-ink lg:pt-36">
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
          <span className="text-kaia-burgundy">Collections</span>
        </nav>

        {/* Centered Editorial Title (Matching Lookbook Rhythm) */}
        <header className="mb-14 text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            KAiA. Atelier
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl lg:text-[42px]">
            Discover Our Abaya Collection
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-kaia-burgundy/35" />
        </header>

        {/* 3-Column Editorial Spotlight Trio */}
        <section
          aria-label="Featured Destinations"
          className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-3"
        >
          {spotlightCards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              title={card.linkTitle}
              className="group block text-center"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-kaia-burgundy/10 bg-kaia-linen">
                {card.imageUrl ? (
                  <Image
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-kaia-linen">
                    <span className="font-serif text-3xl text-kaia-burgundy/40">
                      KAiA.
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#240E0E]/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-medium tracking-[0.26em] text-kaia-ink uppercase transition-colors group-hover:text-kaia-burgundy">
                  {card.title}
                </p>
                <p className="mt-1 font-serif text-sm italic text-kaia-taupe">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>

      {/* Signature 3-Column Pieces Grid Below */}
      <div className="mt-12 border-t border-kaia-burgundy/15">
        <CollectionSection
          products={products}
          id="featured-collection"
          eyebrow="Signature Selection"
          title="Pieces of the Moment"
          description="Architectural cuts in fluid silks, luminous jacquards, and breathable crepes."
        />
      </div>
    </main>
  );
}