'use client';

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import { X } from "@deemlol/next-icons";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Stripe Publishable Key is missing. Make sure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your .env file.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function DonationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(5); // Default amount $5

    useEffect(() => {
        if (isOpen) {
            // Create PaymentIntent as soon as the modal opens
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amount * 100 }), // Amount in cents
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [isOpen, amount]);

    const handleAmountChange = (newAmount: number) => {
        setAmount(newAmount);
        // Re-fetch client secret for new amount (optional optimization: debounce this)
    };

    if (!isOpen) return null;

    const appearance = {
        theme: 'stripe' as const,
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[var(--background)] p-6 rounded-lg shadow-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4">Support the Developer</h2>

                <div className="flex gap-2 mb-4">
                    {[1, 5, 10, 20].map((val) => (
                        <button
                            key={val}
                            onClick={() => handleAmountChange(val)}
                            className={`px-4 py-2 rounded-full border ${amount === val ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                            ${val}
                        </button>
                    ))}
                </div>

                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm amount={amount} />
                    </Elements>
                )}
            </div>
        </div>
    );
}
