import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getTopLevelCategories } from "@/lib/db/queries/categories";
import { getFeaturedProducts } from "@/lib/db/queries/products";
import ProductCard from "@/components/shop/ProductCard";
import ProductGridSkeleton from "@/components/shop/ProductGridSkeleton";

export const metadata: Metadata = {
  title: "HAIM GLOBAL — Premium Grocery Delivered",
};

// ── Cached sections (part of static shell after first build) ─────────────────

async function CategoryGrid() {
  // Data is cached by getTopLevelCategories() — no need for 'use cache' here
  let cats: Awaited<ReturnType<typeof getTopLevelCategories>> = [];
  try {
    cats = await getTopLevelCategories();
  } catch {
    // DB unavailable — fall through to placeholder tiles
  }

  if (cats.length === 0) {
    // Placeholder tiles until DB is seeded
    const placeholders = [
      { label: "Produce", emoji: "🥦", href: "/shop/produce" },
      { label: "Dairy & Eggs", emoji: "🥛", href: "/shop/dairy-eggs" },
      { label: "Meat & Seafood", emoji: "🥩", href: "/shop/meat-seafood" },
      { label: "Bakery", emoji: "🍞", href: "/shop/bakery" },
      { label: "Beverages", emoji: "🧃", href: "/shop/beverages" },
      { label: "Snacks", emoji: "🍿", href: "/shop/snacks" },
    ];
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {placeholders.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm hover:border-brand-200 hover:shadow-md transition-all"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
              {cat.emoji}
            </span>
            <span className="text-sm font-semibold text-stone-700 group-hover:text-brand-700 transition-colors text-center">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {cats.map((cat) => (
        <Link
          key={cat.id}
          href={`/shop/${cat.slug}`}
          className="group relative flex flex-col items-center rounded-2xl overflow-hidden border border-stone-100 bg-white shadow-sm hover:border-brand-200 hover:shadow-md transition-all"
        >
          {cat.image && (
            <div className="relative w-full aspect-square">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          )}
          <span className="absolute bottom-0 left-0 right-0 p-3 text-sm font-semibold text-white text-center drop-shadow">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

async function FeaturedProducts() {
  // Data is cached by getFeaturedProducts() — streaming component via Suspense
  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featured = await getFeaturedProducts(8);
  } catch {
    // DB unavailable
  }

  if (featured.length === 0) {
    return (
      <div className="text-center py-12 text-stone-400">
        <p className="text-sm">
          No featured products yet.{" "}
          <Link href="/api/seed" className="text-brand-600 underline">
            Seed the database
          </Link>{" "}
          to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
      {featured.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-28 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 mb-5">
              <span className="size-1.5 rounded-full bg-brand-600 inline-block animate-pulse" />
              HAIM GLOBAL LLC &mdash; Delivering across all 50 states
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight tracking-tight">
              Premium grocery,{" "}
              <span className="text-brand-600">delivered</span>{" "}
              to your door
            </h1>

            <p className="mt-5 text-lg text-stone-500 max-w-lg leading-relaxed">
              HAIM GLOBAL sources directly from trusted US farms and premium
              suppliers. Groceries, jams, spreads, snacks and more — no
              markups, no middlemen, fair prices guaranteed.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Shop now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 px-7 py-3.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-accent-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>
                Today&rsquo;s deals
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {[
                { value: "10k+", label: "Happy customers" },
                { value: "500+", label: "Products" },
                { value: "4.9★", label: "Avg. rating" },
              ].map((stat, i, arr) => (
                <div key={stat.label} className="flex items-center gap-6">
                  <div className="text-center sm:text-left">
                    <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                    <p className="text-xs text-stone-500 mt-0.5">{stat.label}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-8 w-px bg-stone-200 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85"
                alt="Fresh colorful vegetables and produce"
                fill
                sizes="(max-width: 1280px) 50vw, 448px"
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <div className="size-10 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-brand-600">
                  <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-900">Free shipping</p>
                <p className="text-xs text-stone-500">Orders over $75</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Shop by category
            </h2>
            <p className="mt-1 text-stone-500 text-sm">
              From everyday staples to specialty items
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            View all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
        <Suspense fallback={<CategoryGridSkeleton />}>
          <CategoryGrid />
        </Suspense>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 border-t border-stone-100">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Featured picks
            </h2>
            <p className="mt-1 text-stone-500 text-sm">
              Hand-selected by our team for quality and value
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Shop all
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
        <Suspense fallback={<ProductGridSkeleton count={8} />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* ── Value props ───────────────────────────────────────────────── */}
      <section className="bg-brand-600 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
                title: "Free shipping over $75",
                desc: "1–3 business day delivery",
              },
              {
                icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
                title: "100% quality guarantee",
                desc: "Not satisfied? We'll make it right",
              },
              {
                icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605",
                title: "Direct sourcing",
                desc: "Know exactly where your groceries come from",
              },
              {
                icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
                title: "Secure checkout",
                desc: "Stripe-powered, PCI-compliant payments",
              },
            ].map((prop) => (
              <div key={prop.title} className="flex items-start gap-4 text-white">
                <div className="mt-0.5 shrink-0 rounded-lg bg-white/10 p-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={prop.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">{prop.title}</p>
                  <p className="text-xs text-brand-100 mt-0.5">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl bg-stone-900 px-8 py-12 sm:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Get weekly deals in your inbox
          </h2>
          <p className="text-stone-400 text-sm mb-8 max-w-md mx-auto">
            Join 10,000+ HAIM GLOBAL customers who get our best deals, new
            arrivals, and seasonal picks every week.
          </p>
          {/* HTML form — server action wired in Chunk 6 */}
          <form
            action="/api/newsletter/subscribe"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full px-5 py-3 text-sm bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 shrink-0"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs text-stone-600">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </>
  );
}

function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl bg-stone-100 animate-pulse" />
      ))}
    </div>
  );
}
