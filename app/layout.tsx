import type { Metadata } from "next";
import { Newsreader, Karla } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Quiet Flame Co. — Hand-Poured Soy Candles",
  description:
    "Quiet Flame Co. is a small studio in Troy, Michigan making hand-poured soy candles, one batch at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-char font-body text-wax">{children}</body>
    </html>
  );
}