import type { Metadata, Viewport } from "next";
import { Newsreader, Karla } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./sitemap";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const body = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


const ogImage = `${siteUrl}/candle2.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quite Flame Co. — Hand-Poured Soy Candles in Troy, Michigan",
    template: "%s | Quite Flame Co.",
  },
  description:
    "Shop hand-poured soy candles from Quite Flame Co., a small candle studio in Troy, Michigan. Natural, clean-burning, long-lasting scented candles made one batch at a time.",
  keywords: [
    "soy candles",
    "hand poured candles",
    "Troy Michigan candles",
    "natural soy wax candles",
    "scented candles online",
    "handmade candles USA",
    "buy candles online",
    "Quiet Flame Co.",
    "small batch candles",
    "eco friendly candles",
  ],
  authors: [{ name: "Quite Flame Co.", url: siteUrl }],
  creator: "Quite Flame Co.",
  publisher: "Quite Flame Co.",
  applicationName: "Quite Flame Co.",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Quite Flame Co.",
    title: "Quiet Flame Co. — Hand-Poured Soy Candles",
    description:
      "Small-batch, hand-poured soy candles made with care in Troy, Michigan. Natural ingredients, clean burn, unforgettable scents.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Quite Flame Co. hand-poured soy candle",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quite  Flame Co. — Hand-Poured Soy Candles",
    description:
      "Small-batch, hand-poured soy candles made with care in Troy, Michigan.",
    images: [ogImage],
    creator: "@quiteflameco",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  category: "shopping",
  verification: {
    // Google Search Console এ verify করার পর কোড বসান
    google: "your-google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
    { media: "(prefers-color-scheme: light)", color: "#faf6f0" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ✅ JSON-LD Structured Data — Google rich results এর জন্য
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Quite Flame Co.",
  image: ogImage,
  url: siteUrl,
  description:
    "Quite Flame Co. is a small studio in Troy, Michigan making hand-poured soy candles, one batch at a time.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Troy",
    addressRegion: "MI",
    addressCountry: "US",
  },
  priceRange: "$$",
  sameAs: [
    "https://www.facebook.com/p/Quite-Flame-61594366916853",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-char font-body text-wax">
        {children}
      </body>
    </html>
  );
}