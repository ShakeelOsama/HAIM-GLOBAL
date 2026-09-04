import { getRelatedProducts } from "@/lib/db/queries/products";
import ProductCard from "./ProductCard";

interface Props {
  categoryId: string;
  excludeId: string;
}

export default async function RelatedProducts({ categoryId, excludeId }: Props) {
  const items = await getRelatedProducts(categoryId, excludeId, 6);
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-2xl font-bold text-stone-900 mb-6"
      >
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {items.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
