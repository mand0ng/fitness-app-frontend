'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(""); 
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [dotCount, setDotCount] = useState(3);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const createUserApi = process.env.NEXT_PUBLIC_CREATE_USER_API;
        if (!createUserApi) {
            console.error("CREATE_USER_API is not defined");
            return;
        }
        try {
            const response = await fetch(createUserApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    name,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.status === "error" && errorData.message) {
                    setError(errorData.message);
                } else {
                    setError(errorData.detail || "Unknown error");
                }
                return;
            }

            // Handle success response
            const data = await response.json();
            // Optionally, redirect or clear form here
            setEmail("");
            setPassword("");
            setName("");
            setError("");
            
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            localStorage.setItem("fromSignup", "true");

            setSuccess(true);

            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error) {
            console.error("Network error:", error);
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
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">

            {success && (
                <div className="fixed inset bg-opacity-50 flex items-center justify-center z-50 w-full bg-gray-400/50 h-full">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold mb-2 ">Signup Successful!</h2>
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