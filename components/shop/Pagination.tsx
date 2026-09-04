import Link from "next/link";

interface Props {
  page: number;
  pageCount: number;
  /** Current URL search params string (without page=) */
  baseParams: string;
  basePath: string;
}

function buildUrl(path: string, params: string, page: number) {
  const sp = new URLSearchParams(params);
  sp.set("page", String(page));
  return `${path}?${sp.toString()}`;
}

export default function Pagination({
  page,
  pageCount,
  baseParams,
  basePath,
}: Props) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  // Show at most 7 page numbers: first, last, current ±2, and ellipsis gaps
  const visible = pages.filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 2
  );

  const withGaps: (number | "…")[] = [];
  for (let i = 0; i < visible.length; i++) {
    if (i > 0 && visible[i] - visible[i - 1] > 1) withGaps.push("…");
    withGaps.push(visible[i]);
  }

  const prev = page > 1 ? buildUrl(basePath, baseParams, page - 1) : null;
  const next = page < pageCount ? buildUrl(basePath, baseParams, page + 1) : null;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-10"
    >
      {prev ? (
        <Link
          href={prev}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 cursor-not-allowed" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </span>
      )}

      {withGaps.map((item, i) =>
        item === "…" ? (
          <span key={`gap-${i}`} className="flex h-9 w-9 items-center justify-center text-stone-400 text-sm">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildUrl(basePath, baseParams, item)}
            aria-current={item === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              item === page
                ? "bg-brand-600 text-white"
                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            }`}
          >
            {item}
          </Link>
        )
      )}

      {next ? (
        <Link
          href={next}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
          aria-label="Next page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-300 cursor-not-allowed" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </nav>
  );
}
