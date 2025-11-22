'use client';
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import Logo from "./logo";
import { getUserContext } from "@/context/user-context";

const Header = () => {
    const { user, logout } = getUserContext();

    return (
        <section>
            <div className="my-header shadow-sm h-[72px] w-full flex justify-between items-center p-5">
                <Logo />

                <div className="flex gap-4 items-center">
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

            </div>
        </section>
    )
};
export default Header;