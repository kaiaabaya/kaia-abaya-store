"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    isLoading,
    closeCart,
    updateItemQuantity,
    removeItem,
  } = useCart();

  if (!isOpen) return null;

  const lines = cart?.lines || [];
  const subtotal = cart?.cost?.subtotalAmount;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      onClick={closeCart}
    >
      <aside
        aria-label="Shopping Bag"
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col bg-kaia-ivory text-kaia-ink shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-kaia-burgundy/15 px-6 py-5">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              Your Selection
            </p>
            <h2 className="mt-0.5 font-serif text-xl font-light tracking-[0.1em] uppercase">
              Shopping Bag ({cart?.totalQuantity || 0})
            </h2>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="cursor-pointer border border-kaia-burgundy/25 px-3 py-1.5 text-[10px] tracking-[0.2em] text-kaia-ink uppercase transition-colors hover:border-kaia-burgundy hover:text-kaia-burgundy"
          >
            Close
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif text-xl text-kaia-ink">
                Your bag is currently empty
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-kaia-taupe">
                Explore our signature abayas, each accompanied by a
                complimentary matching sheila.
              </p>
              <Link
                href="/collections/all"
                onClick={closeCart}
                className="mt-6 border border-kaia-burgundy bg-kaia-burgundy px-7 py-3 text-[10px] font-medium tracking-[0.24em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy"
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-kaia-burgundy/15">
              {lines.map((line) => {
                const { merchandise } = line;
                const image = merchandise.product.featuredImage;
                const price = Number(merchandise.price.amount).toFixed(2);

                return (
                  <li key={line.id} className="flex gap-4 py-5 first:pt-0">
                    <Link
                      href={`/products/${merchandise.product.handle}`}
                      onClick={closeCart}
                      className="relative h-28 w-20 shrink-0 overflow-hidden border border-kaia-burgundy/15 bg-kaia-linen"
                    >
                      {image?.url && (
                        <Image
                          src={image.url}
                          alt={image.altText || merchandise.product.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${merchandise.product.handle}`}
                            onClick={closeCart}
                            className="font-serif text-base leading-snug text-kaia-ink hover:text-kaia-burgundy"
                          >
                            {merchandise.product.title}
                          </Link>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() => removeItem(line.id)}
                            className="cursor-pointer text-[10px] tracking-[0.16em] text-kaia-taupe uppercase hover:text-kaia-burgundy disabled:opacity-40"
                          >
                            Remove
                          </button>
                        </div>

                        {merchandise.title !== "Default Title" && (
                          <p className="mt-1 text-[11px] tracking-[0.18em] text-kaia-taupe uppercase">
                            Size: {merchandise.title}
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="inline-flex items-center border border-kaia-burgundy/25">
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              updateItemQuantity(line.id, line.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="h-7 w-7 cursor-pointer text-xs text-kaia-ink hover:bg-kaia-linen disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="px-3 text-xs font-medium">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={isLoading}
                            onClick={() =>
                              updateItemQuantity(line.id, line.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="h-7 w-7 cursor-pointer text-xs text-kaia-ink hover:bg-kaia-linen disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-xs font-medium tracking-[0.1em] text-kaia-ink">
                          {merchandise.price.currencyCode} {price}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer Checkout */}
        {lines.length > 0 && cart?.checkoutUrl && (
          <div className="border-t border-kaia-burgundy/15 bg-kaia-linen/50 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[11px] font-medium tracking-[0.22em] text-kaia-taupe uppercase">
                Subtotal
              </span>
              <span className="font-serif text-lg text-kaia-ink">
                {subtotal?.currencyCode}{" "}
                {Number(subtotal?.amount || 0).toFixed(2)}
              </span>
            </div>

            <p className="mt-1.5 text-[11px] text-kaia-taupe">
              Complimentary matching sheila included. Shipping calculated at
              checkout.
            </p>

            <a
              href={cart.checkoutUrl}
              className="mt-5 block w-full border border-kaia-burgundy bg-kaia-burgundy py-4 text-center text-[11px] font-medium tracking-[0.26em] text-kaia-ivory uppercase transition-colors hover:bg-transparent hover:text-kaia-burgundy"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}