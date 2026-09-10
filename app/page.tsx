"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Fraunces, Karla } from "next/font/google";
import BuyNowModal, { type BuyNowProduct } from "@/app/components/Buynowmodal";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ---------------------------------- data --------------------------------- */
/*
  Drop your five images into /public with these exact names —
  the layout is already cropped/positioned to work with them.
*/

type Product = {
  id: string;
  name: string;
  notes: string;
  price: string;
  image: string;
  focus: "left" | "center";
};

const products: Product[] = [
  {
    id: "sunlit-dahlia",
    name: "Sunlit Dahlia",
    notes: "Dahlia petals, warm honey, soft musk",
    price: "$45.00",
    image: "/candle2.jpg",
    focus: "center",
  },
  {
    id: "peony-linen",
    name: "Peony & Linen",
    notes: "Garden peony, white tea, sun-warmed linen",
    price: "$45.00",
    image: "/candle3.jpg",
    focus: "left",
  },
  {
    id: "olive-lavender",
    name: "Olive & Lavende",
    notes: "Green olive leaf, lavender fields, warm driftwood",
    price: "$45.00",
    image: "/candle4.jpg",
    focus: "left",
  },
  {
    id: "wild-protea",
    name: "Wild Protea",
    notes: "Protea bloom, eucalyptus, quiet forest moss",
    price: "$45.00",
    image: "/candle5.jpg",
    focus: "left",
  },
];

type Testimonial = {
  quote: string;
  name: string;
  city: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Peony & Linen burns for hours and never turns sharp or synthetic. It's the first candle I've bought twice.",
    name: "Renee K.",
    city: "Troy, MI",
  },
  {
    quote:
      "Ordered Sunlit Dahlia for my office and now everyone asks where the smell is coming from. Worth the wait for a refill.",
    name: "David O.",
    city: "Birmingham, MI",
  },
  {
    quote:
      "You can tell these are poured by hand, not mass produced. Olive & Lavender smells expensive without being sweet.",
    name: "Priya S.",
    city: "Royal Oak, MI",
  },
];

/* --------------------------------- icons ---------------------------------- */

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1v3.1c0 .6-.4 1-1 1C10.5 20.5 3.5 13.5 3.5 4.5c0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.1 2.1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LeafIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 20c8 0 15-6 16-16-9 1-16 8-16 16z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6 18c3-4 7-8 12-11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 9.5h2.5V6.5h-2.5c-2 0-3.5 1.5-3.5 3.5v2H8.5v3H10.5V20h3v-5h2.3l.7-3H13.5v-1.5c0-.5.5-1 .5-1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  );
}

function HandmadeBadge({ tone = "light" }: { tone?: "light" | "solid" }) {
  const styles =
    tone === "light"
      ? "border-[#C97C89]/40 bg-white/70 text-[#7A4550]"
      : "border-[#C97C89]/30 bg-[#FBF3F2] text-[#7A4550]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wide transition-transform duration-300 hover:scale-105 ${styles}`}
    >
      <LeafIcon />
      Handmade in Troy, Michigan
    </span>
  );
}

