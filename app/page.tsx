import HeroSection from "@/components/HeroSection";
import { ProductsSectionWrapper } from "@/components/ProductSectionWrapper";
import Collections from "@/components/Collections";
import Advantages from "@/components/Advantages";
import Newsletter from "@/components/Newsletter";

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSectionWrapper />
      <div className={``}>
        <Collections />
      </div>

      <div className={`mt-[192px]`}>
        <Advantages />
      </div>
      <div className={`mt-[192px]`}>
        <Newsletter />
      </div>
    </>
  );
}
