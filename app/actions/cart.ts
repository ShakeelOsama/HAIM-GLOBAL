"use server";

import { cookies } from "next/headers";
import { db, isDatabaseConfigured } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string | null;
  price: number;
  qty: number;
  unit: string;
}

export type CartActionResult = { success: boolean; error?: string };

async function readCart(): Promise<CartItem[]> {
  const store = await cookies();
  const raw = store.get("cart")?.value;
  if (!raw) return [];
  try {
    return JSON.parse(decodeURIComponent(raw)) as CartItem[];
  } catch {
    return [];
  }
}

async function writeCart(items: CartItem[]): Promise<void> {
  const store = await cookies();
  store.set("cart", encodeURIComponent(JSON.stringify(items)), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    // Not httpOnly — CartButton reads via document.cookie
  });
}

export async function addToCart(
  _prev: CartActionResult | null,
  formData: FormData
): Promise<CartActionResult> {
  const productId = formData.get("productId") as string | null;
  const qty = Math.max(1, parseInt((formData.get("qty") as string) ?? "1", 10));

  if (!productId) return { success: false, error: "Invalid product" };
  if (!isDatabaseConfigured) return { success: false, error: "Service unavailable" };

  const [product] = await db
    .select({
      id: products.id,
      slug: products.slug,
      name: products.name,
      price: products.price,
      unit: products.unit,
      stock: products.stock,
      images: products.images,
    })
    .from(products)
    .where(and(eq(products.id, productId), eq(products.isActive, true)))
    .limit(1);

  if (!product) return { success: false, error: "Product not found" };
  if (product.stock === 0) return { success: false, error: "Out of stock" };

  const items = await readCart();
  const existing = items.find((i) => i.id === productId);

  if (existing) {
    existing.qty = Math.min(existing.qty + qty, product.stock);
  } else {
    items.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: (product.images as string[])[0] ?? null,
      price: product.price,
      qty,
      unit: product.unit,
    });
  }

  await writeCart(items);
  return { success: true };
}

export async function updateCartQty(
  _prev: CartActionResult | null,
  formData: FormData
): Promise<CartActionResult> {
  const productId = formData.get("productId") as string | null;
  const qty = parseInt((formData.get("qty") as string) ?? "0", 10);

  if (!productId) return { success: false, error: "Invalid product" };

  const items = await readCart();

  if (qty <= 0) {
    const updated = items.filter((i) => i.id !== productId);
    await writeCart(updated);
  } else {
    const existing = items.find((i) => i.id === productId);
    if (existing) existing.qty = qty;
    await writeCart(items);
  }

  return { success: true };
}

export async function removeFromCart(
  _prev: CartActionResult | null,
  formData: FormData
): Promise<CartActionResult> {
  const productId = formData.get("productId") as string | null;
  if (!productId) return { success: false, error: "Invalid product" };

  const items = await readCart();
  await writeCart(items.filter((i) => i.id !== productId));
  return { success: true };
}
