"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProductDetail } from "@/lib/shopify";
import { useCart } from "./CartContext";

export default function ProductDetailClient({
  product,
}: {
  product: ShopifyProductDetail;
}) {
  const { addItem, buyNow, isLoading } = useCart();

  const gallery = useMemo(() => {
    if (product.images.length > 0) return product.images;
    return product.featuredImage ? [product.featuredImage] : [];
  }, [product.images, product.featuredImage]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Initialize selected options from first available variant (or first variant)
  const initialVariant =
    product.variants.find((v) => v.availableForSale) || product.variants[0];

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const map: Record<string, string> = {};
      if (initialVariant) {
        for (const opt of initialVariant.selectedOptions) {
          map[opt.name] = opt.value;
        }
      }
      return map;
    }
  );

  const [customLengthNote, setCustomLengthNote] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [actionType, setActionType] = useState<"bag" | "buy" | null>(null);

  const activeVariant = useMemo(() => {
    if (product.variants.length === 0) return null;
    return (
      product.variants.find((variant) =>
        variant.selectedOptions.every(
          (opt) => selectedOptions[opt.name] === opt.value
        )
      ) || product.variants[0]
    );
  }, [product.variants, selectedOptions]);

  const displayPrice =
    activeVariant?.price || product.priceRange.minVariantPrice;
  const formattedPrice = Number(displayPrice.amount).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const isAvailable = activeVariant ? activeVariant.availableForSale : true;

  const hasMeaningfulOptions =
    product.options.length > 0 &&
    !(
      product.options.length === 1 &&
      product.options[0].name === "Title" &&
      product.options[0].values[0] === "Default Title"
    );

  const handleSelectOption = (name: string, value: string) => {
    const nextOptions = { ...selectedOptions, [name]: value };
    setSelectedOptions(nextOptions);

    const matched = product.variants.find((variant) =>
      variant.selectedOptions.every((opt) => nextOptions[opt.name] === opt.value)
    );

    if (matched?.image) {
      const imgIdx = gallery.findIndex((img) => img.url === matched.image?.url);
      if (imgIdx !== -1) setSelectedImageIndex(imgIdx);
    }
  };

  const buildLineAttributes = () => {
    const trimmed = customLengthNote.trim();
    if (!trimmed) return undefined;
    return [{ key: "Custom Length / Atelier Note", value: trimmed }];
  };

  const handleAddToBag = async () => {
    if (!isAvailable || !activeVariant?.id || isLoading) return;
    setActionType("bag");
    try {
      await addItem(activeVariant.id, 1, buildLineAttributes());
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2400);
    } finally {
      setActionType(null);
    }
  };

  const handleBuyItNow = async () => {
    if (!isAvailable || !activeVariant?.id || isLoading) return;
    setActionType("buy");
    try {
      await buyNow(activeVariant.id, 1, buildLineAttributes());
    } finally {
      setActionType(null);
    }
  };

  const activeImage = gallery[selectedImageIndex] || gallery[0] || null;

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
      {/* Left: Editorial Gallery */}
      <div className="lg:col-span-7">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          {/* Thumbnails (Desktop Left Rail) */}
          {gallery.length > 1 && (
            <div className="order-2 flex gap-3 overflow-x-auto sm:order-1 sm:col-span-2 sm:flex-col">
              {gallery.map((img, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={`${img.url}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`View image ${idx + 1} of ${product.title}`}
                    aria-pressed={isSelected}
                    className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden border bg-kaia-linen transition-all sm:w-full ${
                      isSelected
                        ? "border-kaia-burgundy opacity-100"
                        : "border-transparent opacity-60 hover:opacity-95"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={
                        img.altText?.trim() ||
                        `${product.title} view ${idx + 1}`
                      }
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Portrait Frame */}
          <div
            className={`order-1 sm:order-2 ${
              gallery.length > 1 ? "sm:col-span-10" : "sm:col-span-12"
            }`}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-kaia-linen">
              {activeImage ? (
                <Image
                  src={activeImage.url}
                  alt={
                    activeImage.altText?.trim() ||
                    `${product.title} — KAiA. Luxury Abaya`
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-serif text-3xl text-kaia-burgundy/40">
                    KAiA.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Sticky Product Details & Atelier Controls */}
      <div className="lg:col-span-5 lg:sticky lg:top-32">
        <p className="text-[10px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
          KAiA. Signature Couture
        </p>

        <h1 className="mt-3 font-serif text-3xl leading-[1.12] font-normal tracking-wide text-kaia-ink sm:text-4xl lg:text-[42px]">
          {product.title}
        </h1>

        <div className="mt-4 flex items-baseline gap-4 border-b border-kaia-burgundy/15 pb-6">
          <p className="text-lg font-medium tracking-[0.14em] text-kaia-burgundy">
            {formattedPrice} {displayPrice.currencyCode}
          </p>
          <span className="text-[11px] tracking-[0.16em] text-kaia-taupe uppercase">
            · Matching Sheila Included
          </span>
        </div>

        {/* Variant Options (Size / Color / Length) */}
        {hasMeaningfulOptions && (
          <div className="mt-7 space-y-6">
            {product.options.map((option) => (
              <div key={option.id}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.22em] text-kaia-ink uppercase">
                    {option.name}:{" "}
                    <span className="font-normal text-kaia-burgundy">
                      {selectedOptions[option.name]}
                    </span>
                  </span>

                  {option.name.toLowerCase().includes("size") && (
                    <Link
                      href="/pages/size-guide"
                      title="Open KAiA. Size and Length Guide"
                      className="text-[10px] font-medium tracking-[0.18em] text-kaia-burgundy underline underline-offset-4 hover:opacity-75"
                    >
                      Size Guide
                    </Link>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.name] === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSelectOption(option.name, value)}
                        aria-pressed={isSelected}
                        className={`min-w-12 cursor-pointer border px-4 py-2.5 text-xs font-medium tracking-[0.14em] transition-all ${
                          isSelected
                            ? "border-kaia-burgundy bg-kaia-burgundy text-kaia-ivory"
                            : "border-kaia-burgundy/25 bg-transparent text-kaia-ink hover:border-kaia-burgundy"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Complimentary Custom Length Note */}
        <div className="mt-7">
          <label
            htmlFor="custom-length-note"
            className="block text-[10px] font-semibold tracking-[0.22em] text-kaia-taupe uppercase"
          >
            Complimentary Custom Length / Atelier Note (Optional)
          </label>
          <input
            id="custom-length-note"
            type="text"
            value={customLengthNote}
            onChange={(e) => setCustomLengthNote(e.target.value)}
            placeholder="e.g., Exact length 55 inches / 140 cm"
            className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-linen/40 px-4 text-xs text-kaia-ink placeholder:text-kaia-taupe/70 focus:border-kaia-burgundy focus:bg-kaia-ivory focus:outline-none"
          />
        </div>

        {/* Primary Add to Bag & Buy It Now CTAs */}
        <div className="mt-8 space-y-3">
          <button
            type="button"
            disabled={!isAvailable || isLoading}
            onClick={handleAddToBag}
            className={`h-13 w-full cursor-pointer text-[11px] font-semibold tracking-[0.24em] uppercase transition-all disabled:cursor-not-allowed disabled:opacity-60 ${
              !isAvailable
                ? "bg-kaia-taupe/40 text-kaia-ivory"
                : addedFeedback
                ? "bg-kaia-burgundy-dark text-kaia-gold"
                : "bg-kaia-burgundy text-kaia-ivory hover:bg-kaia-burgundy-dark"
            }`}
          >
            {!isAvailable
              ? "Sold Out"
              : isLoading && actionType === "bag"
              ? "Adding to Bag..."
              : addedFeedback
              ? "Added to Your Bag ✓"
              : `Add to Bag · ${formattedPrice} ${displayPrice.currencyCode}`}
          </button>

          {isAvailable && (
            <button
              type="button"
              disabled={isLoading}
              onClick={handleBuyItNow}
              className="h-13 w-full cursor-pointer border border-kaia-burgundy bg-transparent text-[11px] font-semibold tracking-[0.24em] text-kaia-burgundy uppercase transition-all hover:bg-kaia-burgundy hover:text-kaia-ivory disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && actionType === "buy"
                ? "Preparing Checkout..."
                : "Buy It Now"}
            </button>
          )}

          <p className="pt-1 text-center text-[11px] text-kaia-taupe">
            Made to order with French-seam finishing · Gulf &amp; Worldwide
            express shipping
          </p>
        </div>

        {/* Description & Editorial Details */}
        {(product.descriptionHtml || product.description) && (
          <div className="mt-10 border-t border-kaia-burgundy/15 pt-8">
            <h2 className="text-[10px] font-semibold tracking-[0.24em] text-kaia-burgundy uppercase">
              Silhouette &amp; Craftsmanship
            </h2>
            {product.descriptionHtml ? (
              <div
                className="prose prose-sm mt-3 max-w-none leading-relaxed text-kaia-ink/85 prose-p:my-2 prose-ul:my-2"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-kaia-ink/85">
                {product.description}
              </p>
            )}
          </div>
        )}

        {/* Atelier Guarantees Accordion-Style Summary */}
        <div className="mt-8 divide-y divide-kaia-burgundy/15 border-y border-kaia-burgundy/15 text-xs">
          <div className="flex items-center justify-between py-3.5">
            <span className="font-medium tracking-[0.16em] text-kaia-burgundy uppercase">
              Complimentary Sheila
            </span>
            <span className="text-kaia-taupe">Color-matched to each piece</span>
          </div>
          <div className="flex items-center justify-between py-3.5">
            <span className="font-medium tracking-[0.16em] text-kaia-burgundy uppercase">
              Care Instructions
            </span>
            <span className="text-kaia-taupe">Delicate dry clean or steam</span>
          </div>
        </div>
      </div>
    </div>
  );
}