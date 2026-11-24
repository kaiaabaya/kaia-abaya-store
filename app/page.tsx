import { getProducts, getArticles } from "@/lib/shopify";
import HeroSection from "@/components/HeroSection";
import CollectionSection from "@/components/CollectionSection";
import AtelierSection from "@/components/AtelierSection";
import FitGuideSection from "@/components/FitGuideSection";
import JournalSection from "@/components/JournalSection";

export default async function HomePage() {
  const [products, articles] = await Promise.all([
    getProducts(12),
    getArticles(4),
  ]);

  return (
    <main className="min-h-screen bg-kaia-ivory text-kaia-ink">
      <HeroSection products={products} />
      <CollectionSection products={products} />
      <AtelierSection products={products} />
      <FitGuideSection />
      <JournalSection articles={articles} />
    </main>
  );
}