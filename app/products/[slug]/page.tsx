import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProductBySlug } from "@/lib/db/queries/products";
import { getCategoryById } from "@/lib/db/queries/categories";
import { formatPrice, discountPercent } from "@/lib/utils/format";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import AddToCartForm from "@/components/shop/AddToCartForm";
import NutritionTable from "@/components/shop/NutritionTable";
import ReviewsSection from "@/components/shop/ReviewsSection";
import RelatedProducts from "@/components/shop/RelatedProducts";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return { title: "Product not found" };
    return {
      title: product.metaTitle ?? product.name,
      description:
        product.metaDescription ??
        product.shortDescription ??
        `Buy ${product.name} at FreshMart`,
      openGraph: {
        title: product.metaTitle ?? product.name,
        description:
          product.metaDescription ??
          product.shortDescription ??
          undefined,
        images: (product.images as string[])[0]
          ? [{ url: (product.images as string[])[0] }]
          : undefined,
      },
    };
  } catch {
    return { title: "Product" };
  }
}

// ── Product content — all param-dependent work lives here, inside Suspense ───

async function ProductContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = product.categoryId
    ? await getCategoryById(product.categoryId)
    : null;

  const images = (product.images as string[]) ?? [];
  const isOnSale =
    product.comparePrice !== null && product.comparePrice > product.price;
  const discount = isOnSale
    ? discountPercent(product.comparePrice!, product.price)
    : 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock =
    !isOutOfStock && product.stock <= product.lowStockThreshold;
  const tags = (product.tags as string[]) ?? [];
  const nutrition = product.nutritionInfo as Record<string, number> | null;

  return (
    <>
      {/* ── Breadcrumb ── */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone-500 flex-wrap">
          <li>
            <Link
              href="/"
              className="hover:text-stone-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 text-stone-300 shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <Link href="/shop" className="hover:text-stone-900 transition-colors">
              Shop
            </Link>
          </li>
          {category && (
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-3 text-stone-300 shrink-0"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
              <Link
                href={`/shop/${category.slug}`}
                className="hover:text-stone-900 transition-colors"
              >
                {category.name}
              </Link>
            </li>
          )}
          <li className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 text-stone-300 shrink-0"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span
              className="text-stone-900 font-medium truncate max-w-[200px]"
              aria-current="page"
            >
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* ── Main product area ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Image gallery — client component */}
        <ProductImageGallery images={images} name={product.name} />

        {/* Product details */}
        <div className="flex flex-col">
          {/* Category link */}
          {category && (
            <Link
              href={`/shop/${category.slug}`}
              className="text-xs font-semibold uppercase tracking-widest text-brand-600 hover:text-brand-700 transition-colors mb-2"
            >
              {category.name}
            </Link>
          )}

          {/* Name */}
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4 flex-wrap">
            <span className="text-3xl font-extrabold text-stone-900">
              {formatPrice(product.price)}
            </span>
            {isOnSale && (
              <>
                <span className="text-xl text-stone-400 line-through">
                  {formatPrice(product.comparePrice!)}
                </span>
                <span className="inline-flex items-center rounded-full bg-accent-500 px-2.5 py-0.5 text-sm font-bold text-white">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Attribute badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {product.isOrganic && (
              <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                Certified Organic
              </span>
            )}
            <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
              Per {product.unit}
            </span>
            {product.sku && (
              <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                SKU: {product.sku}
              </span>
            )}
          </div>

          {/* Short description */}
          {product.shortDescription && (
            <p className="text-stone-600 leading-relaxed mb-5">
              {product.shortDescription}
            </p>
          )}

          {/* Stock status */}
          <div className="mb-5">
            {isOutOfStock ? (
              <p className="text-sm font-semibold text-red-600">
                Out of Stock
              </p>
            ) : isLowStock ? (
              <p className="text-sm font-semibold text-accent-600">
                Only {product.stock} left in stock — order soon!
              </p>
            ) : (
              <p className="text-sm font-semibold text-brand-600">
                In Stock
              </p>
            )}
          </div>

          {/* Add to cart */}
          {isOutOfStock ? (
            <button
              disabled
              className="w-full h-12 rounded-xl bg-stone-200 text-stone-500 font-semibold text-sm cursor-not-allowed"
            >
              Out of Stock
            </button>
          ) : (
            <AddToCartForm productId={product.id} stock={product.stock} />
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Trust signals */}
          <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 gap-3">
            {[
              { icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", label: "Free shipping over $75" },
              { icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z", label: "Secure checkout" },
              { icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99", label: "Easy returns" },
              { icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z", label: "Quality guaranteed" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-stone-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 text-brand-600 shrink-0"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Details section ── */}
      {(product.description || product.ingredients || (nutrition && Object.keys(nutrition).length > 0)) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14 pb-14 border-b border-stone-100">
          <div className="lg:col-span-2 space-y-8">
            {product.description && (
              <section aria-labelledby="description-heading">
                <h2
                  id="description-heading"
                  className="text-xl font-bold text-stone-900 mb-4"
                >
                  Product Description
                </h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </section>
            )}

            {product.ingredients && (
              <section aria-labelledby="ingredients-heading">
                <h2
                  id="ingredients-heading"
                  className="text-xl font-bold text-stone-900 mb-4"
                >
                  Ingredients
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {product.ingredients}
                </p>
              </section>
            )}
          </div>

          {nutrition && Object.keys(nutrition).length > 0 && (
            <div>
              <NutritionTable nutrition={nutrition} />
            </div>
          )}
        </div>
      )}

      {/* ── Reviews ── */}
      <div className="mb-14">
        <Suspense
          fallback={
            <div className="h-48 rounded-xl bg-stone-100 animate-pulse" />
          }
        >
          <ReviewsSection productId={product.id} />
        </Suspense>
      </div>

      {/* ── Related products ── */}
      {product.categoryId && (
        <Suspense
          fallback={
            <div>
              <div className="h-7 w-48 rounded bg-stone-100 animate-pulse mb-6" />
              <ProductGridSkeleton count={4} />
            </div>
          }
        >
          <RelatedProducts
            categoryId={product.categoryId}
            excludeId={product.id}
          />
        </Suspense>
      )}
    </>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function ProductPageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 w-64 rounded bg-stone-100 mb-6" />
      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <div className="aspect-square rounded-2xl bg-stone-100" />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 rounded bg-stone-100" />
          <div className="h-8 w-3/4 rounded bg-stone-100" />
          <div className="h-10 w-36 rounded bg-stone-100" />
          <div className="h-4 w-full rounded bg-stone-100" />
          <div className="h-4 w-5/6 rounded bg-stone-100" />
          <div className="h-12 rounded-xl bg-stone-100 mt-4" />
        </div>
      </div>
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}
