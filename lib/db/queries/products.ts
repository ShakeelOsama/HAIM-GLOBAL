import "server-only";
import { db, isDatabaseConfigured } from "@/lib/db";
import { products } from "@/lib/db/schema";
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  isNotNull,
  lte,
  ne,
  sql,
} from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { STATIC_PRODUCTS } from "@/lib/static/products";

export type Product = typeof products.$inferSelect;

export type SortOption = "newest" | "price_asc" | "price_desc" | "name_asc";

export interface ProductFilters {
  categoryId?: string;
  minPriceCents?: number;
  maxPriceCents?: number;
  organic?: boolean;
  inStock?: boolean;
  onSale?: boolean;
  sort?: SortOption;
  page?: number;
  limit?: number;
  search?: string;
}

export interface ProductsResult {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  pageCount: number;
}

function buildWhere(filters: ProductFilters) {
  const conditions = [eq(products.isActive, true)];

  if (filters.categoryId)
    conditions.push(eq(products.categoryId, filters.categoryId));
  if (filters.minPriceCents !== undefined)
    conditions.push(gte(products.price, filters.minPriceCents));
  if (filters.maxPriceCents !== undefined)
    conditions.push(lte(products.price, filters.maxPriceCents));
  if (filters.organic) conditions.push(eq(products.isOrganic, true));
  if (filters.inStock) conditions.push(gte(products.stock, 1));
  if (filters.onSale)
    conditions.push(
      and(
        isNotNull(products.comparePrice),
        // Drizzle: use camelCase TS property name in sql template
        sql`${products.comparePrice} > ${products.price}`
      )!
    );
  if (filters.search) {
    const term = `%${filters.search}%`;
    conditions.push(
      sql`(${products.name} ILIKE ${term} OR ${products.shortDescription} ILIKE ${term})`
    );
  }

  return and(...conditions);
}

function buildOrderBy(sort: SortOption = "newest") {
  const map = {
    newest: desc(products.createdAt),
    price_asc: asc(products.price),
    price_desc: desc(products.price),
    name_asc: asc(products.name),
  } as const;
  return map[sort];
}

function filterAndSortStatic(filters: ProductFilters): Product[] {
  let items = STATIC_PRODUCTS.filter((p) => {
    if (!p.isActive) return false;
    if (filters.categoryId && p.categoryId !== filters.categoryId) return false;
    if (filters.minPriceCents !== undefined && p.price < filters.minPriceCents) return false;
    if (filters.maxPriceCents !== undefined && p.price > filters.maxPriceCents) return false;
    if (filters.organic && !p.isOrganic) return false;
    if (filters.inStock && p.stock === 0) return false;
    if (filters.onSale && !(p.comparePrice !== null && p.comparePrice > p.price)) return false;
    if (filters.search) {
      const term = filters.search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(term) &&
        !(p.shortDescription ?? "").toLowerCase().includes(term)
      )
        return false;
    }
    return true;
  });

  const sort = filters.sort ?? "newest";
  if (sort === "price_asc") items = [...items].sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") items = [...items].sort((a, b) => b.price - a.price);
  else if (sort === "name_asc") items = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return items;
}

/** Dynamic — called per-request, driven by searchParams filters */
export async function getProducts(
  filters: ProductFilters = {}
): Promise<ProductsResult> {
  const { page = 1, limit = 24, sort = "newest" } = filters;

  if (!isDatabaseConfigured) {
    const all = filterAndSortStatic({ ...filters, sort });
    const total = all.length;
    const offset = (page - 1) * limit;
    return {
      items: all.slice(offset, offset + limit),
      total,
      page,
      limit,
      pageCount: Math.ceil(total / limit),
    };
  }

  const offset = (page - 1) * limit;
  const where = buildWhere(filters);
  const orderBy = buildOrderBy(sort);

  const [items, [{ total }]] = await Promise.all([
    db
      .select()
      .from(products)
      .where(where)
      .orderBy(orderBy)
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(products).where(where),
  ]);

  return {
    items,
    total: Number(total),
    page,
    limit,
    pageCount: Math.ceil(Number(total) / limit),
  };
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", "featured");

  if (!isDatabaseConfigured)
    return STATIC_PRODUCTS.filter((p) => p.isFeatured && p.isActive).slice(0, limit);

  return db
    .select()
    .from(products)
    .where(and(eq(products.isFeatured, true), eq(products.isActive, true)))
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getProductsOnSale(limit = 24): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", "deals");

  if (!isDatabaseConfigured)
    return STATIC_PRODUCTS.filter(
      (p) => p.isActive && p.comparePrice !== null && p.comparePrice > p.price
    ).slice(0, limit);

  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.isActive, true),
        isNotNull(products.comparePrice),
        sql`${products.comparePrice} > ${products.price}`
      )
    )
    .orderBy(desc(products.createdAt))
    .limit(limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);

  if (!isDatabaseConfigured)
    return STATIC_PRODUCTS.find((p) => p.slug === slug && p.isActive) ?? null;

  const [result] = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.isActive, true)))
    .limit(1);

  return result ?? null;
}

export async function getRelatedProducts(
  categoryId: string,
  excludeId: string,
  limit = 6
): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `category:${categoryId}`);

  if (!isDatabaseConfigured)
    return STATIC_PRODUCTS.filter(
      (p) => p.categoryId === categoryId && p.isActive && p.id !== excludeId
    ).slice(0, limit);

  return db
    .select()
    .from(products)
    .where(
      and(
        eq(products.categoryId, categoryId),
        eq(products.isActive, true),
        ne(products.id, excludeId)
      )
    )
    .orderBy(desc(products.isFeatured), desc(products.createdAt))
    .limit(limit);
}

export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  if (!isDatabaseConfigured)
    return STATIC_PRODUCTS.filter((p) => p.isActive).map((p) => p.slug);

  const rows = await db
    .select({ slug: products.slug })
    .from(products)
    .where(eq(products.isActive, true));

  return rows.map((r) => r.slug);
}
