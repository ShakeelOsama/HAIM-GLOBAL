import "server-only";
import { db, isDatabaseConfigured } from "@/lib/db";
import { reviews, users } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

export type ReviewWithUser = {
  id: string;
  rating: number;
  title: string | null;
  body: string | null;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: Date;
  userName: string | null;
};

export async function getProductReviews(
  productId: string,
  limit = 20
): Promise<ReviewWithUser[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews", `reviews:${productId}`);

  if (!isDatabaseConfigured) return [];

  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      body: reviews.body,
      isVerifiedPurchase: reviews.isVerifiedPurchase,
      helpfulCount: reviews.helpfulCount,
      createdAt: reviews.createdAt,
      userName: users.name,
    })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true)))
    .orderBy(desc(reviews.helpfulCount), desc(reviews.createdAt))
    .limit(limit);
}
