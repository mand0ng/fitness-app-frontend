'use client';

import { useTheme } from "next-themes";
import { Sun, Moon } from "@deemlol/next-icons";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <button
                className="focus:outline-none hover:scale-110 hover:opacity-80 transition-transform duration-300 ease-in-out"
                onClick={
                    () => {
                        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                    }
                }
            >
                <div className="relative w-6 h-6 items-center">
                    {mounted && (
                        <>
                            <Moon className={`absolute inset-0 m-auto w-6 h-6 transition-opacity ${resolvedTheme === "dark" ? "opacity-100" : "opacity-0"}`} />
                            <Sun className={`absolute inset-0 m-auto w-6 h-6 transition-opacity ${resolvedTheme === "light" ? "opacity-100" : "opacity-0"}`} />
                        </>
                    )}
                </div>
            </button>
        </div>
    );
}
