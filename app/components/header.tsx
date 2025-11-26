'use client';
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Logo from "./logo";
import { getUserContext } from "@/context/user-context";
import { useState } from "react";
import { Menu, ArrowUpCircle } from "@deemlol/next-icons"

const Header = () => {
    const { user, logout } = getUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="relative">
            <div className="my-header shadow-sm md:h-[72px] w-full flex justify-between items-center p-5">
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    <div className="flex gap-5 items-center mr-3">
                        {user ? (
                            <>
                                <Link href="/dashboard">Dashboard</Link>
                                <button onClick={() => logout()}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">Login</Link>
                                <Link href="/signup">Sign Up</Link>
                            </>
                        )}
                    </div>
                    <div className="border h-7"></div>
                    <div>
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <ThemeToggle />
                    <div className="border h-7 ml-2"></div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <ArrowUpCircle size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-[var(--header-background)] border-b shadow-lg z-50 gap-1 flex flex-col p-4 animate-in slide-in-from-top-2">
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80">Dashboard</Link>
                            <div className="border w-full self-center"></div>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="p-2 text-left hover:opacity-80">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80 ">Login</Link>
                            <div className="border w-full self-center"></div>
                            <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </section>
    )
};
export default Header;