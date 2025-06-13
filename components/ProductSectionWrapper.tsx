import ProductsSection from "@/components/ProductsSection";
import { ProductErrorComponent } from "@/components/ProductErrorComponent";

export async function ProductsSectionWrapper() {
  try {
    const res = await fetch(
      "https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=latest",
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error("Failed to load products");
    const collections = await res.json();

    return <ProductsSection collections={collections} id={"latest-arrivals"} />;
  } catch (error) {
    return (
      <ProductErrorComponent message="Failed to load products. Please try again later." />
    );
  }
}
