interface Props {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}

function StarIcon({
  fill,
  size,
}: {
  fill: "full" | "half" | "empty";
  size: "sm" | "md" | "lg";
}) {
  const dim = size === "sm" ? "size-3.5" : size === "lg" ? "size-6" : "size-4";
  const color =
    fill === "empty" ? "text-stone-200" : "text-amber-400";

  if (fill === "half") {
    return (
      <span className={`${dim} relative inline-block`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${dim} text-stone-200 absolute inset-0`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${dim} text-amber-400 absolute inset-0`}
          style={{ clipPath: "inset(0 50% 0 0)" }}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${dim} ${color}`}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function StarRating({
  rating,
  count,
  size = "md",
}: Props) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const pos = i + 1;
    if (rating >= pos - 0.25) return "full" as const;
    if (rating >= pos - 0.75) return "half" as const;
    return "empty" as const;
  });

  const label = `${rating.toFixed(1)} out of 5 stars${count !== undefined ? `, ${count} reviews` : ""}`;

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={label}
    >
      {stars.map((fill, i) => (
        <StarIcon key={i} fill={fill} size={size} />
      ))}
      {count !== undefined && (
        <span className="ml-1 text-sm text-stone-500" aria-hidden="true">
          ({count})
        </span>
      )}
    </div>
  );
}
