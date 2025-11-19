'use client';

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [fromSignup, setFromSignup] = useState<boolean | null>(null);
    const [localVarsSet, setLocalVarsSet] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        setFromSignup(localStorage.getItem("fromSignup") === "true");
        setLocalVarsSet(true);

        console.log("LOGIN PAGE:: token=" + localStorage.getItem("token"));
        console.log("LOGIN PAGE:: fromSignup=" + localStorage.getItem("fromSignup"));
    }, []);

    // for users that are already logged in
    useEffect(() => {
    // Check if user is coming from signup
        console.info("LOGIN PAGE:: fromSignup and token checking");

        if (!localVarsSet) return;

        console.info("LOGIN PAGE:: localVarsSet is true, proceeding with redirect logic");
        if (fromSignup && token) {
            console.log("LOGIN PAGE:: redirecting to onboarding");
            setFromSignup(true);
            setLoading(true);
            localStorage.removeItem("fromSignup");
            setTimeout(() => {
                router.push("/onboarding");
            }, 1500);
        } else if (token) {
            console.log("LOGIN PAGE:: user is logged in, redirecting to dashboard");
            setLoading(true);
            router.push("/dashboard");
        } else {
            setLoading(false);
            console.log("LOGIN PAGE:: no redirect");
        }
    }, [fromSignup, token, router, localVarsSet]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const loginApi = process.env.NEXT_PUBLIC_LOGIN_API;
        if (!loginApi) {
            console.error("LOGIN_API is not defined");
            return;
        }
        try {
            const response = await fetch(loginApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok || data.status !== "success" || !data.access_token) {
                setError(data.detail || "Login failed");
                return;
            }

            localStorage.setItem("token", data.access_token);
            router.push("/dashboard");
        } catch (err) {
            setError("Network error. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <p className="sub-text text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <form
                onSubmit={handleSubmit}
                className="bg-(--card-background) p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
                        {error}
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border border-(--muted) rounded-md p-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="border border-(--muted) rounded-md p-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;