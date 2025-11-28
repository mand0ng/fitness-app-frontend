'use client';
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Logo from "./logo";
import { getUserContext } from "@/context/user-context";
import { useState } from "react";
import { Menu, ArrowUpCircle, Heart } from "@deemlol/next-icons"
import DonationModal from "./donations/donation-modal";

const Header = () => {
    const { user, logout } = getUserContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

    return (
        <section className="relative">
            <div className="my-header shadow-sm md:h-[72px] w-full flex justify-between items-center p-5">
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 items-center">
                    <div className="flex gap-5 items-center mr-3">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="hover:scale-105 hover:opacity-80 transition-all duration-300 ease-in-out">Dashboard</Link>
                                <button onClick={() => logout()} className="hover:scale-105 hover:opacity-80 transition-all duration-300 ease-in-out">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:scale-105 hover:opacity-80 transition-all duration-300 ease-in-out">Login</Link>
                                <Link href="/signup" className="hover:text-gray-500 hover:scale-105 hover:opacity-80 transition-all duration-300 ease-in-out">Sign Up</Link>
                            </>
                        )}
                    </div>
                    <div className="border h-7"></div>
                    <div>
                        <ThemeToggle />
                    </div>
                    <button
                        onClick={() => setIsDonationModalOpen(true)}
                        className="flex items-center gap-2 bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <Heart size={16} />
                        <span className="text-sm font-medium">Donate</span>
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <ThemeToggle />
                    <div className="border h-7 ml-2"></div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 focus:outline-none hover:scale-110 transition-transform duration-300 ease-in-out"
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
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out origin-left">Dashboard</Link>
                            <div className="border w-full self-center"></div>
                            <button onClick={() => { logout(); setIsMenuOpen(false); }} className="p-2 text-left hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out origin-left">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out origin-left">Login</Link>
                            <div className="border w-full self-center"></div>
                            <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="p-2 hover:opacity-80 hover:scale-105 transition-all duration-300 ease-in-out origin-left">Sign Up</Link>
                        </>
                    )}
                    <div className="border w-full self-center"></div>
                    <button
                        onClick={() => {
                            setIsDonationModalOpen(true);
                            setIsMenuOpen(false);
                        }}
                        className="p-2 text-left hover:opacity-80 flex items-center gap-2 text-pink-500 font-medium hover:scale-105 transition-all duration-300 ease-in-out origin-left"
                    >
                        <Heart size={16} />
                        Donate
                    </button>
                </div>
            )}

            <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
            />
        </section>
    )
};
export default Header;