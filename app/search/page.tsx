import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/db/queries/products";
import ProductGrid from "@/components/shop/ProductGrid";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";
import Breadcrumb from "@/components/shop/Breadcrumb";
import Pagination from "@/components/shop/Pagination";

export const metadata: Metadata = {
  title: "Search",
  description: "Search HAIM GLOBAL's full selection of premium groceries and specialty products.",
};

type RawParams = Record<string, string | string[] | undefined>;

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const page = Math.max(1, parseInt(typeof sp.page === "string" ? sp.page : "1", 10));

  if (!q) {
    return (
      <p className="text-center text-stone-500 py-20">
        Enter a search term above to find products.
      </p>
    );
  }

  const { items, total, pageCount } = await getProducts({ search: q, page, limit: 24 });

  return (
    <>
      <p className="text-sm text-stone-500 mb-6">
        <span className="font-semibold text-stone-900">{total}</span>{" "}
        {total === 1 ? "result" : "results"} for &ldquo;
        <span className="text-stone-900 font-medium">{q}</span>&rdquo;
      </p>
      <ProductGrid products={items} />
      <Pagination
        page={page}
        pageCount={pageCount}
        baseParams={`q=${encodeURIComponent(q)}`}
        basePath="/search"
      />
    </>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<RawParams>;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumb crumbs={[{ label: "Search" }]} />

      <div className="mt-6 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
          Search Products
        </h1>

        {/* Server-side search form — works without JS */}
        <form action="/search" method="GET" role="search">
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-stone-400 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="search"
                name="q"
                autoComplete="off"
                placeholder="Search for products, brands…"
                className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-full bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <Suspense fallback={<ProductGridSkeleton count={12} />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
