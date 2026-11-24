import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaiaabaya.com"),
  title: {
    default: "KAiA. | Luxury Abaya Collection",
    template: "%s | KAiA.",
  },
  description:
    "Architectural modesty crafted in fluid silks and refined jacquards. Discover the KAiA Abaya Collection.",
  keywords: [
    "KAiA",
    "KAiA Abaya",
    "luxury abayas",
    "silk abaya",
    "jacquard abaya",
    "modest fashion",
    "Gulf abayas",
    "UAE abaya boutique",
    "atelier abaya",
  ],
  authors: [{ name: "KAiA. Atelier", url: "https://kaiaabaya.com" }],
  creator: "KAiA. Atelier",
  publisher: "KAiA. Atelier",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "KAiA.",
    title: "KAiA. | Luxury Abaya Collection",
    description:
      "Architectural modesty crafted in fluid silks and refined jacquards. Discover the KAiA Abaya Collection.",
    url: "https://kaiaabaya.com",
    images: [
      {
        url: "/kaia-brand-logo_2.webp",
        alt: "KAiA. Abaya Collection",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-kaia-ivory text-kaia-ink font-sans selection:bg-kaia-burgundy selection:text-kaia-ivory">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}