'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { Fraunces, Karla } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['500', '600'], display: 'swap' });
const karla = Karla({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

export type BuyNowProduct = {
    name: string;
    price: string;
    image: string;
};

const checkOutConstrain = {
    maxCandlesAtTime: 50,
};

type BuyNowModalProps = {
    product: BuyNowProduct | null;
    isOpen: boolean;
    onClose: () => void;
};

/**
 * Generic modal shell + order form.
 *
 * The form below is a placeholder — it doesn't charge anyone yet. Submitting
 * calls `handlePayment()` in <OrderForm />, which currently just logs the
 * order to the console. Swap that function's body for a real checkout call
 * later (Stripe Checkout session, a PayPal order, your own payment API,
 * etc.) without touching the modal shell, animation, or the "Buy now"
 * wiring in the parent page.
 */
export default function BuyNowModal({ product, isOpen, onClose }: BuyNowModalProps) {
    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [isOpen, onClose]);

    return (
        <div
            aria-hidden={!isOpen}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
                isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
            }`}
        >
            {/* backdrop */}
            <div onClick={onClose} className="absolute inset-0 bg-[#332821]/50 backdrop-blur-sm" />

            {/* panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={product ? `Buy ${product.name}` : 'Buy now'}
                className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-[#FDFBF7] shadow-[0_30px_70px_-20px_rgba(51,40,33,0.45)] transition-all duration-300 ${
                    isOpen
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-3 scale-95 opacity-0'
                } ${karla.className}`}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-1.5 text-[#332821] shadow-sm transition-transform hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C97C89]"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                        <path
                            d="M6 6l12 12M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {product && (
                    <div className="flex items-center gap-4 border-b border-[#EDE4DB] bg-[#FBF7F2] px-6 py-5">
                        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl shadow-sm">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover object-left"
                            />
                        </div>
                        <div>
                            <p className={`${fraunces.className} text-base text-[#332821]`}>
                                {product.name}
                            </p>
                            <p className="mt-0.5 text-sm text-[#7A6E5D]">{product.price}</p>
                        </div>
                    </div>
                )}

                <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                    <OrderForm product={product} onSuccess={onClose} />
                </div>
            </div>
        </div>
    );
}

/** Parses a display price like "$45.00" into a plain number: 45. */
function parsePrice(price: string): number {
    const parsed = parseFloat(price.replace(/[^0-9.]/g, ''));
    return Number.isNaN(parsed) ? 0 : parsed;
}

function formatPrice(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

type OrderDetails = {
    productName: string;
    unitPrice: number;
    quantity: number;
    total: number;
    fullName: string;
    email: string;
    address: string;
};

/**
 * Stand-in for a real payment trigger. Wire this up to Stripe Checkout,
 * a PayPal order, or your own payment API route when you're ready — for
 * now it just logs what would have been sent.
 */
function handlePayment(order: OrderDetails) {
    console.log('Continue to payment clicked — order details:', order);
    // TODO: replace with a real payment integration, e.g.
    // await fetch("/api/checkout", { method: "POST", body: JSON.stringify(order) });
}

function OrderForm({
    product,
    onSuccess,
}: {
    product: BuyNowProduct | null;
    onSuccess: () => void;
}) {
    const [submitted, setSubmitted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const unitPrice = product ? parsePrice(product.price) : 0;
    const total = unitPrice * quantity;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        handlePayment({
            productName: product?.name ?? '',
            unitPrice,
            quantity,
            total,
            fullName,
            email,
            address,
        });

        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="py-6 text-center">
                <p className="text-4xl">🕯️</p>
                <p className="mt-3 text-base text-[#332821]">Order request received.</p>
                <p className="mt-1 text-sm text-[#7A6E5D]">
                    We&rsquo;ll email you a secure payment link to finish checkout shortly.
                </p>
                <button
                    type="button"
                    onClick={onSuccess}
                    className="mt-6 rounded-full bg-[#332821] px-5 py-2.5 text-sm text-[#FDFBF7] transition-transform hover:scale-[1.03] active:scale-[0.97]"
                >
                    Done
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="bn-name" className="text-xs text-[#7A6E5D]">
                    Full name
                </label>
                <input
                    id="bn-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="mt-1.5 w-full rounded-lg border border-[#EDE4DB] bg-white px-3.5 py-2.5 text-sm text-[#332821] outline-none transition-colors placeholder:text-[#B7AA9B] focus:border-[#C97C89] focus:ring-2 focus:ring-[#C97C89]/30"
                />
            </div>

            <div>
                <label htmlFor="bn-email" className="text-xs text-[#7A6E5D]">
                    Email
                </label>
                <input
                    id="bn-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="mt-1.5 w-full rounded-lg border border-[#EDE4DB] bg-white px-3.5 py-2.5 text-sm text-[#332821] outline-none transition-colors placeholder:text-[#B7AA9B] focus:border-[#C97C89] focus:ring-2 focus:ring-[#C97C89]/30"
                />
            </div>

            <div>
                <label htmlFor="bn-address" className="text-xs text-[#7A6E5D]">
                    Shipping address
                </label>
                <textarea
                    id="bn-address"
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, city, state, ZIP"
                    className="mt-1.5 w-full resize-none rounded-lg border border-[#EDE4DB] bg-white px-3.5 py-2.5 text-sm text-[#332821] outline-none transition-colors placeholder:text-[#B7AA9B] focus:border-[#C97C89] focus:ring-2 focus:ring-[#C97C89]/30"
                />
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <label htmlFor="bn-qty" className="text-xs text-[#7A6E5D]">
                        Quantity
                    </label>
                    <input
                        id="bn-qty"
                        type="number"
                        min={1}
                        max={checkOutConstrain.maxCandlesAtTime}
                        value={quantity}
                        onChange={(e) => {
                            const next = parseInt(e.target.value, 10);
                            if (Number.isNaN(next) || next < 1) {
                                setQuantity(1);
                            } else if (next > checkOutConstrain.maxCandlesAtTime) {
                                setQuantity(checkOutConstrain.maxCandlesAtTime);
                            } else {
                                setQuantity(next);
                            }
                        }}
                        className="mt-1.5 w-full rounded-lg border border-[#EDE4DB] bg-white px-3.5 py-2.5 text-sm text-[#332821] outline-none transition-colors focus:border-[#C97C89] focus:ring-2 focus:ring-[#C97C89]/30"
                    />

                    {quantity >= checkOutConstrain.maxCandlesAtTime && (
                        <small className="text-xs">
                            Maximum {checkOutConstrain.maxCandlesAtTime} candles per order.
                        </small>
                    )}
                </div>
                {product && (
                    <div className="flex-1 text-right">
                        <p className="text-xs text-[#7A6E5D]">Total</p>
                        <p className="mt-1.5 text-base text-[#332821]">{formatPrice(total)}</p>
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="mt-2 w-full rounded-full bg-[#C97C89] px-5 py-3 text-sm text-white shadow-[0_14px_30px_-12px_rgba(201,124,137,0.7)] transition-all hover:scale-[1.02] hover:bg-[#A85F6C] cursor-pointer hover:shadow-[0_18px_36px_-12px_rgba(168,95,108,0.75)] active:scale-[0.98]"
            >
                Continue to payment
            </button>

            <p className="text-center text-xs text-[#B7AA9B]">
                Secure checkout via Stripe or PayPal
            </p>
        </form>
    );
}