/* --------------------------- nav link w/ underline -------------------------- */

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative text-sm text-[#5C4F44] transition-colors hover:text-[#332821] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] rounded"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C97C89] transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

/* --------------------------- payment trust badges --------------------------- */

function PaymentBadges() {
  // Only Stripe and PayPal are shown per the current checkout options.
  const methods = ["Stripe", "PayPal"];
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-[#7A6E5D]">
        <LockIcon className="h-3.5 w-3.5" />
        Secure checkout
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {methods.map((m) => (
          <span
            key={m}
            className="rounded-md border border-[#EDE4DB] bg-white px-3 py-1.5 text-xs text-[#5C4F44] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ site info data ------------------------------ */
/*
  Site-wide contact + social info, kept as one object so the footer (and any
  future section) can pull from a single source of truth.
*/

const siteInfo = {
  name: "Quiet Flame Co.",
  tagline: "Hand-poured soy candles, made in small batches in Troy, Michigan.",
  phone: {
    display: "(213) 792-0038",
    href: "tel:+12137920038",
  },
  email: {
    display: "quiteflame@official.com",
    href: "mailto:quiteflame@official.com",
  },
  address: "Troy, Michigan",
  social: [
    { label: "Instagram", href: "#", Icon: InstagramIcon },
    { label: "Facebook", href: "#", Icon: FacebookIcon },
  ],
};

/* ---------------------------------- page ---------------------------------- */

export default function CandleLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [buyProduct, setBuyProduct] = useState<BuyNowProduct | null>(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const t = setTimeout(() => setHeroReady(true), 60);
    return () => {
      clearTimeout(t);
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const navLinks = [
    { href: "#shop", label: "Shop" },
    { href: "#about", label: "About" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className={`${karla.className} bg-[#FDFBF7] text-[#332821]`}>
      <style jsx global>{`
        @keyframes heroZoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }
        .hero-zoom {
          animation: heroZoom 9s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-zoom {
            animation: none;
          }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#EDE4DB] bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a
            href="#top"
            className={`${fraunces.className} text-xl tracking-tight text-[#332821] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]`}
          >
            {siteInfo.name}
          </a>

          <nav className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <a
            href={siteInfo.phone.href}
            className="hidden items-center gap-2 rounded-full border border-[#332821] px-5 py-2.5 text-sm text-[#332821] transition-all duration-300 hover:scale-[1.03] hover:bg-[#332821] hover:text-[#FDFBF7] hover:shadow-[0_10px_24px_-10px_rgba(51,40,33,0.5)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] md:inline-flex"
          >
            <PhoneIcon />
            {siteInfo.phone.display}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-[#332821] transition-transform duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] rounded md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-[#EDE4DB] bg-[#FDFBF7] transition-all duration-300 ease-out md:hidden ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-4 px-6 py-5">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} onClick={() => setMenuOpen(false)} />
            ))}
            <a href={siteInfo.phone.href} className="flex items-center gap-2 text-sm text-[#332821]">
              <PhoneIcon />
              {siteInfo.phone.display}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="px-4 pt-8 sm:px-6 sm:pt-12 md:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-30px_rgba(51,40,33,0.35)]">
          <div className="relative h-[560px] w-full sm:h-[600px] md:h-[640px]">
            <div className="hero-zoom absolute inset-0">
              <Image
                src="/candle1.jpg"
                alt="Hand-poured candle surrounded by roses and lavender in a sunlit garden"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[0%] via-[#FDFBF7]/85 via-[58%] to-[#FDFBF7] to-[88%]" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div
              className={`ml-auto w-full max-w-lg px-8 py-10 transition-all duration-700 ease-out sm:px-12 md:pr-16 ${
                heroReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <HandmadeBadge />
              <h1 className={`${fraunces.className} mt-6 text-4xl leading-[1.1] text-[#332821] sm:text-5xl`}>
                A quieter kind of light for the evenings that matter.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#5C4F44]">
                Quiet Flame Co. hand-pours small batches of soy candles from a studio in Troy,
                Michigan. Clean-burning, cotton-wicked, and made to fill a room without shouting.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#shop"
                  className="rounded-full bg-[#C97C89] px-6 py-3 text-sm text-white shadow-[0_14px_30px_-12px_rgba(201,124,137,0.7)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#A85F6C] hover:shadow-[0_18px_36px_-12px_rgba(168,95,108,0.75)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                >
                  Shop the collection
                </a>
                <a
                  href="#about"
                  className="rounded-full border border-[#332821] px-6 py-3 text-sm text-[#332821] transition-all duration-300 hover:scale-[1.04] hover:bg-[#332821] hover:text-[#FDFBF7] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                >
                  Read our story
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="bg-[#FBF7F2] px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <h2 className={`${fraunces.className} text-3xl text-[#332821] sm:text-4xl`}>
              Find your next favorite.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#5C4F44]">
              Four scents, each hand-poured in 9 oz glass jars with a 45–50 hour burn time.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(51,40,33,0.35)] transition-shadow duration-300 group-hover:shadow-[0_28px_55px_-18px_rgba(51,40,33,0.4)]">
                  <Image
                    src={product.image}
                    alt={`${product.name} hand-poured candle`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] ${
                      product.focus === "left" ? "object-left" : "object-center"
                    }`}
                  />
                </div>

                <div className="mt-5 flex flex-1 flex-col px-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`${fraunces.className} text-lg text-[#332821]`}>{product.name}</h3>
                    <span className="whitespace-nowrap text-base text-[#332821]">{product.price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#7A6E5D]">{product.notes}</p>
                  <span className="mt-3 inline-flex w-fit items-center gap-1 text-xs text-[#A85F6C]">
                    <LeafIcon className="h-3 w-3" />
                    Handmade
                  </span>

                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={() =>
                        setBuyProduct({ name: product.name, price: product.price, image: product.image })
                      }
                      className="w-full rounded-full bg-[#C97C89] px-4 py-2.5 text-xs text-white shadow-[0_10px_22px_-10px_rgba(201,124,137,0.75)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#A85F6C] hover:shadow-[0_14px_26px_-10px_rgba(168,95,108,0.8)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2] cursor-pointer"
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / story */}
      <section id="about" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`${fraunces.className} text-3xl text-[#332821] sm:text-4xl`}>
            Poured slow, in small batches.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5C4F44]">
            Every candle is measured, poured, and finished by hand in a small studio in Troy.
            We keep batches small so we can watch every wick and every pour — nothing about
            it is automated, and that&rsquo;s exactly the point.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            { title: "Handmade, always", body: "Poured and finished entirely by hand, one jar at a time." },
            { title: "100% soy wax", body: "Renewable, clean-burning, and free of paraffin." },
            { title: "Cotton wick", body: "No lead, no metal core — just a slow, steady burn." },
          ].map((fact) => (
            <div
              key={fact.title}
              className="rounded-2xl border border-[#EDE4DB] bg-[#FBF7F2] px-6 py-8 text-center shadow-[0_16px_36px_-24px_rgba(51,40,33,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-20px_rgba(51,40,33,0.3)]"
            >
              <p className={`${fraunces.className} text-lg text-[#332821]`}>{fact.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#7A6E5D]">{fact.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${fraunces.className} text-3xl text-[#332821] sm:text-4xl`}>
            What people are saying.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-[#EDE4DB] bg-[#FBF7F2] p-8 shadow-[0_16px_36px_-26px_rgba(51,40,33,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_44px_-20px_rgba(51,40,33,0.32)]"
              >
                <blockquote className="text-base leading-relaxed text-[#5C4F44]">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm text-[#7A6E5D]">
                  {t.name} — {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-[#EDE4DB] bg-[#FBF7F2] px-6 pb-10 pt-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className={`${fraunces.className} text-xl text-[#332821]`}>{siteInfo.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#7A6E5D]">{siteInfo.tagline}</p>
            <div className="mt-6">
              <HandmadeBadge tone="solid" />
            </div>
            <div className="mt-6 flex items-center gap-4 text-[#332821]">
              {siteInfo.social.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="transition-all duration-200 hover:scale-110 hover:text-[#C97C89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] rounded"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-[#7A6E5D]">Get in touch</p>
            <ul className="mt-5 space-y-3 text-sm text-[#332821]">
              <li>
                <a href={siteInfo.phone.href} className="flex items-center gap-2 transition-colors hover:text-[#C97C89]">
                  <PhoneIcon />
                  {siteInfo.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={siteInfo.email.href}
                  className="flex items-center gap-2 transition-colors hover:text-[#C97C89]"
                >
                  <MailIcon />
                  {siteInfo.email.display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <PinIcon />
                {siteInfo.address}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm text-[#7A6E5D]">Payments</p>
            <div className="mt-5">
              <PaymentBadges />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-2 border-t border-[#EDE4DB] pt-6 text-xs text-[#7A6E5D] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
          <p>Handcrafted in {siteInfo.address}.</p>
        </div>
      </footer>

      <BuyNowModal product={buyProduct} isOpen={buyProduct !== null} onClose={() => setBuyProduct(null)} />
    </div>
  );
}