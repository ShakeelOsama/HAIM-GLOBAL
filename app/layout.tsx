import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HAIM GLOBAL — Premium Grocery Delivered",
    template: "%s | HAIM GLOBAL",
  },
  description:
    "Shop premium groceries, organic produce, jams, spreads, and specialty grocery products online at HAIM GLOBAL LLC. Fast US delivery, quality guaranteed.",
  keywords: ["grocery", "online grocery", "organic", "premium grocery", "US delivery", "HAIM GLOBAL", "jam", "spreads"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HAIM GLOBAL",
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL(
    process.env.AUTH_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
