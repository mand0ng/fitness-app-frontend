"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function DynamicFavicon() {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        if (favicon) {
            favicon.href = resolvedTheme === "dark" ? "/fitness-app-v1.ico" : "/fitness-app-v2.ico";
            console.log("favicon.href", favicon.href);
        }
    }, [resolvedTheme]);

    return null;
}
