import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPageByHandle } from "@/lib/shopify";

type DynamicPageProps = {
  params: Promise<{ handle: string }>;
};

function sanitizeShopifyHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "");
}

export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { handle } = await params;
  const page = await getPageByHandle(handle);

  if (!page) {
    return { title: "Page Not Found" };
  }

  const title =
    page.seo?.title?.trim() || `${page.title} | KAiA. Luxury Abayas`;
  const description =
    page.seo?.description?.trim() ||
    page.bodySummary?.trim().slice(0, 155) ||
    `${page.title} — KAiA. Luxury Abayas`;

  return {
    title,
    description,
    alternates: {
      canonical: `/pages/${page.handle}`,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: `https://kaiaabaya.com/pages/${page.handle}`,
    },
  };
}

export default async function ShopifyDynamicPage({ params }: DynamicPageProps) {
  const { handle } = await params;
  const page = await getPageByHandle(handle);

  if (!page) {
    notFound();
  }

  const cleanBody = sanitizeShopifyHtml(page.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.bodySummary || page.title,
        url: `https://kaiaabaya.com/pages/${page.handle}`,
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
            name: page.title,
            item: `https://kaiaabaya.com/pages/${page.handle}`,
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-kaia-ivory pt-32 pb-20 text-kaia-ink lg:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
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
          <span className="text-kaia-burgundy">{page.title}</span>
        </nav>

        {/* Header */}
        <header className="border-b border-kaia-burgundy/15 pb-10 text-center">
          <p className="text-[10px] font-medium tracking-[0.32em] text-kaia-burgundy uppercase">
            KAiA. Information
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[0.14em] text-kaia-ink uppercase sm:text-4xl">
            {page.title}
          </h1>
          <div className="mx-auto mt-5 h-px w-16 bg-kaia-burgundy/35" />
        </header>

        {/* Sanitized Shopify Page HTML Content */}
        <article
          className="mt-12 space-y-6 text-sm leading-relaxed text-kaia-taupe sm:text-[15px] [&_a]:text-kaia-burgundy [&_a]:underline [&_a]:underline-offset-4 [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-light [&_h1]:text-kaia-ink [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-light [&_h2]:tracking-[0.06em] [&_h2]:text-kaia-ink [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-kaia-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_strong]:font-medium [&_strong]:text-kaia-ink [&_ul]:space-y-2"
          dangerouslySetInnerHTML={{ __html: cleanBody }}
        />

        {/* Footer Assistance */}
        <div className="mt-16 border-t border-kaia-burgundy/15 pt-10 text-center">
          <p className="text-xs text-kaia-taupe">
            Have a question? Contact our team at{" "}
            <a
              href="mailto:Kaia_ae@outlook.com"
              className="font-medium text-kaia-burgundy underline underline-offset-4"
            >
              Kaia_ae@outlook.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}