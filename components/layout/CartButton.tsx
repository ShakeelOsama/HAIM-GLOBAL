"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function readCount() {
      try {
        const raw = document.cookie.match(/(?:^|;\s*)cart=([^;]+)/)?.[1];
        if (!raw) return 0;
        const items: { qty: number }[] = JSON.parse(decodeURIComponent(raw));
        return items.reduce((sum, item) => sum + (item.qty ?? 0), 0);
      } catch {
        return 0;
      }
    }

    setCount(readCount());

    // Re-read whenever cart cookie changes (dispatched by cart actions in Chunk 4)
    window.addEventListener("cart:updated", () => setCount(readCount()));
    return () =>
      window.removeEventListener("cart:updated", () => setCount(readCount()));
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
      className="relative flex h-9 w-9 items-center justify-center rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-white text-[10px] font-bold leading-none tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
