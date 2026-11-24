"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";

type TextileStory = {
  id: string;
  number: string;
  name: string;
  origin: string;
  summary: string;
  swatch: string;
  occasion: string;
  specs: {
    fluidity: number; // من 1 إلى 5
    weight: string;
    opacity: string;
    breathability: number; // من 1 إلى 5
  };
  productIndex: number;
};

const TEXTILE_STORIES: TextileStory[] = [
  {
    id: "jacquard",
    number: "01",
    name: "Luminous Silk Jacquard",
    origin: "Woven Micro-Pattern · Signature Series",
    summary:
      "Intricately woven tonal motifs that catch light subtly with every step — structured enough to hold an architectural shoulder, yet effortlessly fluid.",
    swatch: "#6B2929",
    occasion: "Evening & Formal",
    specs: {
      fluidity: 4,
      weight: "Medium · All-Season",
      opacity: "100% Opaque",
      breathability: 4,
    },
    productIndex: 0,
  },
  {
    id: "matte-silk",
    number: "02",
    name: "Fluid Matte Silk",
    origin: "Soft-Touch Weave · Airy Drape",
    summary:
      "Weightless movement with a quiet, non-glare satin finish. Designed for warm climates where comfort and refined presence must coexist.",
    swatch: "#B57C2B",
    occasion: "Day to Sunset",
    specs: {
      fluidity: 5,
      weight: "Featherlight",
      opacity: "95% Opaque",
      breathability: 5,
    },
    productIndex: 2,
  },
  {
    id: "crepe",
    number: "03",
    name: "Architectural Crepe",
    origin: "Crease-Resistant · Tailored Fall",
    summary:
      "A clean, matte drape engineered to stay crisp from morning meetings to late dinners — zero clinging, effortless elegance.",
    swatch: "#3B3142",
    occasion: "Everyday Luxury",
    specs: {
      fluidity: 4,
      weight: "Mid-Light",
      opacity: "100% Opaque",
      breathability: 5,
    },
    productIndex: 3,
  },
  {
    id: "onyx",
    number: "04",
    name: "Midnight Onyx Brocade",
    origin: "Deep Jet Finish · Couture Trim",
    summary:
      "Our deepest obsidian tone woven with subtle tonal sheen. Cut generously for a sweeping silhouette that commands a room quietly.",
    swatch: "#1A191B",
    occasion: "Evening & Gatherings",
    specs: {
      fluidity: 4,
      weight: "Medium · Structured",
      opacity: "100% Opaque",
      breathability: 4,
    },
    productIndex: 4,
  },
];

