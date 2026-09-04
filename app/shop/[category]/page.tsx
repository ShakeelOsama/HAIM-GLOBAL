import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryBySlug,
  getTopLevelCategories,
} from "@/lib/db/queries/categories";
import { getProducts } from "@/lib/db/queries/products";
import { dollarsToCents } from "@/lib/utils/format";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import Pagination from "@/components/shop/Pagination";
import Image from "next/image";
import Link from "next/link";

// No generateStaticParams — Next.js 16 Cache Components serves an App Shell
// on first request and upgrades via ISR automatically.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  try {
    const { category: slug } = await params;
    const cat = await getCategoryBySlug(slug);
    if (!cat) return { title: "Category not found" };
    return {
      title: cat.name,
      description: cat.description ?? `Shop ${cat.name} at FreshMart`,
    };
  } catch {
    return { title: "Shop" };
  }
}

type RawParams = Record<string, string | string[] | undefined>;

function str(sp: RawParams, key: string) {
  return typeof sp[key] === "string" ? (sp[key] as string) : undefined;
}

function parseSearchParams(sp: RawParams) {
  return {
    sort: str(sp, "sort") as
      | "newest"
      | "price_asc"
      | "price_desc"
      | "name_asc"
      | undefined,
    min: str(sp, "min"),
    max: str(sp, "max"),
    organic: str(sp, "organic"),
    instock: str(sp, "instock"),
    page: Math.max(1, parseInt(str(sp, "page") ?? "1", 10)),
  };
}

// ── Full page content — awaits params inside Suspense ────────────────────────
async function CategoryContent({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<RawParams>;
}) {
  const { category: slug } = await params;
  const sp = parseSearchParams(await searchParams);

  // Both are cached inside the query functions
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getTopLevelCategories(),
  ]);

  if (!category) notFound();

  const { items, total, page, pageCount } = await getProducts({
    categoryId: category.id,
    sort: sp.sort ?? "newest",
    minPriceCents: sp.min ? dollarsToCents(sp.min) : undefined,
    maxPriceCents: sp.max ? dollarsToCents(sp.max) : undefined,
    organic: sp.organic === "1",
    inStock: sp.instock === "1",
    page: sp.page,
    limit: 24,
  });

  const baseParams = new URLSearchParams({
    ...(sp.sort && { sort: sp.sort }),
    ...(sp.min && { min: sp.min }),
    ...(sp.max && { max: sp.max }),
    ...(sp.organic && { organic: sp.organic }),
    ...(sp.instock && { instock: sp.instock }),
  }).toString();

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone-500">
          <li><Link href="/" className="hover:text-stone-900 transition-colors">Home</Link></li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 text-stone-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <Link href="/shop" className="hover:text-stone-900 transition-colors">Shop</Link>
          </li>
          <li className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3 text-stone-300 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-stone-900 font-medium" aria-current="page">{category.name}</span>
          </li>
        </ol>
      </nav>

      {/* Category hero */}
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-gradient-to-r from-brand-900 to-brand-700 min-h-36">
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover opacity-25 mix-blend-overlay"
            priority
          />
        )}
        <div className="relative z-10 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-brand-100 text-sm sm:text-base max-w-lg leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Sidebar + grid */}
      <div className="flex gap-8 items-start">
        <div className="hidden lg:block w-56 shrink-0">
          <FilterSidebar
            categories={allCategories}
            currentSlug={slug}
            activeFilters={{
              sort: sp.sort,
              min: sp.min,
              max: sp.max,
              organic: sp.organic,
              instock: sp.instock,
            }}
            action={`/shop/${slug}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              <span className="font-semibold text-stone-900">{total}</span>{" "}
              {total === 1 ? "product" : "products"}
            </p>
          </div>
          <ProductGrid products={items} />
          <Pagination
            page={page}
            pageCount={pageCount}
            baseParams={baseParams}
            basePath={`/shop/${slug}`}
          />
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<RawParams>;
}) {
  // Static shell: page wrapper + breadcrumb placeholder + suspense fallback
  // Everything that needs params/searchParams streams inside CategoryContent
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Suspense fallback={<CategoryPageSkeleton />}>
        <CategoryContent params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

function CategoryPageSkeleton() {
  return (
    <>
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-48 rounded bg-stone-100 animate-pulse mb-6" />
      {/* Hero skeleton */}
      <div className="rounded-2xl bg-stone-100 animate-pulse h-36 mb-8" />
      {/* Grid skeleton */}
      <ProductGridSkeleton count={24} />
    </>
  );
}
