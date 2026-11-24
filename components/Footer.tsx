import Link from "next/link";
import Image from "next/image";
import {
  BackToTopButton,
  CopyEmailButton,
  NewsletterForm,
} from "@/components/FooterClientActions";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "All Abayas", href: "/collections/all" },
  { label: "Size & Length Guide", href: "/pages/size-guide" },
  { label: "The Journal", href: "/blogs/news" },
];

const MAISON_LINKS = [
  { label: "About KAiA.", href: "/pages/about-us" },
  { label: "Partners & Collaborations", href: "/pages/partners-collaborations" },
  { label: "Contact Atelier", href: "/pages/contact" },
  { label: "FAQ", href: "/pages/faq" },
];

const POLICY_LINKS = [
  { label: "Shipping & Delivery", href: "/pages/shipping-delivery-policy" },
  { label: "Refund & Exchange", href: "/pages/refund-exchange-policy" },
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
  { label: "Terms of Service", href: "/pages/terms-of-service" },
];

const CONTACT_EMAIL = "Kaia_ae@outlook.com";
const INSTAGRAM_URL =
  "https://www.instagram.com/kaia_ae?bqrl=MWpxZXBnOG5nbjhxbg%3D%3D";

export default function Footer() {
  return (
    <footer className="border-t border-kaia-burgundy/20 bg-kaia-linen text-kaia-ink">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 items-start justify-between gap-12 border-b border-kaia-burgundy/15 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              title="KAiA. Home"
              aria-label="KAiA. Home"
              className="inline-block"
            >
              <div className="relative h-24 w-44 overflow-hidden">
                <Image
                  src="/kaia-brand-logo.webp"
                  alt="KAiA. Abaya Collection"
                  fill
                  sizes="176px"
                  className="object-contain object-left mix-blend-multiply"
                />
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-kaia-taupe">
              Modest couture shaped by quiet structure, fluid textiles, and
              timeless Gulf proportions.
            </p>

            {/* Direct Concierge: Instagram & Copyable Email */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit KAiA. on Instagram"
                className="inline-flex items-center gap-2 border border-kaia-burgundy/30 bg-kaia-ivory/70 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-kaia-burgundy uppercase transition-all hover:border-kaia-burgundy hover:bg-kaia-burgundy hover:text-kaia-ivory"
              >
                <span>Instagram · @kaia_ae</span>
                <span>↗</span>
              </a>

              <CopyEmailButton email={CONTACT_EMAIL} />
            </div>
          </div>

          {/* Right: Private Salon Newsletter */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-kaia-burgundy/15 bg-kaia-ivory p-6 sm:p-8">
              <p className="text-[10px] font-medium tracking-[0.26em] text-kaia-burgundy uppercase">
                Private Salon Access
              </p>
              <h3 className="mt-2 font-serif text-2xl font-normal tracking-wide text-kaia-ink sm:text-3xl">
                First word on <span className="italic">capsule releases</span>{" "}
                &amp; private edits.
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-kaia-taupe">
                Receive early invitations to seasonal collections, limited
                weaves, and bespoke styling notes.
              </p>

              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-kaia-burgundy/15 py-14 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.26em] text-kaia-burgundy uppercase">
              Collection
            </p>
            <ul className="mt-5 space-y-3">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.label}
                    className="text-sm text-kaia-ink/85 transition-colors hover:text-kaia-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.26em] text-kaia-burgundy uppercase">
              The Maison
            </p>
            <ul className="mt-5 space-y-3">
              {MAISON_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.label}
                    className="text-sm text-kaia-ink/85 transition-colors hover:text-kaia-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.26em] text-kaia-burgundy uppercase">
              Client Care &amp; Policies
            </p>
            <ul className="mt-5 space-y-3">
              {POLICY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    title={link.label}
                    className="text-sm text-kaia-ink/85 transition-colors hover:text-kaia-burgundy"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Back to Top Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] text-kaia-taupe sm:flex-row">
          <p>© {new Date().getFullYear()} KAiA. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="tracking-[0.16em] uppercase">
              Gulf &amp; Worldwide Shipping
            </span>
            <BackToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}