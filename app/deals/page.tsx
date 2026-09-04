import type { Metadata } from "next";
import { getProductsOnSale } from "@/lib/db/queries/products";
import ProductGrid from "@/components/shop/ProductGrid";
import Breadcrumb from "@/components/shop/Breadcrumb";

export const metadata: Metadata = {
  title: "Deals & Offers",
  description: "Premium groceries at unbeatable prices. Browse HAIM GLOBAL's current deals and limited-time offers.",
};

async function DealsGrid() {
  // Data cached by getProductsOnSale() — streams via Suspense at request time
  let items: Awaited<ReturnType<typeof getProductsOnSale>> = [];
  try {
    items = await getProductsOnSale(48);
  } catch {
    // DB unavailable
  }
  return <ProductGrid products={items} />;
}

export default function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb crumbs={[{ label: "Deals & Offers" }]} />

      {/* Hero banner */}
      <div className="mt-6 mb-10 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 p-8 sm:p-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white mb-4">
          Limited time
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
          Today&rsquo;s Best Deals
        </h1>
        <p className="text-accent-100 text-base sm:text-lg max-w-xl mx-auto">
          Fresh discounts added daily. Stock up on your favorites before they&rsquo;re gone.
        </p>
      </div>

      <DealsGrid />

      {/* Empty state when no deals */}
    </div>
  );
}