function SpecScale({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`${label}: ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={`h-[2px] w-5 transition-colors duration-300 ${
            step <= value ? "bg-kaia-gold" : "bg-kaia-linen/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function AtelierSection({
  products = [],
}: {
  products?: ShopifyProduct[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectWeave, setInspectWeave] = useState(false);

  const activeTextile = TEXTILE_STORIES[activeIndex];
  const matchedProduct =
    products.length > 0
      ? products[activeTextile.productIndex % products.length]
      : null;

  const handleSelectTextile = (index: number) => {
    setActiveIndex(index);
    setInspectWeave(false);
  };

  return (
    <section
      id="atelier"
      className="relative overflow-hidden bg-[#240E0E] py-24 text-kaia-ivory lg:py-32"
    >
      {/* Subtle Background Radial Glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-kaia-burgundy/40 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-kaia-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 border-b border-kaia-linen/15 pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-kaia-gold" />
              <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-gold uppercase">
                The Tactile Atelier
              </p>
            </div>
            <h2 className="font-serif text-4xl leading-[1.08] font-light tracking-wide text-kaia-ivory sm:text-5xl lg:text-[54px]">
              Crafted by <span className="italic text-kaia-linen">Touch</span>,
              <br className="hidden sm:inline" /> Defined by Movement.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed font-light text-kaia-linen/75">
            Before a single pattern is cut, every KAiA fabric is tested for
            drape, breathability, and opacity — so you know exactly how each
            piece feels before it arrives.
          </p>
        </div>

        {/* Interactive Split Layout */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Interactive Textile Selector + Tactile Specs */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-kaia-linen/15 border-y border-kaia-linen/15">
              {TEXTILE_STORIES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={item.id}
                    className={`py-6 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectTextile(idx)}
                      aria-expanded={isActive}
                      className="group flex w-full items-center justify-between gap-4 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-medium tracking-[0.22em] text-kaia-gold">
                          {item.number}
                        </span>
                        <h3 className="font-serif text-2xl font-normal tracking-wide text-kaia-ivory sm:text-[28px]">
                          {item.name}
                        </h3>
                      </div>

                      <span
                        className={`h-4 w-4 shrink-0 rounded-full border transition-transform duration-300 ${
                          isActive
                            ? "scale-110 border-kaia-gold"
                            : "border-kaia-linen/40 group-hover:scale-105"
                        }`}
                        style={{ backgroundColor: item.swatch }}
                      />
                    </button>

                    {/* Expanded Details for Active Textile */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        isActive
                          ? "mt-4 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden pl-9">
                        <p className="text-[11px] tracking-[0.22em] text-kaia-linen/60 uppercase">
                          {item.origin}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed font-light text-kaia-linen/85">
                          {item.summary}
                        </p>

                        {/* Tactile Specs Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-kaia-linen/15 pt-5">
                          <div>
                            <p className="text-[10px] tracking-[0.2em] text-kaia-linen/55 uppercase">
                              Drape &amp; Fluidity
                            </p>
                            <div className="mt-2">
                              <SpecScale
                                value={item.specs.fluidity}
                                label="Drape and Fluidity"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] tracking-[0.2em] text-kaia-linen/55 uppercase">
                              Breathability
                            </p>
                            <div className="mt-2">
                              <SpecScale
                                value={item.specs.breathability}
                                label="Breathability"
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] tracking-[0.2em] text-kaia-linen/55 uppercase">
                              Fabric Weight
                            </p>
                            <p className="mt-1 text-xs font-medium text-kaia-ivory">
                              {item.specs.weight}
                            </p>
                          </div>

                          <div>
                            <p className="text-[10px] tracking-[0.2em] text-kaia-linen/55 uppercase">
                              Coverage
                            </p>
                            <p className="mt-1 text-xs font-medium text-kaia-ivory">
                              {item.specs.opacity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiet Craftsmanship Footnote */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] tracking-[0.2em] text-kaia-linen/60 uppercase">
              <span>• Matching Sheila Included</span>
              <span>• French Seam Finishing</span>
              <span>• Custom Length Ready</span>
            </div>
          </div>

          {/* Right Column: Editorial Macro Frame + Linked Shopify Piece */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden border border-kaia-linen/20 bg-kaia-burgundy-dark p-3 sm:p-4">
              {/* Image Viewport with Inspect Weave Zoom */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1A0A0A]">
                {matchedProduct?.featuredImage ? (
                  <Image
                    key={matchedProduct.id}
                    src={matchedProduct.featuredImage.url}
                    alt={
                      matchedProduct.featuredImage.altText ||
                      matchedProduct.title
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-700 ease-out ${
                      inspectWeave ? "scale-[1.65]" : "scale-100"
                    }`}
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ backgroundColor: activeTextile.swatch }}
                  >
                    <span className="font-serif text-3xl text-kaia-linen/40">
                      KAiA.
                    </span>
                  </div>
                )}

                {/* Subtle Editorial Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0A0A]/80 via-transparent to-transparent" />

                {/* Top Badges: Occasion + Interactive Macro Zoom Button */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
                  <span className="border border-kaia-linen/30 bg-[#240E0E]/70 px-3 py-1.5 text-[10px] font-medium tracking-[0.22em] text-kaia-linen uppercase backdrop-blur-md">
                    {activeTextile.occasion}
                  </span>

                  <button
                    type="button"
                    onClick={() => setInspectWeave((prev) => !prev)}
                    aria-pressed={inspectWeave}
                    title={
                      inspectWeave
                        ? "Reset weave zoom view"
                        : "Inspect fabric weave up close"
                    }
                    className={`border px-3.5 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase backdrop-blur-md transition-all ${
                      inspectWeave
                        ? "border-kaia-gold bg-kaia-gold text-kaia-ink"
                        : "border-kaia-linen/35 bg-[#240E0E]/70 text-kaia-ivory hover:border-kaia-gold hover:text-kaia-gold"
                    }`}
                  >
                    {inspectWeave ? "Reset View −" : "Inspect Weave +"}
                  </button>
                </div>

                {/* Bottom Linked Shopify Piece Bar */}
                {matchedProduct && (
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border border-kaia-linen/20 bg-[#240E0E]/75 p-4 backdrop-blur-md">
                    <div>
                      <p className="text-[10px] tracking-[0.24em] text-kaia-gold uppercase">
                        Featured in This Textile
                      </p>
                      <p className="mt-1 font-serif text-xl tracking-wide text-kaia-ivory">
                        {matchedProduct.title}
                      </p>
                      <p className="mt-0.5 text-xs tracking-[0.14em] text-kaia-linen/80">
                        {Number(
                          matchedProduct.priceRange.minVariantPrice.amount
                        ).toLocaleString()}{" "}
                        {matchedProduct.priceRange.minVariantPrice.currencyCode}
                      </p>
                    </div>

                    <Link
                      href={`/products/${matchedProduct.handle}`}
                      title={`View ${matchedProduct.title}`}
                      className="shrink-0 bg-kaia-linen px-5 py-2.5 text-[10px] font-semibold tracking-[0.22em] text-kaia-burgundy uppercase transition-colors hover:bg-kaia-gold hover:text-kaia-ink"
                    >
                      View Piece →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}