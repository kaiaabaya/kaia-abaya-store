"use client";

import { useState } from "react";
import Link from "next/link";

type Unit = "in" | "cm";

type SizeRow = {
  abayaSize: string;
  intlSize: string;
  heightCmRange: string;
  heightFtRange: string;
  lengthIn: number;
  bustIn: number;
  sleeveIn: number;
};

const SIZE_CHART: SizeRow[] = [
  {
    abayaSize: "50",
    intlSize: "XS",
    heightCmRange: "150 – 154 cm",
    heightFtRange: "4'11\" – 5'0\"",
    lengthIn: 50,
    bustIn: 21,
    sleeveIn: 26,
  },
  {
    abayaSize: "52",
    intlSize: "S",
    heightCmRange: "155 – 159 cm",
    heightFtRange: "5'1\" – 5'2\"",
    lengthIn: 52,
    bustIn: 22,
    sleeveIn: 27,
  },
  {
    abayaSize: "54",
    intlSize: "M",
    heightCmRange: "160 – 164 cm",
    heightFtRange: "5'3\" – 5'4\"",
    lengthIn: 54,
    bustIn: 23,
    sleeveIn: 27.5,
  },
  {
    abayaSize: "56",
    intlSize: "L",
    heightCmRange: "165 – 169 cm",
    heightFtRange: "5'5\" – 5'6\"",
    lengthIn: 56,
    bustIn: 24,
    sleeveIn: 28,
  },
  {
    abayaSize: "58",
    intlSize: "XL",
    heightCmRange: "170 – 174 cm",
    heightFtRange: "5'7\" – 5'8\"",
    lengthIn: 58,
    bustIn: 25,
    sleeveIn: 29,
  },
  {
    abayaSize: "60",
    intlSize: "XXL",
    heightCmRange: "175 – 179 cm",
    heightFtRange: "5'9\" – 5'10\"",
    lengthIn: 60,
    bustIn: 26.5,
    sleeveIn: 29.5,
  },
  {
    abayaSize: "62",
    intlSize: "XXXL",
    heightCmRange: "180+ cm",
    heightFtRange: "5'11\"+",
    lengthIn: 62,
    bustIn: 28,
    sleeveIn: 30,
  },
];

function formatMeasurement(inches: number, unit: Unit): string {
  if (unit === "in") return `${inches}"`;
  return `${Math.round(inches * 2.54)} cm`;
}

function getRecommendedSize(heightCm: number, wearsHeels: boolean): string {
  const adjustedHeight = wearsHeels ? heightCm + 4 : heightCm;
  if (adjustedHeight <= 154) return "50";
  if (adjustedHeight <= 159) return "52";
  if (adjustedHeight <= 164) return "54";
  if (adjustedHeight <= 169) return "56";
  if (adjustedHeight <= 174) return "58";
  if (adjustedHeight <= 179) return "60";
  return "62";
}

