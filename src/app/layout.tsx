import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "motion/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.thinkai.studio"),
  title: {
    default: "ThinkAI UI — 0px Sharp Architectural UI Registry",
    template: "%s | ThinkAI UI",
  },
  description:
    "An infrastructure-grade, copy-pasteable UI component registry for Next.js 16 and React 19. Crafted with 0px sharp architectural geometry, obsidian monochromatic depth, and precision motion physics.",
  keywords: [
    "thinkai-ui",
    "ui registry",
    "design system",
    "zero radius",
    "architectural ui",
    "nextjs 16",
    "react 19",
    "tailwind v4",
    "motion 13",
    "framer-motion",
    "shadcn registry",
  ],
  authors: [{ name: "Nguyen Binh Minh", url: "https://binhminh.thinkai.id.vn" }],
  creator: "ThinkAI Studio",
  publisher: "ThinkAI Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ui.thinkai.studio",
    title: "ThinkAI UI — 0px Sharp Architectural UI Registry",
    description:
      "Infrastructure-grade UI primitives built for technical luxury. 0px border-radius, obsidian depth, and precision motion physics.",
    siteName: "ThinkAI UI",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ThinkAI UI Component Registry Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ThinkAI UI — 0px Sharp Architectural UI Registry",
    description:
      "Infrastructure-grade UI primitives with 0px sharp architectural geometry and obsidian monochromatic depth.",
    images: ["/og.png"],
    creator: "@bnhminh1010",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://ui.thinkai.studio/#software",
      "name": "ThinkAI UI",
      "description": "0px sharp architectural UI registry and component library for Next.js 16 and React 19.",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "author": {
        "@type": "Person",
        "name": "Nguyen Binh Minh",
        "url": "https://binhminh.thinkai.id.vn",
        "jobTitle": "DevOps Engineer / Founder",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://ui.thinkai.studio/#website",
      "url": "https://ui.thinkai.studio",
      "name": "ThinkAI UI Registry",
      "publisher": {
        "@type": "Organization",
        "name": "ThinkAI Studio",
        "url": "https://thinkai.studio",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-tai-bg text-white/90 antialiased min-h-screen selection:bg-white/20`}
      >
        <div className="relative min-h-screen flex flex-col tai-grain">
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
