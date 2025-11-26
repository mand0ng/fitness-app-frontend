'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Hero = () => {
    const { resolvedTheme } = useTheme();

    return (
        <section className="relative">
            <div
                className="relative z-10 flex flex-col-reverse lg:flex-row justify-center items-center lg:p-10 lg:pt-30 lg:gap-5 ">
                <div className="
                    basis-4/10 
                    text-shadow-lg 
                    justify-center 
                    items-center 
                    lg:flex 
                    lg:flex-col 
                    max-w-lg 
                    md:max-w-3xl
                    pl-5 
                    bg-cover 
                    bg-center 
                    transition-all 
                    duration-500 
                    w-full">
                    <div className="flex flex-col md:flex-row lg:flex-col py-30 px-8 md:py-50 md:px-20 lg:py-2 items-center md:justify-between w-full gap-5">
                        <h1 className="basis-1/2 text-[30px]/8 md:text-[50px]/12 lg:text-[40px]/10 xl:text-[70px]/16 pr-10 font-bold mb-4 md:flex-1">
                            Your Personal AI Fitness Assistant for Tailored Workouts
                        </h1>
                        <div className="basis-1/2">
                            <p className="text-lg mb-6 sub-text md:flex-1">Get-Fit leverages artificial intelligence to create dynamic, personalized workout plans that adapt to your goals, progress, and schedule. Start your journey to a stronger, healthier you.</p>
                            <Link href="/signup" className="text-center bg-blue-500 w-9/10 md:w-1/2 lg:w-1/2 text-white px-4 py-2 rounded">Get Started</Link>
                        </div>
                    </div>

                </div>
                <div className="basis-6/10 flex justify-end items-center w-full hidden lg:block">
                    {resolvedTheme === "dark" ? <Image
                        src="/main-page/web/hero-black.png"
                        alt="Hero Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ borderRadius: '20px', width: '100%', height: 'auto', aspectRatio: '16/10' }}
                        className={"shadow-2xl shadow-blue-500/50"}
                    /> : <Image
                        src="/main-page/web/hero-white.png"
                        alt="Hero Image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ borderRadius: '20px', width: '100%', height: 'auto', aspectRatio: '16/10' }}
                        className={"shadow-2xl shadow-black/50"}
                    />}

                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-0 md:hidden lg:hidden">
                <Image
                    src={resolvedTheme === "dark" ? "/main-page/mobile/hero-portrait-dark.png" : "/main-page/mobile/hero-portrait-white.png"}
                    alt="Hero Background"
                    className="object-cover opacity-70"
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', borderRadius: '0 0 10px 10px', aspectRatio: '9/16' }}
                />
            </div>
            <div className="absolute top-2 left-0 w-full h-full z-0 hidden md:block lg:hidden">
                <Image
                    src={resolvedTheme === "dark" ? "/main-page/web/hero-black.png" : "/main-page/web/hero-white.png"}
                    alt="Hero Background"
                    className="object-cover opacity-60"
                    priority
                    fill
                    style={{ borderRadius: '10px', aspectRatio: '3/4' }}
                />
            </div>
        </section>
    );
};
export default Hero;