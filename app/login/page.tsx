'use client';

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-service";
import { getUserContext } from "@/context/user-context";
import { isUserDoneOnboarding } from "@/utils/utils";
import Loading from "../components/loading";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { login, user, isFetchingUser, removeToken } = getUserContext();

    useEffect(() => {
        // 1. Wait for UserContext to finish checking session
        if (isFetchingUser) return;

        if (user) {
            // 2. User is logged in
            if (isUserDoneOnboarding(user)) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        } else {
            // 3. User is NOT logged in -> Show Login Form
            setLoading(false);
            removeToken();
        }
    }, [user, isFetchingUser, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login({ email, password });
            router.push("/dashboard");
        } catch (error: any) {
            console.error(error);
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background px-10">
            <form
                onSubmit={handleSubmit}
                className="bg-(--card-background) p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4"
            >
                <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">Login</h1>
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