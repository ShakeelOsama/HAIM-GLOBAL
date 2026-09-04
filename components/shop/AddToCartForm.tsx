"use client";

import { useActionState, useEffect, useState } from "react";
import { addToCart } from "@/app/actions/cart";

interface Props {
  productId: string;
  stock: number;
}

export default function AddToCartForm({ productId, stock }: Props) {
  const [state, formAction, isPending] = useActionState(addToCart, null);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (state?.success) {
      window.dispatchEvent(new CustomEvent("cart:updated"));
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 2000);
      return () => clearTimeout(t);
    }
  }, [state]);

  const max = Math.min(stock, 99);

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-stone-700">Quantity</span>
        <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" />
            </svg>
          </button>
          <span className="w-10 text-center text-sm font-semibold text-stone-900 tabular-nums">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(max, q + 1))}
            disabled={qty >= max}
            className="flex h-10 w-10 items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="M10.75 6.75a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to cart form */}
      <form action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="qty" value={qty} />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            justAdded
              ? "bg-brand-700 text-white"
              : "bg-brand-600 text-white hover:bg-brand-700 active:scale-[0.98]"
          } disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600`}
        >
          {isPending ? (
            <>
              <svg
                className="size-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z"
                />
              </svg>
              Adding...
            </>
          ) : justAdded ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              Added to Cart!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </button>
      </form>

      {/* Error state */}
      {state && !state.success && state.error && (
        <p className="text-sm text-red-600 font-medium">{state.error}</p>
      )}
    </div>
  );
}
