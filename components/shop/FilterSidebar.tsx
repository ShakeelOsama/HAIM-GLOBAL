import Link from "next/link";
import type { Category } from "@/lib/db/queries/categories";

interface ActiveFilters {
  sort?: string;
  min?: string;
  max?: string;
  organic?: string;
  instock?: string;
  page?: string;
}

interface Props {
  categories: Category[];
  currentSlug?: string;
  activeFilters: ActiveFilters;
  /** The form action path — /shop or /shop/[category] */
  action: string;
}

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "name_asc", label: "Name A–Z" },
];

export default function FilterSidebar({
  categories,
  currentSlug,
  activeFilters,
  action,
}: Props) {
  const hasActiveFilters =
    activeFilters.min ||
    activeFilters.max ||
    activeFilters.organic ||
    activeFilters.instock;

  return (
    <aside className="w-full">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
          Categories
        </h3>
        <nav className="space-y-0.5">
          <Link
            href="/shop"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              !currentSlug
                ? "bg-brand-50 text-brand-700"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentSlug === cat.slug
                  ? "bg-brand-50 text-brand-700"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Filters — HTML GET form, works without JS */}
      <form action={action} method="GET">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
            Filters
          </h3>
          {hasActiveFilters && (
            <Link
              href={action}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium"
            >
              Clear all
            </Link>
          )}
        </div>

        {/* Price range */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-stone-700 mb-3">Price range</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
              <input
                type="number"
                name="min"
                min={0}
                step={1}
                placeholder="0"
                defaultValue={activeFilters.min}
                className="w-full pl-6 pr-2 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <span className="text-stone-400 text-sm shrink-0">to</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm">$</span>
              <input
                type="number"
                name="max"
                min={0}
                step={1}
                placeholder="Any"
                defaultValue={activeFilters.max}
                className="w-full pl-6 pr-2 py-2 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="mb-6 space-y-3">
          <p className="text-sm font-semibold text-stone-700">Options</p>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="organic"
              value="1"
              defaultChecked={activeFilters.organic === "1"}
              className="h-4 w-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">
              Organic only
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="instock"
              value="1"
              defaultChecked={activeFilters.instock === "1"}
              className="h-4 w-4 rounded border-stone-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-900">
              In stock only
            </span>
          </label>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-stone-700 mb-3">Sort by</p>
          <div className="space-y-2">
            {sortOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="sort"
                  value={opt.value}
                  defaultChecked={
                    (activeFilters.sort ?? "newest") === opt.value
                  }
                  className="h-4 w-4 border-stone-300 text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm text-stone-600 group-hover:text-stone-900">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Apply filters
        </button>
      </form>
    </aside>
  );
}
