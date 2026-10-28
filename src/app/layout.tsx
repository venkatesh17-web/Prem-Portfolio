import type { Metadata } from "next";
import "./globals.css";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://premthorat.dev"),
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  openGraph: {
    title: portfolio.seo.title,
    description: portfolio.seo.description,
    type: "website",
    images: [{ url: portfolio.portrait, width: 800, height: 800, alt: portfolio.portraitAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolio.seo.title,
    description: portfolio.seo.description,
  },
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-overlay grid-bg">{children}</body>
    </html>
  );
}
