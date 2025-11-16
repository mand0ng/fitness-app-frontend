import Image from "next/image";
import { useTheme } from "next-themes";

interface LogoProps {
    size?: number;
    textSize?: string;
}

const Logo = ({ size = 48, textSize = "text-2xl" }: LogoProps) => {
    const { theme } = useTheme();
    
    const logoSrc = theme === "white" ? "/logo/white.png" : "/logo/black.png";

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