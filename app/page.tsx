import HeroSection from "@/components/HeroSection";
import { ProductsSectionWrapper } from "@/components/ProductSectionWrapper";
import Collections from "@/components/Collections";

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSectionWrapper />
      <Collections />
    </>
  );
}
