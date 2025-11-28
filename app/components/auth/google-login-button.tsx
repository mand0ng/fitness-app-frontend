'use client';

import { getUserContext } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Google } from "@deemlol/next-icons";

export default function GoogleLoginButton() {
    const router = useRouter();
    const { googleLogin } = getUserContext();
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLogin = async () => {
        try {
            setError(null);
            await googleLogin();

            // Redirect to onboarding as requested
            router.push("/onboarding");
            // alert("Google Sign-In Successful! Check console for token.");

        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError(err.message || "Failed to sign in with Google.");
        }
    };

    return (
        <div className="w-full">
            <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-md transition-colors"
            >
                <Google size={20} />
                <span>Sign in with Google</span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
    );
}
