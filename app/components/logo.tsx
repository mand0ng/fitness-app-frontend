"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
    size?: number;
    textSize?: string;
}

const Logo = ({ size = 48, textSize = "text-2xl" }: LogoProps) => {
    const { resolvedTheme } = useTheme();
    const [logoSrc, setLogoSrc] = useState("/logo/white-header.png");

    useEffect(() => {
        setLogoSrc(resolvedTheme == "dark" ? "/logo/white-header.png" : "/logo/black-header.png");
    }, [resolvedTheme]);

    return (
        <div className="flex items-center">
            <Image
                src={logoSrc}
                alt="Get-Fit Logo"
                width={size}
                height={size}
                className="inline-block mr-2"
                style={{ borderRadius: '4px' }}
            />
            <h1 className={`${textSize} font-bold text-shadow-md`}>Get-Fit</h1>
        </div>
    );
}
export default Logo;