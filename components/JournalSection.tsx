import Image from "next/image";
import Link from "next/link";
import type { ShopifyArticle } from "@/lib/shopify";

function formatDate(dateString: string) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function JournalSection({
  articles,
}: {
  articles: ShopifyArticle[];
}) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;
  const archiveHref = `/blogs/${featured.blog.handle || "news"}`;
  const featuredAlt =
    featured.image?.altText?.trim() || `${featured.title} — KAiA. Journal`;

  return (
    <section id="blogs" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-4 border-b border-kaia-burgundy/15 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-kaia-burgundy" />
            <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              The KAiA Journal
            </p>
          </div>
          <h2 className="font-serif text-4xl font-light tracking-wide text-kaia-burgundy sm:text-5xl">
            Notes on <span className="italic text-kaia-ink">Elegance</span>
          </h2>
        </div>

        <Link
          href={archiveHref}
          title={`View all stories in ${featured.blog.title}`}
          className="border-b border-kaia-burgundy pb-1 text-[11px] font-medium tracking-[0.22em] text-kaia-burgundy uppercase transition-opacity hover:opacity-70"
        >
          View All Stories →
        </Link>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Featured Article */}
        <Link
          href={`/blogs/${featured.blog.handle}/${featured.handle}`}
          title={featured.title}
          className="group block lg:col-span-7"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-kaia-linen">
            {featured.image ? (
              <Image
                src={featured.image.url}
                alt={featuredAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
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

          <div className="mt-6">
            <div className="flex items-center gap-3 text-[10px] font-medium tracking-[0.22em] text-kaia-taupe uppercase">
              <span className="text-kaia-burgundy">{featured.blog.title}</span>
              <span>·</span>
              <time dateTime={featured.publishedAt}>
                {formatDate(featured.publishedAt)}
              </time>
            </div>

            <h3 className="mt-3 font-serif text-3xl font-normal leading-snug text-kaia-ink transition-colors group-hover:text-kaia-burgundy">
              {featured.title}
            </h3>

            {featured.excerpt && (
              <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-relaxed text-kaia-taupe">
                {featured.excerpt}
              </p>
            )}

            <span className="mt-5 inline-block text-[11px] font-semibold tracking-[0.22em] text-kaia-burgundy uppercase">
              Read Story →
            </span>
          </div>
        </Link>

        {/* Secondary Articles List */}
        <div className="flex flex-col divide-y divide-kaia-burgundy/15 border-t border-kaia-burgundy/15 lg:col-span-5 lg:border-t-0">
          {rest.slice(0, 3).map((article) => {
            const articleAlt =
              article.image?.altText?.trim() ||
              `${article.title} — KAiA. Journal`;

            return (
              <Link
                key={article.id}
                href={`/blogs/${article.blog.handle}/${article.handle}`}
                title={article.title}
                className="group grid grid-cols-12 items-center gap-5 py-6 first:lg:pt-0"
              >
                <div className="relative col-span-4 aspect-[4/5] overflow-hidden bg-kaia-linen">
                  {article.image ? (
                    <Image
                      src={article.image.url}
                      alt={articleAlt}
                      fill
                      sizes="(max-width: 1024px) 33vw, 15vw"
                      className="object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-kaia-linen">
                      <span className="font-serif text-lg text-kaia-burgundy/40">
                        KAiA.
                      </span>
                    </div>
                  )}
                </div>

                <div className="col-span-8">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-kaia-taupe uppercase">
                    {formatDate(article.publishedAt)}
                  </p>
                  <h3 className="mt-2 font-serif text-xl leading-snug text-kaia-ink transition-colors group-hover:text-kaia-burgundy">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-kaia-taupe">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}