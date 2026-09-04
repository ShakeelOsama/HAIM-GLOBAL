import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — HAIM GLOBAL LLC",
  description:
    "Read the full Terms and Conditions for HAIM GLOBAL, LLC — a New Mexico-registered e-commerce company selling premium grocery products.",
};

const EFFECTIVE_DATE = "January 1, 2026";
const COMPANY_NAME = "HAIM GLOBAL, LLC";
const COMPANY_ADDRESS = "2105 Vista Oeste NW, Albuquerque, NM 87120, USA";
const CONTACT_EMAIL = "hamzanoor438446@gmail.com";
const CONTACT_EMAIL2 = "asimfarooq138446@gmail.com";
const CONTACT_PHONE = "(575) 305-3552";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-widest mb-2">
          Legal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          Terms &amp; Conditions
        </h1>
        <p className="text-stone-500 text-sm">
          Effective Date: {EFFECTIVE_DATE} &bull; {COMPANY_NAME}
        </p>
      </div>

      {/* Intro box */}
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 mb-10 text-sm text-stone-700 leading-relaxed">
        <p>
          Please read these Terms and Conditions (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) carefully
          before using our website and any services operated by{" "}
          <strong>{COMPANY_NAME}</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). By
          accessing or purchasing from our platform you agree to be bound by
          these Terms in full.
        </p>
      </div>

      <div className="prose prose-stone max-w-none text-sm leading-relaxed space-y-10">

        {/* 1 — Company Information */}
        <Section num="1" title="Company Information">
          <p>
            <strong>{COMPANY_NAME}</strong> is a limited liability company
            registered in the United States of America. We operate an online
            retail platform that sells premium food, grocery, and specialty
            products to consumers across the United States.
          </p>
          <InfoTable rows={[
            ["Legal Name", COMPANY_NAME],
            ["Entity Type", "Limited Liability Company (LLC)"],
            ["Entity State", "New Mexico (NM), USA"],
            ["State File Number", "0008120397"],
            ["Incorporation Date", "July 31, 2026"],
            ["Fiscal Year End", "December"],
            ["Mailing Address", COMPANY_ADDRESS],
            ["Email", CONTACT_EMAIL],
            ["Email 2", CONTACT_EMAIL2],
            ["Phone", CONTACT_PHONE],
          ]} />
        </Section>

        {/* 2 — Eligibility */}
        <Section num="2" title="Eligibility">
          <p>
            Our services are available only to persons who are 18 years of age
            or older and can legally enter into binding contracts under
            applicable law. By using our platform you represent and warrant
            that you meet these requirements. We reserve the right to refuse
            service to anyone at our sole discretion.
          </p>
        </Section>

        {/* 3 — Account Registration */}
        <Section num="3" title="Account Registration">
          <p>
            To place an order you may be required to create an account. You
            agree to provide accurate, current, and complete information. You
            are responsible for maintaining the confidentiality of your
            account credentials and for all activity that occurs under your
            account. Notify us immediately at {CONTACT_EMAIL} of any
            unauthorized use.
          </p>
        </Section>

        {/* 4 — Products & Descriptions */}
        <Section num="4" title="Products and Product Descriptions">
          <p>
            {COMPANY_NAME} makes every effort to display products and pricing
            accurately. We do not warrant that product descriptions, images,
            pricing, or other content are error-free. We reserve the right to
            correct errors and to limit the quantities of any product sold.
            Product availability is subject to change without notice.
          </p>
          <p>
            All food products sold through our platform comply with applicable
            US Federal and State food safety regulations, including the FDA
            Food Safety Modernization Act (FSMA) and relevant USDA standards.
          </p>
        </Section>

        {/* 5 — Pricing & Payment */}
        <Section num="5" title="Pricing and Payment Terms">
          <ul>
            <li>All prices are listed in US Dollars (USD) and are inclusive of applicable product costs but exclusive of shipping fees and taxes unless stated otherwise.</li>
            <li>Sales tax will be calculated and added at checkout in accordance with applicable state and local tax laws.</li>
            <li>We accept major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and other payment methods as displayed at checkout. All payments are processed through our PCI-DSS compliant payment processor.</li>
            <li>By submitting an order, you authorize {COMPANY_NAME} to charge the full order amount, including applicable taxes and shipping fees, to your chosen payment method.</li>
            <li>Prices are subject to change without notice. The price at the time of your order confirmation is the binding price for that transaction.</li>
            <li>In the event of a pricing error, we reserve the right to cancel the order and issue a full refund.</li>
          </ul>
        </Section>

        {/* 6 — Order Acceptance */}
        <Section num="6" title="Order Acceptance and Cancellation">
          <p>
            Your order constitutes an offer to purchase. We reserve the right
            to accept or decline any order at our discretion. A binding
            contract is formed when we send you an order confirmation email.
            We may cancel any order for reasons including but not limited to:
            product unavailability, suspected fraud, pricing errors, or
            inability to verify payment.
          </p>
          <p>
            You may cancel an order within 1 hour of placement provided it has
            not yet been shipped. Contact us at {CONTACT_EMAIL} or{" "}
            {CONTACT_PHONE} to request a cancellation.
          </p>
        </Section>

        {/* 7 — Shipping & Delivery */}
        <Section num="7" title="Shipping and Delivery">
          <ul>
            <li>We ship to all 50 US states and the District of Columbia. We do not currently ship internationally.</li>
            <li>Standard delivery: 3–5 business days. Expedited delivery: 1–2 business days (additional fee applies).</li>
            <li>Free standard shipping is available on orders totaling $75 or more before taxes and after any discounts.</li>
            <li>Delivery estimates are not guaranteed and may be affected by carrier delays, weather, or other factors beyond our control.</li>
            <li>Risk of loss and title for products pass to you upon delivery to the carrier.</li>
            <li>Perishable items are packaged with appropriate temperature-controlled materials. We are not liable for spoilage resulting from delivery delays caused by carriers or incorrect shipping addresses provided by the customer.</li>
          </ul>
        </Section>

        {/* 8 — Returns & Refunds */}
        <Section num="8" title="Returns, Refunds, and Exchanges">
          <p>
            Your satisfaction is our priority. We stand behind every product
            we sell.
          </p>
          <ul>
            <li><strong>Non-perishable items:</strong> May be returned within 30 days of delivery, unused and in original packaging, for a full refund.</li>
            <li><strong>Perishable/food items:</strong> If you receive a damaged, spoiled, or incorrect item, contact us within 48 hours of delivery with photographic evidence. We will issue a replacement or full refund at our discretion.</li>
            <li><strong>Refund processing:</strong> Approved refunds are processed within 5–10 business days to the original payment method.</li>
            <li><strong>Return shipping:</strong> For non-perishable items, return shipping costs are the customer&rsquo;s responsibility unless the return is due to our error.</li>
            <li>Items purchased during final-sale promotions are non-refundable unless defective.</li>
          </ul>
        </Section>

        {/* 9 — Intellectual Property */}
        <Section num="9" title="Intellectual Property">
          <p>
            All content on this website — including but not limited to logos,
            text, images, graphics, product descriptions, and software — is
            the property of {COMPANY_NAME} or its licensors and is protected
            by United States and international intellectual property laws. You
            may not reproduce, distribute, modify, or use any content without
            our prior written consent.
          </p>
        </Section>

        {/* 10 — Prohibited Use */}
        <Section num="10" title="Prohibited Conduct">
          <p>You agree not to:</p>
          <ul>
            <li>Use our platform for any unlawful purpose or in violation of these Terms.</li>
            <li>Attempt to gain unauthorized access to any part of our systems or infrastructure.</li>
            <li>Submit false, misleading, or fraudulent information in connection with any order or account.</li>
            <li>Use automated bots or scrapers to access our platform without written permission.</li>
            <li>Resell products purchased from our platform without prior written authorization from {COMPANY_NAME}.</li>
            <li>Engage in any conduct that could damage, disable, or impair the operation of our platform.</li>
          </ul>
        </Section>

        {/* 11 — Privacy */}
        <Section num="11" title="Privacy Policy">
          <p>
            Your use of our platform is also governed by our{" "}
            <Link href="/privacy" className="text-brand-600 underline hover:text-brand-700">
              Privacy Policy
            </Link>
            , which is incorporated herein by reference. We collect, use, and
            protect your personal information in accordance with the California
            Consumer Privacy Act (CCPA), the Children&rsquo;s Online Privacy
            Protection Act (COPPA), and all other applicable US privacy laws.
            We do not sell your personal information to third parties.
          </p>
        </Section>

        {/* 12 — Disclaimer of Warranties */}
        <Section num="12" title="Disclaimer of Warranties">
          <p>
            Our platform and products are provided &ldquo;as is&rdquo; and &ldquo;as
            available.&rdquo; To the fullest extent permitted by law, {COMPANY_NAME}{" "}
            disclaims all warranties, express or implied, including but not
            limited to implied warranties of merchantability, fitness for a
            particular purpose, and non-infringement. We do not warrant that
            our platform will be uninterrupted, error-free, or free of viruses.
          </p>
        </Section>

        {/* 13 — Limitation of Liability */}
        <Section num="13" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, in no event
            shall {COMPANY_NAME}, its officers, directors, employees, agents,
            or affiliates be liable for any indirect, incidental, special,
            consequential, or punitive damages arising out of or related to
            your use of our platform or products, even if advised of the
            possibility of such damages.
          </p>
          <p>
            Our total aggregate liability for any claim related to our
            platform or products shall not exceed the greater of (a) the
            amount you paid for the specific product giving rise to the claim
            or (b) one hundred US Dollars ($100.00).
          </p>
        </Section>

        {/* 14 — Indemnification */}
        <Section num="14" title="Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless {COMPANY_NAME}
            and its affiliates, officers, directors, employees, and agents
            from and against any claims, liabilities, damages, losses, costs,
            and expenses (including reasonable attorneys&rsquo; fees) arising out
            of or relating to: (a) your use of our platform; (b) your
            violation of these Terms; or (c) your violation of any third-party
            rights.
          </p>
        </Section>

        {/* 15 — Governing Law & Dispute Resolution */}
        <Section num="15" title="Governing Law and Dispute Resolution">
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the State of New York, United States, without regard
            to its conflict of law provisions.
          </p>
          <p>
            Any dispute arising under or related to these Terms shall first be
            submitted to good-faith negotiation. If not resolved within 30
            days, disputes shall be resolved by binding arbitration conducted
            by the American Arbitration Association (AAA) under its Consumer
            Arbitration Rules, in New York County, New York. Class action
            lawsuits and class-wide arbitration are waived to the fullest
            extent permitted by law.
          </p>
          <p>
            Notwithstanding the foregoing, either party may seek injunctive or
            other equitable relief from any court of competent jurisdiction.
          </p>
        </Section>

        {/* 16 — Changes to Terms */}
        <Section num="16" title="Changes to These Terms">
          <p>
            We reserve the right to modify these Terms at any time. Changes
            will be posted on this page with an updated effective date. Your
            continued use of our platform after changes are posted constitutes
            your acceptance of the revised Terms. We encourage you to review
            these Terms periodically.
          </p>
        </Section>

        {/* 17 — Severability */}
        <Section num="17" title="Severability and Waiver">
          <p>
            If any provision of these Terms is held to be invalid or
            unenforceable, such provision shall be modified to the minimum
            extent necessary to make it enforceable, and the remaining
            provisions shall continue in full force and effect. Our failure to
            enforce any right or provision of these Terms shall not constitute
            a waiver of such right or provision.
          </p>
        </Section>

        {/* 18 — Contact */}
        <Section num="18" title="Contact Us">
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <InfoTable rows={[
            ["Company", COMPANY_NAME],
            ["State File No.", "0008120397"],
            ["State", "New Mexico (NM), USA"],
            ["Address", COMPANY_ADDRESS],
            ["Email", CONTACT_EMAIL],
            ["Email 2", CONTACT_EMAIL2],
            ["Phone", CONTACT_PHONE],
          ]} />
        </Section>

      </div>

      {/* Footer CTA */}
      <div className="mt-12 border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-xs text-stone-500">
          Last updated: {EFFECTIVE_DATE} &bull; &copy; 2026 {COMPANY_NAME}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="text-xs text-brand-600 hover:text-brand-700 underline">
            Privacy Policy
          </Link>
          <Link href="/shop" className="text-xs text-brand-600 hover:text-brand-700 underline">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-base font-bold text-stone-900 mb-3 flex items-center gap-2">
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold shrink-0">
          {num}
        </span>
        {title}
      </h2>
      <div className="text-stone-600 leading-relaxed space-y-3 pl-8">
        {children}
      </div>
    </section>
  );
}

function InfoTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full mt-3 text-sm border border-stone-200 rounded-lg overflow-hidden">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b border-stone-100 last:border-0">
            <td className="py-2 px-4 font-semibold text-stone-700 bg-stone-50 w-40 align-top">
              {label}
            </td>
            <td className="py-2 px-4 text-stone-600">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