export default function SizeGuideClient() {
  const [unit, setUnit] = useState<Unit>("in");
  const [heightInput, setHeightInput] = useState<string>("165");
  const [wearsHeels, setWearsHeels] = useState<boolean>(false);
  const [highlightedSize, setHighlightedSize] = useState<string>("56");

  const parsedHeight = Number(heightInput);
  const isValidHeight =
    !Number.isNaN(parsedHeight) && parsedHeight >= 140 && parsedHeight <= 205;

  const recommendedSize = isValidHeight
    ? getRecommendedSize(parsedHeight, wearsHeels)
    : null;

  const recommendedRow = SIZE_CHART.find(
    (row) => row.abayaSize === recommendedSize
  );

  const handleApplyRecommendation = () => {
    if (recommendedSize) {
      setHighlightedSize(recommendedSize);
    }
  };

  return (
    <div className="space-y-16">
      {/* Interactive Size Finder Card */}
      <section
        aria-labelledby="fit-finder-heading"
        className="border border-kaia-burgundy/20 bg-kaia-linen/50 p-7 sm:p-10"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[10px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              Personal Fit Consultation
            </p>
            <h2
              id="fit-finder-heading"
              className="mt-2 font-serif text-2xl font-light tracking-[0.08em] text-kaia-ink uppercase"
            >
              Find Your Atelier Size
            </h2>
            <p className="mt-3 text-xs leading-relaxed text-kaia-taupe sm:text-sm">
              Enter your height and footwear preference to discover your ideal
              KAiA. abaya length. All silhouettes are cut with a graceful,
              relaxed drape.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">
            <div>
              <label
                htmlFor="finder-height"
                className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase"
              >
                Your Height (cm)
              </label>
              <input
                id="finder-height"
                type="number"
                min={140}
                max={205}
                value={heightInput}
                onChange={(e) => {
                  setHeightInput(e.target.value);
                  const val = Number(e.target.value);
                  if (!Number.isNaN(val) && val >= 140 && val <= 205) {
                    setHighlightedSize(getRecommendedSize(val, wearsHeels));
                  }
                }}
                placeholder="165"
                className="mt-2 h-11 w-full border border-kaia-burgundy/25 bg-kaia-ivory px-4 text-sm text-kaia-ink outline-none transition-colors focus:border-kaia-burgundy"
              />
            </div>

            <div>
              <span className="block text-[10px] font-medium tracking-[0.22em] text-kaia-ink uppercase">
                Footwear Styling
              </span>
              <div className="mt-2 grid h-11 grid-cols-2 border border-kaia-burgundy/25 bg-kaia-ivory p-1">
                <button
                  type="button"
                  onClick={() => {
                    setWearsHeels(false);
                    if (isValidHeight) {
                      setHighlightedSize(getRecommendedSize(parsedHeight, false));
                    }
                  }}
                  className={`cursor-pointer text-[10px] font-medium tracking-[0.16em] uppercase transition-colors ${
                    !wearsHeels
                      ? "bg-kaia-burgundy text-kaia-ivory"
                      : "text-kaia-ink hover:text-kaia-burgundy"
                  }`}
                >
                  Flats
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWearsHeels(true);
                    if (isValidHeight) {
                      setHighlightedSize(getRecommendedSize(parsedHeight, true));
                    }
                  }}
                  className={`cursor-pointer text-[10px] font-medium tracking-[0.16em] uppercase transition-colors ${
                    wearsHeels
                      ? "bg-kaia-burgundy text-kaia-ivory"
                      : "text-kaia-ink hover:text-kaia-burgundy"
                  }`}
                >
                  Heels
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-kaia-burgundy/20 bg-kaia-ivory px-4 py-3">
              <span className="text-[9px] font-medium tracking-[0.22em] text-kaia-taupe uppercase">
                Recommended Size
              </span>
              {recommendedRow ? (
                <button
                  type="button"
                  onClick={handleApplyRecommendation}
                  className="mt-1 flex cursor-pointer items-baseline justify-between text-left"
                >
                  <span className="font-serif text-2xl text-kaia-burgundy">
                    Size {recommendedRow.abayaSize}
                  </span>
                  <span className="text-[10px] tracking-[0.18em] text-kaia-taupe uppercase">
                    ({recommendedRow.intlSize})
                  </span>
                </button>
              ) : (
                <span className="mt-1 text-xs text-kaia-taupe">
                  Enter 140–205 cm
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Size Chart Table */}
      <section aria-labelledby="size-chart-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium tracking-[0.28em] text-kaia-burgundy uppercase">
              Standard Atelier Proportions
            </p>
            <h2
              id="size-chart-heading"
              className="mt-2 font-serif text-2xl font-light tracking-[0.1em] text-kaia-ink uppercase sm:text-3xl"
            >
              Abaya Measurement Chart
            </h2>
          </div>

          {/* Unit Switcher */}
          <div
            role="group"
            aria-label="Measurement unit toggle"
            className="inline-flex border border-kaia-burgundy/25 bg-kaia-linen/50 p-1"
          >
            <button
              type="button"
              onClick={() => setUnit("in")}
              className={`cursor-pointer px-4 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${
                unit === "in"
                  ? "bg-kaia-burgundy text-kaia-ivory"
                  : "text-kaia-ink hover:text-kaia-burgundy"
              }`}
            >
              Inches (in)
            </button>
            <button
              type="button"
              onClick={() => setUnit("cm")}
              className={`cursor-pointer px-4 py-1.5 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors ${
                unit === "cm"
                  ? "bg-kaia-burgundy text-kaia-ivory"
                  : "text-kaia-ink hover:text-kaia-burgundy"
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-kaia-burgundy/20 bg-kaia-ivory">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-kaia-burgundy/20 bg-kaia-linen/70 text-[10px] font-semibold tracking-[0.22em] text-kaia-burgundy uppercase">
                <th className="px-6 py-4">Abaya Size</th>
                <th className="px-6 py-4">International</th>
                <th className="px-6 py-4">Recommended Height</th>
                <th className="px-6 py-4">Abaya Length</th>
                <th className="px-6 py-4">Half Bust (Flat)</th>
                <th className="px-6 py-4">Sleeve (From Neck)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kaia-burgundy/10 text-sm">
              {SIZE_CHART.map((row) => {
                const isSelected = row.abayaSize === highlightedSize;
                return (
                  <tr
                    key={row.abayaSize}
                    onClick={() => setHighlightedSize(row.abayaSize)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-kaia-burgundy/[0.07] font-medium text-kaia-burgundy"
                        : "text-kaia-ink hover:bg-kaia-linen/40"
                    }`}
                  >
                    <td className="px-6 py-4 font-serif text-base">
                      {row.abayaSize}
                      {isSelected && (
                        <span className="ml-2 inline-block border border-kaia-burgundy/40 px-2 py-0.5 font-sans text-[9px] tracking-[0.16em] uppercase">
                          Selected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs tracking-[0.16em] uppercase">
                      {row.intlSize}
                    </td>
                    <td className="px-6 py-4 text-kaia-taupe">
                      {row.heightCmRange}{" "}
                      <span className="text-xs opacity-75">
                        ({row.heightFtRange})
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {formatMeasurement(row.lengthIn, unit)}
                    </td>
                    <td className="px-6 py-4">
                      {formatMeasurement(row.bustIn, unit)}
                    </td>
                    <td className="px-6 py-4">
                      {formatMeasurement(row.sleeveIn, unit)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-kaia-taupe">
          * Complimentary matching sheila included with every piece:{" "}
          <strong className="font-medium text-kaia-ink">
            {unit === "in" ? '78" × 28"' : "200 cm × 70 cm"}
          </strong>
          . Half-bust measurements are taken flat across the garment from
          underarm to underarm.
        </p>
      </section>

      {/* Complimentary Bespoke Length Banner */}
      <section className="border border-kaia-burgundy/20 bg-kaia-burgundy px-8 py-10 text-kaia-ivory sm:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[10px] font-medium tracking-[0.3em] text-kaia-ivory/75 uppercase">
              Complimentary Atelier Service
            </p>
            <h3 className="mt-2 font-serif text-2xl font-light tracking-[0.08em] uppercase">
              Between Sizes or Prefer a Custom Length?
            </h3>
            <p className="mt-2.5 text-xs leading-relaxed text-kaia-ivory/85 sm:text-sm">
              Our atelier offers complimentary length adjustments (e.g., 53&quot;,
              55&quot;, or 57&quot;) tailored specifically to your height and
              heel preference before dispatch.
            </p>
          </div>
          <Link
            href="/pages/contact"
            title="Request Custom Abaya Length"
            className="shrink-0 border border-kaia-ivory bg-kaia-ivory px-7 py-3.5 text-[10px] font-medium tracking-[0.24em] text-kaia-burgundy uppercase transition-colors hover:bg-transparent hover:text-kaia-ivory"
          >
            Request Custom Length
          </Link>
        </div>
      </section>
    </div>
  );
}