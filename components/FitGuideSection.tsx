"use client";

import { useState } from "react";

type HeelOption = {
  id: "flats" | "low" | "high";
  label: string;
  sub: string;
  offsetCm: number;
};

type DrapeOption = {
  id: "classic" | "sweeping";
  label: string;
  offsetCm: number;
};

const HEEL_OPTIONS: HeelOption[] = [
  { id: "flats", label: "Flats", sub: "0 – 2 cm", offsetCm: 0 },
  { id: "low", label: "Low Heel", sub: "4 – 5 cm", offsetCm: 4 },
  { id: "high", label: "Evening Heel", sub: "7 – 9 cm", offsetCm: 7 },
];

const DRAPE_OPTIONS: DrapeOption[] = [
  { id: "classic", label: "Ankle-Grazing", offsetCm: 0 },
  { id: "sweeping", label: "Floor-Sweeping", offsetCm: 2 },
];

function calculateAbayaSize(effectiveHeightCm: number): {
  size: number;
  lengthCm: number;
  note: string;
} {
  if (effectiveHeightCm < 155) {
    return {
      size: 50,
      lengthCm: 127,
      note: "Petite tailored proportion for a clean, balanced silhouette.",
    };
  }
  if (effectiveHeightCm < 160) {
    return {
      size: 52,
      lengthCm: 132,
      note: "Refined fall designed to clear the floor effortlessly.",
    };
  }
  if (effectiveHeightCm < 165) {
    return {
      size: 54,
      lengthCm: 137,
      note: "Our signature proportion — poised movement without excess hem.",
    };
  }
  if (effectiveHeightCm < 170) {
    return {
      size: 56,
      lengthCm: 142,
      note: "Classic elongated drape that pairs seamlessly with flats or heels.",
    };
  }
  if (effectiveHeightCm < 175) {
    return {
      size: 58,
      lengthCm: 147,
      note: "Statuesque flow cut for effortless grace in every step.",
    };
  }
  return {
    size: 60,
    lengthCm: 152,
    note: "Full tall-silhouette cut — complimentary custom length available if taller.",
  };
}

