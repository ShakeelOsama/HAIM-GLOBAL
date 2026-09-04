"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger toggle — visible on mobile only */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="md:hidden flex h-9 w-9 items-center justify-center rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-stone-100 shrink-0">
          <Link
            href="/"
            className="font-bold text-xl text-stone-900"
            onClick={() => setIsOpen(false)}
          >
            HAIM<span className="text-brand-600"> GLOBAL</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-base font-medium text-stone-700 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="p-4 border-t border-stone-100 space-y-2 shrink-0">
          <Link
            href="/sign-in"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center rounded-full border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
}
