import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db/queries/products";
import { discountPercent, formatPrice } from "@/lib/utils/format";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const image = product.images?.[0];
  const isOnSale =
    product.comparePrice !== null && product.comparePrice > product.price;
  const discount = isOnSale
    ? discountPercent(product.comparePrice!, product.price)
    : 0;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isOutOfStock = product.stock === 0;

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all duration-200 overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {isOnSale && (
          <span className="inline-flex items-center rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {product.isOrganic && (
          <span className="inline-flex items-center rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            Organic
          </span>
        )}
      </div>

      {/* Image */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-square bg-stone-50 overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-xs text-stone-400 uppercase tracking-wide font-medium">
          {product.unit}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-semibold text-stone-900 hover:text-brand-700 transition-colors line-clamp-2 leading-snug"
        >
          {product.name}
        </Link>

        {product.shortDescription && (
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        )}

        {/* Price + add to cart */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {isOnSale && (
              <span className="text-xs text-stone-400 line-through">
                {formatPrice(product.comparePrice!)}
              </span>
            )}
          </div>

          {isOutOfStock ? (
            <span className="text-xs text-stone-400 font-medium">Out of stock</span>
          ) : (
            // Server action form — works without JS (will be wired in Chunk 4)
            <form action="/api/cart/add" method="POST">
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="quantity" value="1" />
              <button
                type="submit"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                aria-label={`Add ${product.name} to cart`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                </svg>
              </button>
            </form>
          )}
        </div>

        {isLowStock && !isOutOfStock && (
          <p className="text-xs text-accent-600 font-medium">
            Only {product.stock} left!
          </p>
        )}
      </div>
    </article>
  );
}
