'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Fraunces, Karla } from 'next/font/google';
import BuyNowModal, { type BuyNowProduct } from '@/app/components/Buynowmodal';
import Link from 'next/link';
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaLeaf,
    FaLock,
    FaFacebookF,
    FaBars,
    FaTimes,
    FaHandHoldingHeart,
    FaFire,
    FaCcStripe,
    FaCcPaypal,
    FaStripe,
    FaInstagram,
    FaWhatsapp,
} from 'react-icons/fa';
import { FaPaypal } from 'react-icons/fa6';

const fraunces = Fraunces({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    style: ['normal', 'italic'],
    display: 'swap',
});

const karla = Karla({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
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
    focus: 'left' | 'center';
};

const products: Product[] = [
    {
        id: 'sunlit-dahlia',
        name: 'Sunlit Dahlia',
        notes: 'Dahlia petals, warm honey, soft musk, lavender fields',
        price: '$45.00',
        image: '/candle7.jpg',
        focus: 'center',
    },
    {
        id: 'peony-linen',
        name: 'Peony & Linen',
        notes: 'Garden peony, white tea, sun-warmed linen',
        price: '$45.00',
        image: '/candle8.jpg',
        focus: 'left',
    },
    {
        id: 'olive-lavender',
        name: 'Olive & Lavende',
        notes: 'Green olive leaf, lavender fields, warm driftwood',
        price: '$45.00',
        image: '/candle2.jpg',
        focus: 'left',
    },
    {
        id: 'wild-protea',
        name: 'Wild Protea',
        notes: 'Protea bloom, eucalyptus, quiet forest moss',
        price: '$45.00',
        image: '/candle6.jpg',
        focus: 'left',
    },
];

type Testimonial = {
    quote: string;
    name: string;
    city: string;
};

const testimonials: Testimonial[] = [
    {
        quote: "Peony & Linen burns for hours and never turns sharp or synthetic. It's the first candle I've bought twice.",
        name: 'Renee K.',
        city: 'Troy, MI',
    },
    {
        quote: 'Ordered Sunlit Dahlia for my office and now everyone asks where the smell is coming from. Worth the wait for a refill.',
        name: 'David O.',
        city: 'Birmingham, MI',
    },
    {
        quote: 'You can tell these are poured by hand, not mass produced. Olive & Lavender smells expensive without being sweet.',
        name: 'Priya S.',
        city: 'Royal Oak, MI',
    },
];

/* --------------------------- reusable badge -------------------------- */

function HandmadeBadge({ tone = 'light' }: { tone?: 'light' | 'solid' }) {
    const styles =
        tone === 'light'
            ? 'border-[#C97C89]/40 bg-white/70 text-[#7A4550]'
            : 'border-[#C97C89]/30 bg-[#FBF3F2] text-[#7A4550]';
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs tracking-wide transition-transform duration-300 hover:scale-105 ${styles}`}
        >
            <FaLeaf className="h-3.5 w-3.5" />
            Handmade in Troy, Michigan
        </span>
    );
}

/* --------------------------- nav link w/ underline -------------------------- */

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="group relative text-sm text-[#5C4F44] transition-colors hover:text-[#332821] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] rounded"
        >
            {label}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C97C89] transition-transform duration-300 ease-out group-hover:scale-x-100" />
        </Link>
    );
}

/* --------------------------- payment trust badges --------------------------- */

function PaymentBadges() {
    // Only Stripe and PayPal are shown per the current checkout options.
    // These "cc" icons are wider than they are tall (~4:3), so we let width
    // size naturally off a fixed height instead of forcing a square box —
    // forcing h-4 w-4 was clipping/squashing the artwork.
    const methods = [
        { label: 'Stripe', Icon: FaStripe },
        { label: 'PayPal', Icon: FaPaypal },
    ];
    return (
        <div>
            <div className="flex items-center gap-2 text-xs text-[#7A6E5D]">
                <FaLock className="h-3.5 w-3.5" />
                Secure checkout
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {methods.map(({ label, Icon }) => (
                    <span
                        key={label}
                        className="flex items-center gap-1.5 rounded-md border border-[#EDE4DB] bg-white px-3 py-1.5 text-xs text-[#5C4F44] shadow-2xl shadow-gray-100 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <Icon className="h-5 w-auto " aria-hidden="true" />
                        {label}
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
    name: 'Quite flame',
    tagline: 'Hand-poured soy candles, made in small batches in Troy, Michigan.',
    phone: {
        display: '(213) 792-0038',
        href: 'tel:+12137920038',
    },
    email: {
        display: 'quiteflame@official.com',
        href: 'mailto:quiteflame@official.com',
    },
    address: 'Troy, Michigan',
    social: [
        {
            label: 'Facebook',
            href: 'https://www.facebook.com/p/Quite-Flame-61594366916853',
            Icon: FaFacebookF,
        },
        { label: 'Instagram', href: '#', Icon: FaInstagram },
        {
            label: 'WhatsApp',
            href: 'https://wa.me/12137920038?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20your%20candles.',
            Icon: FaWhatsapp,
        },
    ],
};

/* ---------------------------------- page ---------------------------------- */

export default function CandleLandingPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [buyProduct, setBuyProduct] = useState<BuyNowProduct | null>(null);
    const [heroReady, setHeroReady] = useState(false);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        const t = setTimeout(() => setHeroReady(true), 60);
        return () => {
            clearTimeout(t);
            document.documentElement.style.scrollBehavior = '';
        };
    }, []);

    const navLinks = [
        { href: '#shop', label: 'Shop' },
        { href: '#about', label: 'About' },
        { href: '#reviews', label: 'Reviews' },
        { href: '#contact', label: 'Contact' },
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
                    <Link
                        href="#top"
                        className={`${fraunces.className} text-xl tracking-tight text-[#332821] transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]`}
                    >
                        {siteInfo.name}
                    </Link>

                    <nav className="hidden items-center gap-10 md:flex">
                        {navLinks.map((link) => (
                            <NavLink key={link.href} href={link.href} label={link.label} />
                        ))}
                    </nav>

                    <Link
                        href={siteInfo.phone.href}
                        className="hidden items-center gap-2 rounded-full border border-[#332821] px-5 py-2.5 text-sm text-[#332821] transition-all duration-300 hover:scale-[1.03] hover:bg-[#332821] hover:text-[#FDFBF7] hover:shadow-[0_10px_24px_-10px_rgba(51,40,33,0.5)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7] md:inline-flex"
                    >
                        <FaPhoneAlt className="h-4 w-4" />
                        {siteInfo.phone.display}
                    </Link>

                    <button
                        type="button"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="text-[#332821] transition-transform duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] rounded md:hidden"
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <FaTimes className="h-6 w-6" />
                        ) : (
                            <FaBars className="h-6 w-6" />
                        )}
                    </button>
                </div>

                <div
                    className={`overflow-hidden border-t border-[#EDE4DB] bg-[#FDFBF7] transition-all duration-300 ease-out md:hidden ${
                        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="flex flex-col gap-4 px-6 py-5">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                onClick={() => setMenuOpen(false)}
                            />
                        ))}
                        <Link
                            href={siteInfo.phone.href}
                            className="flex items-center gap-2 text-sm text-[#332821]"
                        >
                            <FaPhoneAlt className="h-4 w-4" />
                            {siteInfo.phone.display}
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}

            <div id="top" className="px-4 pt-8 sm:px-6 sm:pt-12 md:px-10">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.25rem] shadow-2xl shadow-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left: text panel on solid background, no overlay needed */}
                        <div className="flex flex-col justify-center bg-[#FDFBF7] px-8 py-14 sm:px-12 md:py-20 lg:px-16">
                            <div
                                className={`transition-all duration-700 ease-out ${
                                    heroReady
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-4 opacity-0'
                                }`}
                            >
                                <HandmadeBadge />
                                <h1
                                    className={`${fraunces.className} mt-6 text-4xl leading-[1.1] text-[#332821] sm:text-5xl`}
                                >
                                    A quieter kind of light for the evenings that matter.
                                </h1>
                                <p className="mt-6 max-w-md text-base leading-relaxed text-[#5C4F44]">
                                    Quiet Flame Co. hand-pours small batches of soy candles from a
                                    studio in Troy, Michigan. Clean-burning, cotton-wicked, and made
                                    to fill a room without shouting.
                                </p>
                                <div className="mt-9 flex flex-wrap gap-4">
                                    <Link
                                        href="#shop"
                                        className="rounded-full bg-[#C97C89] px-6 py-3 text-sm text-white shadow-[0_14px_30px_-12px_rgba(201,124,137,0.7)] transition-all duration-300 hover:scale-[1.04] hover:bg-[#A85F6C] hover:shadow-[0_18px_36px_-12px_rgba(168,95,108,0.75)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                                    >
                                        Shop the collection
                                    </Link>
                                    <Link
                                        href="#about"
                                        className="rounded-full border border-[#332821] px-6 py-3 text-sm text-[#332821] transition-all duration-300 hover:scale-[1.04] hover:bg-[#332821] hover:text-[#FDFBF7] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFBF7]"
                                    >
                                        Read our story
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right: full, clear image — nothing on top of it */}
                        <div className="hero-zoom relative h-[320px] sm:h-[420px] md:h-[640px]">
                            <Image
                                src="/candle2.jpg"
                                alt="Hand-poured candle surrounded by roses and lavender in a sunlit garden"
                                fill
                                priority
                                sizes="(min-width: 768px) 50vw, 100vw"
                                className="object-cover rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <section id="shop" className="bg-[#FBF7F2] px-6 py-24 md:px-10 md:py-32">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-xl">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#C97C89]">
                            Our Collection
                        </span>
                        <h2
                            className={`${fraunces.className} mt-3 text-3xl text-[#332821] sm:text-4xl`}
                        >
                            Scents that feel like home.
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-[#5C4F44]">
                            Four scents, each hand-poured in 9 oz glass jars with a 45–50 hour burn
                            time.
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
                                            product.focus === 'left'
                                                ? 'object-left'
                                                : 'object-center'
                                        }`}
                                    />
                                    {/* Subtle gradient + handmade badge overlay on image */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#332821]/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-[#A85F6C] shadow-sm backdrop-blur-sm">
                                        <FaLeaf className="h-3 w-3" />
                                        Handmade
                                    </span>
                                </div>

                                <div className="mt-5 flex flex-1 flex-col px-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <h3
                                            className={`${fraunces.className} text-lg text-[#332821]`}
                                        >
                                            {product.name}
                                        </h3>
                                        <span className="whitespace-nowrap rounded-full bg-[#332821]/5 px-2.5 py-1 text-sm font-medium text-[#332821]">
                                            {product.price}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm leading-relaxed text-[#7A6E5D]">
                                        {product.notes}
                                    </p>

                                    <div className="mt-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setBuyProduct({
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image,
                                                })
                                            }
                                            className="group/btn flex w-full items-center justify-center gap-1.5 rounded-full bg-[#C97C89] px-4 py-2.5 text-xs font-medium text-white shadow-[0_10px_22px_-10px_rgba(201,124,137,0.75)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#A85F6C] hover:shadow-[0_14px_26px_-10px_rgba(168,95,108,0.8)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF7F2] cursor-pointer"
                                        >
                                            Buy now
                                            <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / story */}
            <section id="about" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
                {/* Soft decorative glow, purely atmospheric */}
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#C97C89]/8 blur-3xl" />

                <div className="relative mx-auto max-w-3xl text-center">
                    <p className="text-sm tracking-wide text-[#A85F6C]">Our craft</p>
                    <h2
                        className={`${fraunces.className} mt-3 text-3xl text-[#332821] sm:text-4xl`}
                    >
                        Poured slow, in small batches.
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#5C4F44]">
                        Every candle is measured, poured, and finished by hand in a small studio in
                        Troy. We keep batches small so we can watch every wick and every pour —
                        nothing about it is automated, and that&rsquo;s exactly the point.
                    </p>
                </div>

                <div className="relative mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
                    {[
                        {
                            title: 'Handmade, always',
                            body: 'Poured and finished entirely by hand, one jar at a time.',
                            icon: <FaHandHoldingHeart className="h-6 w-6" />,
                        },
                        {
                            title: '100% soy wax',
                            body: 'Renewable, clean-burning, and free of paraffin.',
                            icon: <FaLeaf className="h-6 w-6" />,
                        },
                        {
                            title: 'Cotton wick',
                            body: 'No lead, no metal core — just a slow, steady burn.',
                            icon: <FaFire className="h-6 w-6" />,
                        },
                    ].map((fact, i) => (
                        <div
                            key={fact.title}
                            style={{ transitionDelay: heroReady ? `${i * 120}ms` : '0ms' }}
                            className={`group flex flex-col items-center rounded-2xl border border-[#EDE4DB] bg-[#FBF7F2] px-6 py-8 text-center shadow-[0_16px_36px_-24px_rgba(51,40,33,0.25)] transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_24px_44px_-20px_rgba(51,40,33,0.3)] ${
                                heroReady ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                            }`}
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E4E6] text-[#A85F6C] transition-transform duration-500 ease-out group-hover:scale-110">
                                {fact.icon}
                            </span>
                            <p className={`${fraunces.className} mt-5 text-lg text-[#332821]`}>
                                {fact.title}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-[#7A6E5D]">
                                {fact.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section
                id="reviews"
                className="relative overflow-hidden bg-[#FBF7F2] px-6 py-24 md:px-10 md:py-32"
            >
                {/* Soft decorative glow, purely atmospheric */}
                <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#C97C89]/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#C97C89]/10 blur-3xl" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="max-w-xl">
                        <p className="text-sm tracking-wide text-[#A85F6C]">Reviews</p>
                        <h2
                            className={`${fraunces.className} mt-3 text-3xl text-[#332821] sm:text-4xl`}
                        >
                            What people are saying.
                        </h2>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <figure
                                key={t.name}
                                style={{ transitionDelay: heroReady ? `${i * 120}ms` : '0ms' }}
                                className={`group relative flex flex-col rounded-2xl border border-[#EDE4DB] bg-white p-8 shadow-2xl shadow-gray-50 transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_28px_50px_-20px_rgba(51,40,33,0.35)] ${
                                    heroReady
                                        ? 'translate-y-0 opacity-100'
                                        : 'translate-y-6 opacity-0'
                                }`}
                            >
                                {/* Large decorative quote mark */}
                                <span
                                    className={`${fraunces.className} absolute right-6 top-4 text-6xl leading-none text-[#C97C89]/15 transition-transform duration-500 ease-out group-hover:scale-110`}
                                    aria-hidden="true"
                                >
                                    &rdquo;
                                </span>

                                {/* Star rating */}
                                <div className="flex gap-1 text-[#C97C89]">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                        <svg
                                            key={si}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            style={{ transitionDelay: `${si * 60}ms` }}
                                            className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110"
                                            aria-hidden="true"
                                        >
                                            <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
                                        </svg>
                                    ))}
                                </div>

                                <blockquote className="relative mt-5 flex-1 text-base leading-relaxed text-[#5C4F44]">
                                    {t.quote}
                                </blockquote>

                                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#EDE4DB] pt-5">
                                    <span
                                        className={`${fraunces.className} flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3E4E6] text-sm text-[#A85F6C] transition-transform duration-300 ease-out group-hover:scale-105`}
                                    >
                                        {t.name.charAt(0)}
                                    </span>
                                    <div>
                                        <p className="text-sm text-[#332821]">{t.name}</p>
                                        <p className="text-xs text-[#7A6E5D]">{t.city}</p>
                                    </div>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="contact"
                className="border-t border-[#EDE4DB] bg-[#FBF7F2] px-6 pb-10 pt-20 md:px-10"
            >
                <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <p className={`${fraunces.className} text-xl text-[#332821]`}>
                            {siteInfo.name}
                        </p>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#7A6E5D]">
                            {siteInfo.tagline}
                        </p>
                        <div className="mt-6">
                            <HandmadeBadge tone="solid" />
                        </div>
                        <div className="mt-6 flex items-center gap-4 text-[#332821]">
                            {siteInfo.social.map(({ label, href, Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="transition-all duration-200 hover:scale-110 hover:text-[#C97C89] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89] rounded"
                                >
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-[#7A6E5D]">Get in touch</p>
                        <ul className="mt-5 space-y-3 text-sm text-[#332821]">
                            <li>
                                <Link
                                    href={siteInfo.phone.href}
                                    className="flex items-center gap-2 transition-colors hover:text-[#C97C89]"
                                >
                                    <FaPhoneAlt className="h-4 w-4" />
                                    {siteInfo.phone.display}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={siteInfo.email.href}
                                    className="flex items-center gap-2 transition-colors hover:text-[#C97C89]"
                                >
                                    <FaEnvelope className="h-4 w-4" />
                                    {siteInfo.email.display}
                                </Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <FaMapMarkerAlt className="h-4 w-4" />
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
                    <p>
                        © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
                    </p>

                    <p>
                        Thoughtfully crafted by{' '}
                        <Link
                            href="https://bymaza.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-[#5F5243] transition-opacity hover:opacity-70"
                        >
                            MazaSoft
                        </Link>
                    </p>
                </div>
            </footer>

            <BuyNowModal
                product={buyProduct}
                isOpen={buyProduct !== null}
                onClose={() => setBuyProduct(null)}
            />
        </div>
    );
}
