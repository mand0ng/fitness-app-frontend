"use client";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getUserContext } from "@/context/user-context";

interface LogoProps {
    size?: number;
    textSize?: string;
}

const Logo = ({ size = 48, textSize = "text-2xl" }: LogoProps) => {
    const { resolvedTheme } = useTheme();
    const { user } = getUserContext();
    const [logoSrc, setLogoSrc] = useState("/logo/white-header.png");

    useEffect(() => {
        setLogoSrc(resolvedTheme == "dark" ? "/logo/white-header.png" : "/logo/black-header.png");
    }, [resolvedTheme]);

    const href = user ? "/dashboard" : "/";

    return (
        <Link href={href} className="flex items-center hover:scale-105 hover:opacity-80 transition-all duration-300 ease-in-out cursor-pointer">
            <Image
                src={logoSrc}
                alt="Get-Fit Logo"
                width={size}
                height={size}
                className="inline-block mr-2"
                style={{ borderRadius: '4px' }}
            />
            <h1 className={`${textSize} font-bold text-shadow-md`}>Get-Fit</h1>
        </Link>
    );
}
export default Logo;