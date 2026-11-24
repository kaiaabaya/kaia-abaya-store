import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogByHandle } from "@/lib/shopify";

type BlogPageProps = {
  params: Promise<{ blogHandle: string }>;
};

function formatDate(dateString: string) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { blogHandle } = await params;
  if (!blogHandle) {
    return { title: "Journal Not Found" };
  }

  const blog = await getBlogByHandle(blogHandle);

  if (!blog) {
    return { title: "Journal Not Found" };
  }

  return {
    title: blog.seo?.title || `${blog.title} | The KAiA Journal`,
    description:
      blog.seo?.description ||
      `Explore stories, styling notes, and editorial features in ${blog.title} by KAiA.`,
    alternates: {
      canonical: `/blogs/${blog.handle}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogPageProps) {
  const { blogHandle } = await params;
  if (!blogHandle) {
    notFound();
  }

  const blog = await getBlogByHandle(blogHandle, 24);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-kaia-ivory pt-32 pb-24 text-kaia-ink lg:pt-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <header className="border-b border-kaia-burgundy/15 pb-12">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase"
          >
            <Link href="/" title="KAiA. Home" className="hover:text-kaia-burgundy">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blogs"
              title="The KAiA Journal"
              className="hover:text-kaia-burgundy"
            >
              The Journal
            </Link>
            <span>/</span>
            <span className="text-kaia-burgundy">{blog.title}</span>
          </nav>

          <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
            Editorial Archive
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.08] font-light tracking-wide text-kaia-burgundy sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>
        </header>

        {blog.articles.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl text-kaia-burgundy">
              No stories published in this section yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {blog.articles.map((article) => (
              <Link
                key={article.id}
                href={`/blogs/${blog.handle}/${article.handle}`}
                title={article.title}
                className="group block"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-kaia-linen">
                  {article.image ? (
                    <Image
                      src={article.image.url}
                      alt={
                        article.image.altText?.trim() ||
                        `${article.title} — KAiA. Journal`
                      }
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
                </div>

                <div className="mt-5">
                  <time
                    dateTime={article.publishedAt}
                    className="text-[10px] font-medium tracking-[0.2em] text-kaia-taupe uppercase"
                  >
                    {formatDate(article.publishedAt)}
                  </time>

                  <h2 className="mt-2 font-serif text-2xl leading-snug text-kaia-ink transition-colors group-hover:text-kaia-burgundy">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-kaia-taupe">
                      {article.excerpt}
                    </p>
                  )}

                  <span className="mt-4 inline-block text-[10px] font-semibold tracking-[0.22em] text-kaia-burgundy uppercase">
                    Read Article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}