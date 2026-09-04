import { getProductReviews, type ReviewWithUser } from "@/lib/db/queries/reviews";
import StarRating from "./StarRating";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function ReviewCard({ review }: { review: ReviewWithUser }) {
  const initials = (review.userName ?? "A")
    .split(" ")
    .map((w) => w[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="bg-white rounded-xl border border-stone-100 p-5 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div
          className="size-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm shrink-0"
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-stone-900 text-sm">
              {review.userName ?? "Anonymous"}
            </span>
            {review.isVerifiedPurchase && (
              <span className="text-xs text-brand-600 font-medium">
                Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-xs text-stone-400">
              {dateFormat.format(new Date(review.createdAt))}
            </span>
          </div>
        </div>
      </div>
      {review.title && (
        <p className="font-semibold text-stone-900 mb-1 text-sm">{review.title}</p>
      )}
      {review.body && (
        <p className="text-stone-600 text-sm leading-relaxed">{review.body}</p>
      )}
    </article>
  );
}

export default async function ReviewsSection({
  productId,
}: {
  productId: string;
}) {
  const reviewList = await getProductReviews(productId);
  const count = reviewList.length;
  const average =
    count > 0
      ? reviewList.reduce((sum, r) => sum + r.rating, 0) / count
      : 0;

  return (
    <section aria-labelledby="reviews-heading">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <h2
          id="reviews-heading"
          className="text-2xl font-bold text-stone-900"
        >
          Customer Reviews
        </h2>
        {count > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={average} size="md" />
            <span className="text-sm text-stone-500">
              {average.toFixed(1)} out of 5 &middot; {count}{" "}
              {count === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {count === 0 ? (
        <div className="rounded-xl border border-stone-100 bg-stone-50 px-6 py-12 text-center">
          <p className="text-stone-500 font-medium">No reviews yet.</p>
          <p className="text-stone-400 text-sm mt-1">
            Be the first to share your experience with this product.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reviewList.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}
    </section>
  );
}
