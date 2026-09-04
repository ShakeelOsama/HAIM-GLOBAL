import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — HAIM GLOBAL LLC",
  description: "Privacy Policy for HAIM GLOBAL LLC — how we collect, use, and protect your personal information. Effective January 2026.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">Legal</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">Privacy Policy</h1>
        <p className="text-stone-500 text-sm">
          Effective Date: January 1, 2026 &bull; HAIM GLOBAL LLC
        </p>
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 mb-10 text-sm text-stone-700 leading-relaxed">
        <p>
          HAIM GLOBAL LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) is committed to protecting your
          personal information. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website or make a purchase.
        </p>
      </div>

      <div className="space-y-8 text-sm text-stone-600 leading-relaxed">
        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">1. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal identifiers:</strong> Name, email address, phone number, billing and shipping address.</li>
            <li><strong>Payment information:</strong> Credit/debit card details (processed and stored by our PCI-compliant payment processor — we do not store raw card numbers).</li>
            <li><strong>Transaction data:</strong> Products purchased, order history, and preferences.</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information, and cookies.</li>
            <li><strong>Communications:</strong> Messages you send to our customer support team.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Process and fulfill your orders and payments.</li>
            <li>Communicate order status, shipping updates, and receipts.</li>
            <li>Provide customer support and respond to inquiries.</li>
            <li>Send promotional emails (you may opt out at any time).</li>
            <li>Improve our website and product offerings.</li>
            <li>Comply with legal obligations and prevent fraud.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">3. Data Sharing</h2>
          <p>We do not sell your personal information. We share data only with:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Payment processors</strong> to complete transactions.</li>
            <li><strong>Shipping carriers</strong> to deliver your orders.</li>
            <li><strong>Service providers</strong> who assist in operating our platform (under confidentiality agreements).</li>
            <li><strong>Law enforcement</strong> when required by applicable law.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">4. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing
            experience, remember your cart, analyze site traffic, and personalize
            content. You may disable cookies in your browser settings, but some
            features may not function correctly.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">5. Your Rights (CCPA &amp; Applicable Law)</h2>
          <p>Depending on your state of residence, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate data.</li>
            <li>Request deletion of your personal data.</li>
            <li>Opt out of marketing communications at any time.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at{" "}
            <a href="mailto:hamzanoor438446@gmail.com" className="text-brand-600 underline">
              hamzanoor438446@gmail.com
            </a>{" "}or{" "}
            <a href="mailto:asimfarooq138446@gmail.com" className="text-brand-600 underline">
              asimfarooq138446@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">6. Data Security</h2>
          <p>
            We implement industry-standard security measures including SSL/TLS
            encryption, PCI-DSS compliant payment processing, and access
            controls to protect your personal information. No method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">7. Children&rsquo;s Privacy</h2>
          <p>
            Our services are not directed to children under 13. We do not
            knowingly collect personal information from children under 13. If
            you believe we have inadvertently collected such information, please
            contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="font-bold text-stone-900 text-base mb-3">8. Contact</h2>
          <p>
            For privacy-related questions, contact HAIM GLOBAL, LLC at:<br />
            Email: hamzanoor438446@gmail.com<br />
            Email 2: asimfarooq138446@gmail.com<br />
            Phone: (575) 305-3552<br />
            Address: 2105 Vista Oeste NW, Albuquerque, NM 87120, USA
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-stone-500">
          © 2026 HAIM GLOBAL LLC. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/terms" className="text-xs text-brand-600 hover:text-brand-700 underline">
            Terms &amp; Conditions
          </Link>
          <Link href="/shop" className="text-xs text-brand-600 hover:text-brand-700 underline">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
