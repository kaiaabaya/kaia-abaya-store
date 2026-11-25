import type { Metadata } from "next";
import Link from "next/link";
import CollectionSection from "@/components/CollectionSection";
import { getCollectionByHandle, getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Abaya Collection | KAiA. Luxury Abayas",
  description:
    "Explore the signature KAiA. Abaya Collection — timeless modest couture crafted in fluid silks, luminous jacquards, and breathable crepes.",
  alternates: {
    canonical: "/collections/abaya-collection",
  },
  openGraph: {
    type: "website",
    title: "Abaya Collection | KAiA. Luxury Abayas",
    description:
      "Explore the signature KAiA. Abaya Collection — architectural silhouettes finished with a complimentary matching sheila.",
    url: "https://kaiaabaya.com/collections/abaya-collection",
  },
};

const COLLECTION_TABS = [
  {
    label: "Abaya Collection",
    href: "/collections/abaya-collection",
    active: true,
  },
  { label: "New Arrivals", href: "/collections/new-arrivals", active: false },
  { label: "All Abayas", href: "/collections/abaya-collection", active: false },
  { label: "Collections Hub", href: "/collections", active: false },
];

export default async function AbayaCollectionPage() {
  const [collection, fallbackProducts] = await Promise.all([
    getCollectionByHandle("abaya-collection", 36),
    getProducts(36),
  ]);

  const pageTitle = collection?.title?.trim() || "Abaya Collection";
  const pageDescription =
    collection?.description?.trim() ||
    "Signature silhouettes tailored in fluid silks, refined jacquards, and breathable crepes — designed for effortless elegance.";

  const products =
    collection && collection.products.length > 0
      ? collection.products
      : fallbackProducts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: pageTitle,
        description: pageDescription,
        url: "https://kaiaabaya.com/collections/abaya-collection",
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
            name: "Collections",
            item: "https://kaiaabaya.com/collections",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pageTitle,
            item: "https://kaiaabaya.com/collections/abaya-collection",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-kaia-ivory pt-32 pb-16 text-kaia-ink lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase"
        >
          <Link
            href="/"
            title="KAiA. Home Page"
            className="transition-colors hover:text-kaia-burgundy"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href="/collections"
            title="All KAiA. Collections"
            className="transition-colors hover:text-kaia-burgundy"
          >
            Collections
          </Link>
          <span>/</span>
          <span className="text-kaia-burgundy">{pageTitle}</span>
        </nav>

        {/* Centered Editorial Header */}
        <header className="border-b border-kaia-burgundy/15 pb-10 text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            Signature Atelier Edit
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl lg:text-[42px]">
            {pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-kaia-taupe">
            {pageDescription}
          </p>

          {/* Navigation Switcher */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {COLLECTION_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                title={tab.label}
                className={`border px-5 py-2 text-[10px] font-medium tracking-[0.22em] uppercase transition-all ${
                  tab.active
                    ? "border-kaia-burgundy bg-kaia-burgundy text-kaia-ivory"
                    : "border-kaia-burgundy/25 bg-transparent text-kaia-ink hover:border-kaia-burgundy hover:text-kaia-burgundy"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </header>
      </div>

      {/* 3-Column Pieces Grid */}
      <CollectionSection
        products={products}
        id="abaya-collection-grid"
        eyebrow="Signature Silhouettes"
        title="The KAiA. Abaya Collection"
        description="Every piece includes a complimentary matching sheila and custom length adjustment upon request."
      />
    </main>
  );
}