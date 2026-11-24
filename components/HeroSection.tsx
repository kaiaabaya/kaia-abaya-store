"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify";

type RunwayChapter = {
  id: string;
  index: string;
  label: string;
  fabric: string;
  swatch: string;
  start: number;
  end: number;
  productIndex: number;
};

const RUNWAY_CHAPTERS: RunwayChapter[] = [
  {
    id: "crimson",
    index: "01",
    label: "Crimson Jacquard",
    fabric: "Woven Silk Blend",
    swatch: "#6B2929",
    start: 1.8,
    end: 3.1,
    productIndex: 0,
  },
  {
    id: "olive",
    index: "02",
    label: "Olive Brocade",
    fabric: "Textured Jacquard",
    swatch: "#4A4E33",
    start: 3.1,
    end: 4.1,
    productIndex: 1,
  },
  {
    id: "amber",
    index: "03",
    label: "Amber Satin",
    fabric: "Fluid Matte Silk",
    swatch: "#B57C2B",
    start: 4.1,
    end: 5.9,
    productIndex: 2,
  },
  {
    id: "aubergine",
    index: "04",
    label: "Aubergine Drape",
    fabric: "Minimalist Crepe",
    swatch: "#3B3142",
    start: 5.9,
    end: 7.0,
    productIndex: 3,
  },
  {
    id: "onyx",
    index: "05",
    label: "Midnight Onyx",
    fabric: "Signature Jacquard",
    swatch: "#1A191B",
    start: 7.0,
    end: 8.6,
    productIndex: 4,
  },
];

export default function HeroSection({
  products = [],
}: {
  products?: ShopifyProduct[];
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);

  const activeChapter =
    RUNWAY_CHAPTERS.find(
      (ch) => currentTime >= ch.start && currentTime < ch.end
    ) ?? null;

  const activeProduct =
    activeChapter && products.length > 0
      ? products[activeChapter.productIndex % products.length]
      : products[0] ?? null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const seekToChapter = (start: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = start + 0.05;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-kaia-linen">
      {/* Full-Bleed Editorial Video */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 10)}
        className="absolute inset-0 h-full w-full scale-[1.01] object-cover object-center"
      />

      {/* Sculpted Burgundy-Tinted Gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#240E0E]/88 via-[#3B1717]/20 via-40% to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#240E0E]/45 to-transparent" />

      {/* Architectural Luxury Border */}
      <div className="pointer-events-none absolute inset-4 hidden border border-kaia-linen/20 lg:inset-6 lg:block" />

      {/* Bottom Editorial Content + Interactive Synced Lookbook */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-8 lg:px-10 lg:pb-12">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          {/* Bottom-Left: Editorial Copy & CTA */}
          <div className="lg:col-span-7">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-kaia-linen" />
              <span className="text-[11px] font-medium tracking-[0.28em] text-kaia-linen uppercase">
                KAiA Maison · Signature Edition
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.06] font-light tracking-wide text-kaia-ivory sm:text-5xl lg:text-[62px]">
              Fluid Grace,{" "}
              <span className="italic text-kaia-linen">Tailored</span> in Silk.
            </h1>

            <p className="mt-3 max-w-md text-sm leading-relaxed font-light text-kaia-linen/85 sm:text-[15px]">
              Architectural abayas crafted in luminous jacquards and airy satin
              drapes — designed to move effortlessly from day to evening.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#collection"
                className="group inline-flex items-center gap-3 bg-kaia-burgundy px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-kaia-ivory uppercase transition-all duration-300 hover:bg-kaia-burgundy-dark"
              >
                <span>Explore Collection</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              {activeProduct && (
                <Link
                  href={`/products/${activeProduct.handle}`}
                  className="inline-flex items-center gap-2 border border-kaia-linen/45 bg-kaia-linen/10 px-6 py-3.5 text-[11px] font-medium tracking-[0.22em] text-kaia-ivory uppercase backdrop-blur-md transition-all duration-300 hover:bg-kaia-linen hover:text-kaia-burgundy"
                >
                  Shop Featured Look
                </Link>
              )}
            </div>
          </div>

          {/* Bottom-Right: Live Synced "In This Frame" Card */}
          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
            <div className="w-full max-w-sm rounded-sm border border-kaia-linen/25 bg-[#240E0E]/45 p-4 backdrop-blur-md transition-all duration-500">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded-full border border-kaia-linen/70 shadow-inner transition-colors duration-500"
                    style={{
                      backgroundColor: activeChapter?.swatch ?? "#6B2929",
                    }}
                  />
                  <div>
                    <p className="text-[10px] tracking-[0.24em] text-kaia-linen/80 uppercase">
                      {activeChapter
                        ? `On Runway · Look ${activeChapter.index}`
                        : "KAiA. Maison Film"}
                    </p>
                    <p className="font-serif text-lg tracking-wide text-kaia-ivory">
                      {activeChapter
                        ? activeChapter.label
                        : "KAiA Abaya Collection"}
                    </p>
                  </div>
                </div>

                {activeProduct && (
                  <Link
                    href={`/products/${activeProduct.handle}`}
                    className="shrink-0 border-b border-kaia-linen/70 pb-0.5 text-[10px] font-medium tracking-[0.2em] text-kaia-ivory uppercase transition-colors hover:text-kaia-linen"
                  >
                    View Piece
                  </Link>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-kaia-linen/15 pt-3">
                <span className="text-[11px] font-light text-kaia-linen/80">
                  {activeChapter?.fabric ?? "Timeless Modest Couture"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-kaia-linen/30 text-[10px] text-kaia-ivory transition hover:border-kaia-linen hover:bg-kaia-burgundy"
                  >
                    {isPlaying ? "❚❚" : "▶"}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="flex h-7 items-center justify-center rounded-full border border-kaia-linen/30 px-2.5 text-[10px] tracking-wider text-kaia-ivory uppercase transition hover:border-kaia-linen hover:bg-kaia-burgundy"
                  >
                    {isMuted ? "Sound Off" : "Sound On"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Runway Chapter Bar (Desktop) */}
        <div className="mt-8 hidden border-t border-kaia-linen/20 pt-4 md:block">
          <div className="grid grid-cols-5 gap-4">
            {RUNWAY_CHAPTERS.map((chapter) => {
              const isActive = activeChapter?.id === chapter.id;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => seekToChapter(chapter.start)}
                  className="group text-left transition-opacity"
                >
                  <div className="mb-2 h-[2px] w-full overflow-hidden bg-kaia-linen/25">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isActive
                          ? "w-full bg-kaia-linen"
                          : "w-0 bg-kaia-linen/50 group-hover:w-1/2"
                      }`}
                    />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-[10px] tracking-[0.2em] ${
                        isActive ? "text-kaia-linen" : "text-kaia-ivory/50"
                      }`}
                    >
                      {chapter.index}
                    </span>
                    <span
                      className={`font-serif text-sm tracking-wide transition-colors ${
                        isActive
                          ? "text-kaia-ivory"
                          : "text-kaia-ivory/65 group-hover:text-kaia-ivory"
                      }`}
                    >
                      {chapter.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Video Progress Line */}
        <div className="mt-6 h-[2px] w-full overflow-hidden bg-kaia-linen/25 md:hidden">
          <div
            className="h-full bg-kaia-linen transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}