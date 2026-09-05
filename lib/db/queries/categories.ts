import "server-only";
import { db, isDatabaseConfigured } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { and, asc, eq, isNull } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { STATIC_CATEGORIES } from "@/lib/static/products";

export type Category = typeof categories.$inferSelect;

export async function getTopLevelCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  if (!isDatabaseConfigured)
    return STATIC_CATEGORIES.filter((c) => !c.parentId).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );

  return db
    .select()
    .from(categories)
    .where(and(eq(categories.isActive, true), isNull(categories.parentId)))
    .orderBy(asc(categories.displayOrder), asc(categories.name));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", `category:${slug}`);

  if (!isDatabaseConfigured)
    return STATIC_CATEGORIES.find((c) => c.slug === slug && c.isActive) ?? null;

  const [result] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.slug, slug), eq(categories.isActive, true)))
    .limit(1);

  return result ?? null;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories", `category:${id}`);

  if (!isDatabaseConfigured)
    return STATIC_CATEGORIES.find((c) => c.id === id && c.isActive) ?? null;

  const [result] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.id, id), eq(categories.isActive, true)))
    .limit(1);

  return result ?? null;
}

export async function getAllCategorySlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  if (!isDatabaseConfigured)
    return STATIC_CATEGORIES.filter((c) => c.isActive).map((c) => c.slug);

  const rows = await db
    .select({ slug: categories.slug })
    .from(categories)
    .where(eq(categories.isActive, true));

  return rows.map((r) => r.slug);
}
