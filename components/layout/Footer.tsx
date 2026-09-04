import Link from "next/link";
import { cacheLife } from "next/cache";

const footerSections = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All Products" },
      { href: "/deals", label: "Deals & Offers" },
      { href: "/shop?filter=organic", label: "Organic" },
      { href: "/shop?filter=new", label: "New Arrivals" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/returns", label: "Returns & Refunds" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About HAIM GLOBAL" },
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  try {
    return new Date().getFullYear();
  } catch {
    return 2025;
  }
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-brand-400"
              >
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5v1.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06L11.25 11.56V15a.75.75 0 0 0 1.5 0v-3.44l1.41 1.41a.75.75 0 1 0 1.06-1.06L13.5 10.19V9H15a.75.75 0 0 0 0-1.5H9Z" />
              </svg>
              <span className="font-bold text-white text-xl">
                HAIM<span className="text-brand-400"> GLOBAL</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
              HAIM GLOBAL LLC — Premium grocery delivered to your door across
              all 50 states. Jams, spreads, snacks, produce and more.
              Quality guaranteed.
            </p>
            <p className="text-xs text-stone-600 mt-3 leading-relaxed max-w-xs">
              Registered in New Mexico (NM), USA.<br />
              State File No. 0008120397 &bull; Inc. Jul 31, 2026<br />
              2105 Vista Oeste NW, Albuquerque, NM 87120
            </p>

            {/* Social links */}
            <div className="mt-5 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-stone-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>© {year} HAIM GLOBAL, LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
