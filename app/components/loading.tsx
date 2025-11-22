"use client"
import { useEffect, useState } from "react"

const Loading = () => {
    // const [loading, setLoading] = useState(loading);
    const [dotCount, setDotCount] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount((prevCount) => prevCount < 3 ? prevCount + 1 : 0);
        }, 100);
        return () => clearInterval(interval);
    }, [dotCount]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <p className="sub-text text-xl">Loading{'.'.repeat(dotCount)}</p>
        </div>
    );

};

export default Loading;