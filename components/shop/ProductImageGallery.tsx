"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-stone-100 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-24 text-stone-300"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
    );
  }

  const safeActive = Math.min(active, images.length - 1);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
        <Image
          src={images[safeActive]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-200"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-pressed={i === safeActive}
              className={`relative size-16 rounded-lg overflow-hidden border-2 transition-colors shrink-0 ${
                i === safeActive
                  ? "border-brand-600"
                  : "border-stone-200 hover:border-stone-400"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
