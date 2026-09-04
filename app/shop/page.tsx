import { Suspense } from "react";
import type { Metadata } from "next";
import { getTopLevelCategories } from "@/lib/db/queries/categories";
import { getProducts } from "@/lib/db/queries/products";
import { dollarsToCents } from "@/lib/utils/format";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import Breadcrumb from "@/components/shop/Breadcrumb";
import Pagination from "@/components/shop/Pagination";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse HAIM GLOBAL's full selection of premium groceries, organic produce, jams, spreads, and specialty items.",
};

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

// ── Sidebar: category list is cached, filter state comes from searchParams ────
async function ShopSidebar({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = parseSearchParams(await searchParams);
  const categories = await getTopLevelCategories(); // cached in the query fn

  return (
    <FilterSidebar
      categories={categories}
      currentSlug={undefined}
      activeFilters={{
        sort: sp.sort,
        min: sp.min,
        max: sp.max,
        organic: sp.organic,
        instock: sp.instock,
      }}
      action="/shop"
    />
  );
}

// ── Dynamic product results ───────────────────────────────────────────────────
async function ProductResults({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = parseSearchParams(await searchParams);

  const { items, total, page, pageCount } = await getProducts({
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
        basePath="/shop"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ShopPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb crumbs={[{ label: "Shop" }]} />

      <h1 className="mt-4 mb-8 text-2xl sm:text-3xl font-bold text-stone-900">
        All Products
      </h1>

      <div className="flex gap-8 items-start">
        {/* Sidebar streams in with accurate filter state */}
        <div className="hidden lg:block w-56 shrink-0">
          <Suspense fallback={<SidebarSkeleton />}>
            <ShopSidebar searchParams={searchParams} />
          </Suspense>
        </div>

        {/* Product grid streams in */}
        <div className="flex-1 min-w-0">
          <Suspense fallback={<ProductGridSkeleton count={24} />}>
            <ProductResults searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-8 rounded-lg bg-stone-100" />
      ))}
    </div>
  );
}
