import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleByHandle } from "@/lib/shopify";

type ArticlePageProps = {
  params: Promise<{
    blogHandle: string;
    handle: string;
  }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { blogHandle, handle } = await params;
  const article = await getArticleByHandle(blogHandle, handle);

  if (!article) return { title: "Article Not Found | KAiA." };

  return {
    title: article.seo?.title || `${article.title} | KAiA. Journal`,
    description: article.seo?.description || article.excerpt || undefined,
    openGraph: article.image
      ? { images: [{ url: article.image.url }] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { blogHandle, handle } = await params;
  const article = await getArticleByHandle(blogHandle, handle);

  if (!article) notFound();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(article.publishedAt));

  return (
    <article className="min-h-screen bg-kaia-ivory pt-32 pb-24 text-kaia-ink">
      <div className="mx-auto max-w-3xl px-6">
        {/* Back Link */}
        <Link
          href="/#journal"
          className="inline-block text-[11px] font-medium tracking-[0.22em] text-kaia-burgundy uppercase transition-opacity hover:opacity-70"
        >
          ← Back to Journal
        </Link>

        {/* Meta + Title */}
        <header className="mt-8 border-b border-kaia-burgundy/15 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-kaia-taupe uppercase">
            <span className="text-kaia-burgundy">{article.blog.title}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>{formattedDate}</time>
            {article.authorV2?.name && (
              <>
                <span>·</span>
                <span>By {article.authorV2.name}</span>
              </>
            )}
          </div>

          <h1 className="mt-4 font-serif text-4xl leading-[1.12] font-light text-kaia-burgundy sm:text-5xl">
            {article.title}
          </h1>
        </header>

        {/* Hero Image */}
        {article.image && (
          <div className="relative my-10 aspect-[16/10] w-full overflow-hidden bg-kaia-linen">
            <Image
              src={article.image.url}
              alt={article.image.altText || article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Shopify HTML Content Styled Cleanly */}
        <div
          className="text-[15px] leading-8 text-kaia-ink/90 [&_a]:text-kaia-burgundy [&_a]:underline [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-kaia-burgundy [&_blockquote]:pl-5 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-kaia-burgundy [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-kaia-burgundy [&_img]:my-8 [&_img]:w-full [&_li]:mb-2 [&_p]:mb-5 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />
      </div>
    </article>
  );
}