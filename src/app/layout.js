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

// Runs before first paint so a returning visitor never sees the default theme flash
const THEMES = ["sand", "linen", "espresso", "night"];
const themeScript = `try{var t=localStorage.getItem("theme");if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" data-theme={site.theme || "sand"} className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
