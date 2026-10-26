import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";

// Self-hosted at build time: crisp, no layout shift, no request to Google on page view
const sans = Geist({ subsets: ["latin", "latin-ext", "vietnamese"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata = {
  title: site.name ? `${site.name} · ${site.tagline}` : site.tagline,
  description: site.intro,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
