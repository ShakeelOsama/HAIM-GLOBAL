import Link from "next/link";
import CartButton from "./CartButton";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/about", label: "About Us" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <>
      {/* Announcement bar — fully static, zero JS */}
      <div className="bg-brand-600 text-white text-sm text-center py-2 px-4">
        HAIM GLOBAL LLC &mdash; Free shipping on orders over $75 &mdash;{" "}
        <Link
          href="/shop"
          className="underline font-semibold hover:no-underline"
        >
          Shop now
        </Link>
      </div>

      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7 text-brand-600"
            >
              <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5v1.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06L11.25 11.56V15a.75.75 0 0 0 1.5 0v-3.44l1.41 1.41a.75.75 0 1 0 1.06-1.06L13.5 10.19V9H15a.75.75 0 0 0 0-1.5H9Z" />
            </svg>
            <span className="font-bold text-stone-900 text-xl tracking-tight">
              HAIM<span className="text-brand-600"> GLOBAL</span>
            </span>
          </Link>

          {/* Desktop nav — Server-rendered, zero client JS */}
          <nav
            className="hidden md:flex items-center gap-0.5 ml-4"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-stone-600 rounded-md hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="ml-auto flex items-center gap-0.5">
            {/* Search — simple link until Chunk 2 search overlay */}
            <Link
              href="/search"
              aria-label="Search"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </Link>

            {/* Cart — client component (shows live count) */}
            <CartButton />

            {/* Account — will become session-aware in Chunk 5 */}
            <Link
              href="/sign-in"
              className="hidden sm:flex h-9 items-center gap-1.5 pl-2 pr-3 rounded-md text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Sign In
            </Link>

            {/* Mobile nav toggle — client, isolated */}
            <MobileNav links={navLinks} />
          </div>
        </div>
      </header>
    </>
  );
}
