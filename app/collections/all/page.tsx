import type { Metadata } from "next";
import Link from "next/link";
import CollectionSection from "@/components/CollectionSection";
import { getCollectionByHandle, getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "All Abayas | KAiA. Luxury Abayas",
  description:
    "Browse the complete KAiA. collection — luxury abayas crafted in fluid silks, luminous jacquards, and breathable crepes.",
  alternates: {
    canonical: "/collections/all",
  },
  openGraph: {
    type: "website",
    title: "All Abayas | KAiA. Luxury Abayas",
    description:
      "Browse the complete KAiA. collection — signature silhouettes finished with a complimentary matching sheila.",
    url: "https://kaiaabaya.com/collections/all",
  },
};

const COLLECTION_TABS = [
  { label: "All Abayas", href: "/collections/all", active: true },
  {
    label: "Abaya Collection",
    href: "/collections/abaya-collection",
    active: false,
  },
  { label: "New Arrivals", href: "/collections/new-arrivals", active: false },
  { label: "Collections Hub", href: "/collections", active: false },
];

export default async function AllCollectionsPage() {
  const [collection, fallbackProducts] = await Promise.all([
    getCollectionByHandle("all", 48),
    getProducts(48),
  ]);

  const pageTitle = collection?.title?.trim() || "All Abayas";
  const pageDescription =
    collection?.description?.trim() ||
    "The complete KAiA. wardrobe — every signature silhouette, seasonal capsule, and architectural drape in one curated view.";

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
        url: "https://kaiaabaya.com/collections/all",
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
            item: "https://kaiaabaya.com/collections/all",
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
            Complete Archive
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
        id="all-abayas-grid"
        eyebrow="Full Catalog"
        title="All KAiA. Pieces"
        description="Every piece includes a complimentary matching sheila and custom length adjustment upon request."
      />
    </main>
  );
}