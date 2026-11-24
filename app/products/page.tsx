import type { Metadata } from "next";
import Link from "next/link";
import CollectionSection from "@/components/CollectionSection";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "All Abayas | Luxury Couture Collection",
  description:
    "Explore the complete KAiA. luxury abaya collection — architectural silhouettes crafted in fluid silks, luminous jacquards, and tailored crepes.",
  alternates: {
    canonical: "/products",
  },
};

export default async function ProductsIndexPage() {
  const products = await getProducts(48);

  return (
    <main className="min-h-screen bg-kaia-ivory pt-32 pb-16 text-kaia-ink lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase"
        >
          <Link href="/" title="KAiA. Home" className="hover:text-kaia-burgundy">
            Home
          </Link>
          <span>/</span>
          <span className="text-kaia-burgundy">All Pieces</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-kaia-burgundy/15 pb-8">
          <div>
            <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              The Complete Archive
            </p>
            <h1 className="mt-2 font-serif text-4xl font-light tracking-wide text-kaia-burgundy sm:text-5xl lg:text-6xl">
              Signature <span className="italic text-kaia-ink">Abayas</span>
            </h1>
          </div>

          <p className="text-xs font-medium tracking-[0.2em] text-kaia-taupe uppercase">
            {products.length} {products.length === 1 ? "Piece" : "Pieces"} Available
          </p>
        </div>
      </div>

      <CollectionSection
        products={products}
        id="all-products"
        eyebrow="KAiA. Atelier"
        title="Current Edit"
        description="Every piece includes a complimentary matching sheila and custom length adjustment upon request."
      />
    </main>
  );
}