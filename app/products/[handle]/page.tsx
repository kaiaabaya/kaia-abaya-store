import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CollectionSection from "@/components/CollectionSection";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductByHandle, getProducts } from "@/lib/shopify";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  if (!handle) {
    return { title: "Piece Not Found" };
  }

  const product = await getProductByHandle(handle);

  if (!product) {
    return { title: "Piece Not Found" };
  }

  const description =
    product.description?.trim().slice(0, 155) ||
    `Discover ${product.title} by KAiA. — architectural modest couture crafted with complimentary matching sheila.`;

  return {
    title: product.title,
    description,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      type: "website",
      title: `${product.title} | KAiA.`,
      description,
      url: `https://kaiaabaya.com/products/${product.handle}`,
      images: product.featuredImage
        ? [
            {
              url: product.featuredImage.url,
              alt: product.featuredImage.altText || product.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params;
  if (!handle) {
    notFound();
  }

  const [product, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getProducts(6),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  const anyAvailable =
    product.variants.length === 0 ||
    product.variants.some((v) => v.availableForSale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.title,
        description: product.description || product.title,
        image:
          product.images.length > 0
            ? product.images.map((img) => img.url)
            : product.featuredImage
            ? [product.featuredImage.url]
            : undefined,
        brand: {
          "@type": "Brand",
          name: "KAiA.",
        },
        offers: {
          "@type": "Offer",
          url: `https://kaiaabaya.com/products/${product.handle}`,
          priceCurrency: product.priceRange.minVariantPrice.currencyCode,
          price: product.priceRange.minVariantPrice.amount,
          availability: anyAvailable
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
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
            name: "Products",
            item: "https://kaiaabaya.com/products",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.title,
            item: `https://kaiaabaya.com/products/${product.handle}`,
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
          className="mb-10 flex flex-wrap items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase"
        >
          <Link href="/" title="KAiA. Home" className="hover:text-kaia-burgundy">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            title="All KAiA. Pieces"
            className="hover:text-kaia-burgundy"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-kaia-burgundy">{product.title}</span>
        </nav>

        <ProductDetailClient product={product} />
      </div>

      {/* Curated Pairings */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-kaia-burgundy/15">
          <CollectionSection
            products={relatedProducts}
            id="related-pieces"
            eyebrow="Complete the Wardrobe"
            title="You May Also Adore"
            description="Selected silhouettes from the KAiA. Atelier crafted with the same quiet precision."
          />
        </div>
      )}
    </main>
  );
}