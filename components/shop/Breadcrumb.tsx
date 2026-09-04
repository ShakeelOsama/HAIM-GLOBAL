import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  crumbs: Crumb[];
}

export default function Breadcrumb({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-stone-500">
        <li>
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-3 text-stone-300 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-stone-900 transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-stone-900 font-medium" aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
