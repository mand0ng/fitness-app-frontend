'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart } from "@deemlol/next-icons";

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");

    return (
        <main className="max-w-6xl mx-auto p-10 text-center text-white mb-10">
            <div className="mb-10 flex justify-center">
                <div className="bg-pink-500 p-4 rounded-full animate-bounce">
                    <Heart size={64} className="text-white" />
                </div>
            </div>

            <h1 className="text-4xl font-extrabold mb-2">Thank You!</h1>
            <h2 className="text-2xl">You successfully sent <span className="font-bold">${amount}</span></h2>

            <div className="bg-white/10 p-5 rounded-md mt-5 text-lg">
                <p>Your support helps me keep this app running and improving.</p>
            </div>

            <Link
                href="/"
                className="mt-10 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
                Go to Home
            </Link>
        </main>
    );
}
