import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";

type CollectionSectionProps = {
  products: ShopifyProduct[];
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function CollectionSection({
  products,
  id = "collection",
  eyebrow = "Curated Pieces",
  title = "The Signature Collection",
  description = "Each silhouette is cut for effortless movement and finished with couture-level detailing.",
}: CollectionSectionProps) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-14 flex flex-col items-start justify-between gap-4 border-b border-kaia-burgundy/15 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-4xl font-light tracking-wide text-kaia-burgundy sm:text-5xl">
            {title}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-kaia-taupe">
          {description}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="py-12 text-center text-kaia-taupe">
          No pieces published to the Headless channel yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const formattedPrice = Number(
              product.priceRange.minVariantPrice.amount
            ).toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
            const currency = product.priceRange.minVariantPrice.currencyCode;
            const imageAlt =
              product.featuredImage?.altText?.trim() ||
              `${product.title} — KAiA. Luxury Abaya`;

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                title={`${product.title} — ${formattedPrice} ${currency}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-kaia-linen">
                  {product.featuredImage ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-kaia-linen">
                      <span className="font-serif text-2xl text-kaia-burgundy/40">
                        KAiA.
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-x-4 bottom-4 translate-y-3 bg-kaia-burgundy/95 py-3 text-center text-[11px] font-medium tracking-[0.22em] text-kaia-ivory uppercase opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Discover Piece
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-xl font-medium tracking-wide text-kaia-ink transition-colors group-hover:text-kaia-burgundy">
                    {product.title}
                  </h3>
                  <p className="shrink-0 text-xs font-medium tracking-[0.14em] text-kaia-burgundy">
                    {formattedPrice} {currency}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}