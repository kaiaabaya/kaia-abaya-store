"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

const LEFT_LINKS = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "All Abayas", href: "/collections/all" },
  { label: "Size Guide", href: "/pages/size-guide" },
];

const RIGHT_LINKS = [
  { label: "About", href: "/pages/about-us" },
  { label: "Contact", href: "/pages/contact" },
];

const ALL_MOBILE_LINKS = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "All Abayas", href: "/collections/all" },
  { label: "Size & Length Guide", href: "/pages/size-guide" },
  { label: "The Journal", href: "/blogs/news" },
  { label: "About KAiA.", href: "/pages/about-us" },
  { label: "Contact Atelier", href: "/pages/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { cart, openCart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart?.totalQuantity || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isSolid = !isHome || scrolled || mobileMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isSolid
          ? "border-b border-kaia-burgundy/15 bg-kaia-linen/95 shadow-[0_10px_35px_-15px_rgba(36,14,14,0.22)] backdrop-blur-md"
          : "bg-gradient-to-b from-[#240E0E]/65 via-[#240E0E]/20 to-transparent"
      }`}
    >
      {/* Top Micro Atelier Strip (Fades cleanly on scroll) */}
      <div
        className={`overflow-hidden border-b transition-all duration-500 ${
          isSolid
            ? "max-h-0 border-transparent opacity-0"
            : "max-h-9 border-kaia-linen/15 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[9px] font-medium tracking-[0.26em] text-kaia-linen/80 uppercase lg:px-10">
          <span className="hidden sm:inline">
            Complimentary Matching Sheila · Custom Length Available
          </span>
          <span className="sm:hidden">KAiA. Signature Couture</span>
          <div className="flex items-center gap-5">
            <Link
              href="/blogs/news"
              title="KAiA. Journal"
              className="transition-colors hover:text-kaia-gold"
            >
              Journal
            </Link>
            <Link
              href="/pages/shipping-delivery-policy"
              title="Shipping and Delivery Policy"
              className="hidden transition-colors hover:text-kaia-gold md:inline"
            >
              Gulf &amp; Global Delivery
            </Link>
          </div>
        </div>
      </div>

      {/* Main Editorial Navigation Bar */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 lg:px-10 ${
          isSolid ? "py-3.5" : "py-4.5"
        }`}
      >
        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={mobileMenuOpen}
          className={`flex h-9 w-9 flex-col items-center justify-center gap-1.5 transition-colors lg:hidden ${
            isSolid ? "text-kaia-burgundy" : "text-kaia-ivory"
          }`}
        >
          <span
            className={`block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
              mobileMenuOpen ? "translate-y-[4.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-current transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-current transition-transform duration-300 ${
              mobileMenuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Left Links (Desktop) */}
        <nav
          aria-label="Primary Collection Navigation"
          className={`hidden items-center gap-8 text-[11px] font-medium tracking-[0.22em] uppercase lg:flex ${
            isSolid ? "text-kaia-burgundy" : "text-kaia-ivory"
          }`}
        >
          {LEFT_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className="group relative py-1 transition-opacity hover:opacity-85"
            >
              <span>{item.label}</span>
              <span
                className={`absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  isSolid ? "bg-kaia-burgundy" : "bg-kaia-gold"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Center Brand Wordmark */}
        <Link
          href="/"
          title="KAiA. Home"
          aria-label="KAiA. Home"
          onClick={() => setMobileMenuOpen(false)}
          className={`group relative flex flex-col items-center transition-colors ${
            isSolid ? "text-kaia-burgundy" : "text-kaia-ivory"
          }`}
        >
          <span className="font-serif text-3xl font-semibold tracking-[0.1em] md:text-[36px]">
            KAiA
            <span className="text-kaia-gold transition-transform duration-300 group-hover:scale-125">
              .
            </span>
          </span>
          <span
            className={`-mt-1 text-[8px] font-medium tracking-[0.38em] uppercase transition-opacity ${
              isSolid
                ? "text-kaia-taupe opacity-85"
                : "text-kaia-linen/75 opacity-80"
            }`}
          >
            Atelier
          </span>
        </Link>

        {/* Right Links + Bag Pill */}
        <div
          className={`flex items-center gap-7 text-[11px] font-medium tracking-[0.22em] uppercase ${
            isSolid ? "text-kaia-burgundy" : "text-kaia-ivory"
          }`}
        >
          <nav
            aria-label="Maison Navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            {RIGHT_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className="group relative py-1 transition-opacity hover:opacity-85"
              >
                <span>{item.label}</span>
                <span
                  className={`absolute inset-x-0 bottom-0 h-[1px] origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    isSolid ? "bg-kaia-burgundy" : "bg-kaia-gold"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={openCart}
            title="Shopping Bag"
            aria-label={`Shopping Bag with ${totalItems} items`}
            className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase transition-all duration-300 ${
              isSolid
                ? "border-kaia-burgundy bg-kaia-burgundy text-kaia-ivory hover:bg-kaia-burgundy-dark"
                : "border-kaia-linen/45 bg-[#240E0E]/45 text-kaia-ivory backdrop-blur-md hover:border-kaia-gold hover:bg-kaia-burgundy"
            }`}
          >
            <span>Bag</span>
            <span
              className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] ${
                isSolid
                  ? "bg-kaia-linen text-kaia-burgundy"
                  : "bg-kaia-gold text-kaia-ink"
              }`}
            >
              {totalItems}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-kaia-burgundy/15 bg-kaia-linen px-6 py-7">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col divide-y divide-kaia-burgundy/10 text-xs font-medium tracking-[0.22em] text-kaia-burgundy uppercase"
          >
            {ALL_MOBILE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 transition-opacity hover:opacity-70"
              >
                <span>{item.label}</span>
                <span className="text-kaia-gold">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}