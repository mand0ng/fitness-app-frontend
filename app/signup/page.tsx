'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth-service";
import { getUserContext } from "@/context/user-context";
import { isUserDoneOnboarding } from "@/utils/utils";
import Loading from "../components/loading";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [dotCount, setDotCount] = useState(3);
    const { signup, user, userIsLoggedIn, isFetchingUser, removeToken } = getUserContext();
    const [loading, setLoading] = useState(true);

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
            // 3. User is NOT logged in -> Show Signup Form
            setLoading(false);
            removeToken();
        }
    }, [user, isFetchingUser, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup({ email, name, password });
            setSuccess(true);
            setTimeout(() => {
                router.push('/onboarding');
                // router.push('/login');
            }, 2000);
        } catch (error: any) {
            console.error(error);
            setError(error.message);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    useEffect(() => {
        if (success) {
            const interval = setInterval(() => {
                setDotCount((prevCount) => prevCount < 3 ? prevCount + 1 : 0);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [success]);


    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-background">

            {success && (
                <div className="fixed inset-0 flex items-center justify-center z-50 w-full h-full bg-background/90">
                    <div className="my-card-bg border border-(--muted) p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-2">{`Signup Successful${" " + user?.name || ""}!`}</h2>
                        <p className="mb-4 sub-text w-full">{`Redirecting to login${'.'.repeat(dotCount)}`}</p>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="bg-(--card-background) p-8 rounded-lg shadow-lg w-full max-w-sm flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-center">
                        {error}
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="border border-(--muted) rounded-md p-2"
                />
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
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignupPage;