import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About HAIM GLOBAL LLC",
  description:
    "Learn about HAIM GLOBAL, LLC — a New Mexico-registered e-commerce company delivering premium grocery products nationwide.",
};

const brands = [
  {
    name: "HAIM ORGANIC",
    category: "Organic Produce",
    desc: "Our certified organic line, sourced exclusively from USDA-certified farms across California, Washington, and Oregon.",
    color: "bg-green-50 border-green-200",
    badge: "USDA Organic",
  },
  {
    name: "HAIM PRIME",
    category: "Premium Meats & Seafood",
    desc: "Humanely raised meats and wild-caught seafood from sustainable US fisheries and ranches.",
    color: "bg-red-50 border-red-200",
    badge: "Premium Select",
  },
  {
    name: "HAIM ARTISAN",
    category: "Bakery & Specialty",
    desc: "Small-batch artisan breads, pastries, and specialty foods crafted by expert bakers and food artisans.",
    color: "bg-amber-50 border-amber-200",
    badge: "Handcrafted",
  },
  {
    name: "HAIM FRESH",
    category: "Dairy & Eggs",
    desc: "Pasture-raised, grass-fed dairy and free-range eggs directly from family-owned farms across the US.",
    color: "bg-blue-50 border-blue-200",
    badge: "Farm Direct",
  },
  {
    name: "HAIM BREW",
    category: "Beverages",
    desc: "Cold-pressed juices, small-batch cold brews, and craft beverages made from premium single-origin ingredients.",
    color: "bg-orange-50 border-orange-200",
    badge: "Cold Pressed",
  },
  {
    name: "HAIM SNACKS",
    category: "Snacks & Confections",
    desc: "Wholesome trail mixes, premium nuts, artisan chocolates, and guilt-free snacks for every lifestyle.",
    color: "bg-purple-50 border-purple-200",
    badge: "No Preservatives",
  },
  {
    name: "HAIM GLOBAL Own-Brand",
    category: "Jams, Spreads & Sauces",
    desc: "Our signature grocery line — handcrafted jams, nut butters, pasta sauces, and spreads made under the HAIM GLOBAL label. No artificial preservatives, ever.",
    color: "bg-rose-50 border-rose-200",
    badge: "Own Brand",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
  { value: "50", label: "States Served" },
  { value: "4.9★", label: "Average Rating" },
  { value: "6", label: "Brand Lines" },
  { value: "2024", label: "Founded" },
];

const team = [
  {
    name: "Hamza Noor",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur with a passion for making premium food accessible to every American household.",
  },
  {
    name: "Operations Team",
    role: "Fulfillment & Logistics",
    bio: "A dedicated team ensuring every order is picked, packed, and delivered with care and precision.",
  },
  {
    name: "Quality Assurance",
    role: "Food Safety & Standards",
    bio: "Certified food safety specialists ensuring every product meets USDA and FDA standards before it reaches your door.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-accent-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 mb-5">
            <span className="size-1.5 rounded-full bg-brand-600 inline-block" />
            Registered US Business &bull; LLC
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-tight mb-6">
            About{" "}
            <span className="text-brand-600">HAIM GLOBAL</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            HAIM GLOBAL LLC is a United States-registered e-commerce company
            dedicated to delivering premium grocery products — jams, spreads,
            organic produce, snacks, dairy, and specialty items — to households
            across all 50 states. Every American deserves the finest groceries
            at fair, transparent prices.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-colors"
            >
              Shop Our Products
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-full border border-stone-200 px-7 py-3.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </section>

      {/* Company Info Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-stone-900 rounded-3xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Company Details</h2>
            <p className="text-stone-400 text-sm mb-6">
              Official registration and contact information for HAIM GLOBAL, LLC.
            </p>
            <dl className="space-y-3 text-sm">
              {[
                ["Legal Name", "HAIM GLOBAL, LLC"],
                ["Entity Type", "Limited Liability Company (LLC)"],
                ["Entity State", "New Mexico (NM), USA"],
                ["State File Number", "0008120397"],
                ["Inc. Date", "July 31, 2026"],
                ["Fiscal Year End", "December"],
                ["Processed", "July 27, 2026"],
                ["Mailing Address", "2105 Vista Oeste NW, Albuquerque, NM 87120"],
                ["Industry", "Online Grocery & Specialty Products E-Commerce"],
                ["Service Area", "All 50 US States & Washington D.C."],
                ["Email", "hamzanoor438446@gmail.com"],
                ["Email 2", "asimfarooq138446@gmail.com"],
                ["Phone", "(575) 305-3552"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <dt className="w-40 shrink-0 text-stone-500">{label}</dt>
                  <dd className="text-white font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Our Mission
              </p>
              <p className="text-white text-sm leading-relaxed">
                To make premium grocery products — jams, spreads, organic
                produce, snacks, dairy and more — accessible to every American
                through a transparent, trustworthy online marketplace with fair
                prices and guaranteed quality.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Our Vision
              </p>
              <p className="text-white text-sm leading-relaxed">
                To become the most trusted name in online grocery retail in the
                United States — building lasting relationships with customers,
                farmers, and suppliers through integrity, quality, and value.
              </p>
            </div>
            <div className="bg-brand-600 rounded-2xl p-6">
              <p className="text-white text-xs font-semibold uppercase tracking-widest mb-2">
                Compliance &amp; Licensing
              </p>
              <p className="text-brand-100 text-sm leading-relaxed">
                HAIM GLOBAL LLC operates in full compliance with US federal and
                state regulations including FDA FSMA, USDA standards, and all
                applicable e-commerce, consumer protection, and food safety laws.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center rounded-2xl border border-stone-100 bg-stone-50 p-6"
            >
              <p className="text-3xl font-bold text-brand-600">{s.value}</p>
              <p className="text-xs text-stone-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14 border-t border-stone-100">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Our Brand Lines
          </h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto">
            HAIM GLOBAL LLC operates six distinct product lines, each curated
            for a specific food category with its own sourcing standards and quality guarantees.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className={`rounded-2xl border p-6 ${brand.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-stone-900 text-base">{brand.name}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">{brand.category}</p>
                </div>
                <span className="text-xs font-semibold bg-white border border-stone-200 text-stone-700 px-2 py-1 rounded-full">
                  {brand.badge}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{brand.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-stone-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              The People Behind HAIM GLOBAL
            </h2>
            <p className="text-stone-500 text-sm">
              A passionate team committed to quality, transparency, and customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-stone-100 p-6 text-center shadow-sm">
                <div className="size-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-brand-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-stone-900">{member.name}</h3>
                <p className="text-xs text-brand-600 font-medium mt-1">{member.role}</p>
                <p className="text-sm text-stone-500 mt-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Our Core Values
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: "M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z",
              title: "Quality First",
              desc: "Every product is rigorously vetted. We refuse to compromise on quality, period.",
            },
            {
              icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3",
              title: "Transparency",
              desc: "We show exactly where products come from, what's in them, and what you're paying for.",
            },
            {
              icon: "M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z",
              title: "Trust & Security",
              desc: "Bank-grade payment security and a 100% satisfaction guarantee on every order.",
            },
            {
              icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
              title: "Community",
              desc: "We support local US farmers and suppliers, investing in the communities we serve.",
            },
          ].map((val) => (
            <div key={val.title} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
              <div className="size-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-brand-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d={val.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-stone-900 mb-2">{val.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to experience HAIM GLOBAL?
          </h2>
          <p className="text-brand-100 text-sm mb-8 max-w-lg mx-auto">
            Join thousands of satisfied customers across the United States who
            trust HAIM GLOBAL for their premium grocery needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-sm hover:bg-brand-50 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-full border border-brand-400 px-7 py-3.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
