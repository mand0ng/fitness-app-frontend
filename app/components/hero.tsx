import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    return (
        <section>
            <div className="flex flex-row justify-center items-center p-10 pt-30">
                <div className="basis-4/10 text-shadow-lg justify-center items-center flex flex-col max-w-lg pl-5">
                    <h1 className="text-[60px]/16 font-bold mb-4">Your Personal AI Fitness Coach for Tailored Workouts</h1>
                    <p className="text-lg mb-6 sub-text">Get-Fit leverages artificial intelligence to create dynamic, personalized workout plans that adapt to your goals, progress, and schedule. Start your journey to a stronger, healthier you.</p>
                    <Link href="/onboarding" className="text-center bg-blue-500 w-9/10 text-white px-4 py-2 rounded">Get Started</Link>
                </div>
                <div className="basis-6/10 flex justify-end items-center">
                    <Image
                        src="/main-page/hero.png"
                        alt="Hero Image"
                        width={800}
                        height={1400}
                        style={{ borderRadius: '20px', width: 'auto', height: 'auto' }}
                        className="shadow-2xl"
                    />
                </div>
            </div>
        </section>
    );
};
export default Hero;