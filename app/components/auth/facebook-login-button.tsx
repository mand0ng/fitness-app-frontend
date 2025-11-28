'use client';

import { getUserContext } from "@/context/user-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Facebook } from "@deemlol/next-icons";

export default function FacebookLoginButton() {
    const router = useRouter();
    const { facebookLogin } = getUserContext();
    const [error, setError] = useState<string | null>(null);

    const handleFacebookLogin = async () => {
        try {
            setError(null);
            await facebookLogin();
            // Redirect to onboarding as requested
            router.push("/onboarding");
            // alert("Facebook Sign-In Successful! Check console for token.");
        } catch (err: any) {
            console.error("Facebook Login Error:", err);
            setError(err.message || "Failed to sign in with Facebook.");
        }
    };

    return (
        <div className="w-full mt-2">
            <button
                onClick={handleFacebookLogin}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#166fe5] font-medium py-2 px-4 rounded-md transition-colors"
            >
                <Facebook size={20} />
                <span>Sign in with Facebook</span>
            </button>
            {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
    );
}