export default function FitGuideSection() {
  const [heightCm, setHeightCm] = useState(164);
  const [heelId, setHeelId] = useState<HeelOption["id"]>("flats");
  const [drapeId, setDrapeId] = useState<DrapeOption["id"]>("classic");

  const activeHeel =
    HEEL_OPTIONS.find((h) => h.id === heelId) ?? HEEL_OPTIONS[0];
  const activeDrape =
    DRAPE_OPTIONS.find((d) => d.id === drapeId) ?? DRAPE_OPTIONS[0];

  const effectiveHeight = heightCm + activeHeel.offsetCm + activeDrape.offsetCm;
  const recommendation = calculateAbayaSize(effectiveHeight);

  const totalInches = Math.round(heightCm / 2.54);
  const heightFeet = Math.floor(totalInches / 12);
  const heightInches = totalInches % 12;

  return (
    <section
      id="fit-guide"
      className="border-y border-kaia-burgundy/15 bg-kaia-linen py-24 text-kaia-ink lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Story & Bespoke Promises */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-kaia-burgundy" />
              <p className="text-[11px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
                Bespoke Proportions
              </p>
            </div>

            <h2 className="font-serif text-4xl leading-[1.08] font-light tracking-wide text-kaia-burgundy sm:text-5xl">
              Tailored to Your{" "}
              <span className="italic text-kaia-ink">Stature</span>.
            </h2>

            <p className="mt-5 text-sm leading-relaxed text-kaia-taupe sm:text-[15px]">
              An abaya only feels truly luxurious when the hem falls at the
              exact millimeter intended. Use our atelier guide to find your
              ideal Gulf length in seconds — or request complimentary custom
              hemming with every order.
            </p>

            {/* Refined Atelier Service List */}
            <div className="mt-10 divide-y divide-kaia-burgundy/15 border-y border-kaia-burgundy/15">
              <div className="flex items-baseline justify-between py-4">
                <span className="text-[11px] font-medium tracking-[0.2em] text-kaia-burgundy uppercase">
                  01 · Complimentary Hemming
                </span>
                <span className="text-xs text-kaia-taupe">
                  Leave a note at checkout
                </span>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <span className="text-[11px] font-medium tracking-[0.2em] text-kaia-burgundy uppercase">
                  02 · Matching Sheila
                </span>
                <span className="text-xs text-kaia-taupe">
                  Included with every piece
                </span>
              </div>
              <div className="flex items-baseline justify-between py-4">
                <span className="text-[11px] font-medium tracking-[0.2em] text-kaia-burgundy uppercase">
                  03 · Private Styling
                </span>
                <span className="text-xs text-kaia-taupe">
                  Direct atelier consultation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Luxury Length Finder */}
          <div className="lg:col-span-7">
            <div className="border border-kaia-burgundy/20 bg-kaia-ivory p-6 shadow-sm sm:p-10">
              {/* Step 1: Height Slider */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.24em] text-kaia-taupe uppercase">
                      Step 01 · Your Height
                    </p>
                    <p className="mt-1 font-serif text-2xl text-kaia-ink">
                      Slide to adjust
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-serif text-4xl font-medium text-kaia-burgundy">
                      {heightCm}
                    </span>
                    <span className="ml-1 text-xs font-medium tracking-wider text-kaia-taupe uppercase">
                      cm
                    </span>
                    <p className="text-[11px] text-kaia-taupe">
                      ≈ {heightFeet}&apos;{heightInches}&quot;
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <input
                    type="range"
                    min={150}
                    max={182}
                    step={1}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    aria-label="Height in centimeters"
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-none bg-kaia-linen accent-kaia-burgundy"
                  />
                  <div className="mt-2 flex justify-between text-[10px] tracking-[0.18em] text-kaia-taupe">
                    <span>150 CM</span>
                    <span>165 CM</span>
                    <span>182 CM</span>
                  </div>
                </div>
              </div>

              {/* Step 2 & 3: Footwear + Drape Preference */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-kaia-burgundy/10 pt-7 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-[10px] font-medium tracking-[0.24em] text-kaia-taupe uppercase">
                    Step 02 · Usual Footwear
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {HEEL_OPTIONS.map((option) => {
                      const active = heelId === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setHeelId(option.id)}
                          aria-pressed={active}
                          className={`border px-2 py-2.5 text-center transition-all ${
                            active
                              ? "border-kaia-burgundy bg-kaia-burgundy text-kaia-ivory"
                              : "border-kaia-burgundy/20 bg-transparent text-kaia-ink hover:border-kaia-burgundy"
                          }`}
                        >
                          <span className="block text-[11px] font-medium">
                            {option.label}
                          </span>
                          <span
                            className={`mt-0.5 block text-[9px] ${
                              active ? "text-kaia-linen/80" : "text-kaia-taupe"
                            }`}
                          >
                            {option.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-medium tracking-[0.24em] text-kaia-taupe uppercase">
                    Step 03 · Hem Preference
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {DRAPE_OPTIONS.map((option) => {
                      const active = drapeId === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setDrapeId(option.id)}
                          aria-pressed={active}
                          className={`border px-3 py-3 text-center text-[11px] font-medium transition-all ${
                            active
                              ? "border-kaia-burgundy bg-kaia-burgundy text-kaia-ivory"
                              : "border-kaia-burgundy/20 bg-transparent text-kaia-ink hover:border-kaia-burgundy"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Live Recommendation Box */}
              <div className="mt-8 flex flex-col justify-between gap-6 border border-kaia-burgundy/20 bg-kaia-linen/55 p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-5">
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center border border-kaia-burgundy/30 bg-kaia-burgundy text-kaia-ivory">
                    <span className="text-[9px] tracking-[0.22em] text-kaia-linen/80 uppercase">
                      Size
                    </span>
                    <span className="font-serif text-3xl leading-none font-medium">
                      {recommendation.size}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium tracking-[0.24em] text-kaia-burgundy uppercase">
                      Recommended KAiA Length · {recommendation.lengthCm} cm
                    </p>
                    <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-kaia-taupe">
                      {recommendation.note}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <a
                    href="#collection"
                    title={`Explore collection for Size ${recommendation.size}`}
                    className="inline-flex items-center justify-center bg-kaia-burgundy px-6 py-3 text-[10px] font-semibold tracking-[0.22em] text-kaia-ivory uppercase transition-colors hover:bg-kaia-burgundy-dark"
                  >
                    Shop Size {recommendation.size}
                  </a>
                  <a
                    href={`https://wa.me/201000000000?text=${encodeURIComponent(
                      `Hello KAiA Atelier, I am ${heightCm}cm and would like advice on custom length for Size ${recommendation.size}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Request custom abaya length via WhatsApp"
                    className="text-center text-[10px] font-medium tracking-[0.18em] text-kaia-burgundy underline underline-offset-4 transition-opacity hover:opacity-75"
                  >
                    Request Custom Length
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}