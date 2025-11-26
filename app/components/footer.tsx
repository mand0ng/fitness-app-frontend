import Logo from "./logo";
import { Facebook, Twitter, Instagram } from "@deemlol/next-icons";

const Footer = () => {
    return (
        <section>
            <div className="my-footer inset-shadow-xs w-full flex flex-col p-10">
                <div className="flex flex-col justify-around gap-10">
                    <div className="basis-1/3">
                        <div className="flex flex-col items-start justify-baseline  ">
                            <Logo size={25} textSize="text-l" />
                            <p className="mt-3 text-sm sub-text">Your personal AI fitness coach, delivering tailored workout plans to help you achieve your goals.</p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-around gap-8 basis-2/3">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-base font-bold">Company</h1>
                            <p className="text-sm sub-text">About Us</p>
                            <p className="text-sm sub-text">Careers</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-base font-bold">Support</h1>
                            <p className="text-sm sub-text">Help Center</p>
                            <p className="text-sm sub-text">Contact Us</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-base font-bold">Legal</h1>
                            <p className="text-sm sub-text">Privacy Policy</p>
                            <p className="text-sm sub-text">Terms of Service</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 mb-10 border-b border-gray-300"></div>

                <div className="flex flex-row justify-between gap-10">
                    <div className="flex flex-row items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <text
                                x="12"
                                y="16"
                                textAnchor="middle"
                                fontSize="13"
                                fontFamily="Arial, Helvetica, sans-serif"
                                fill="currentColor"
                            >
                                C
                            </text>
                        </svg>
                        <span className="sub-text text-sm">Get-Fit. All rights reserved.</span>
                    </div>
                    <div className="flex flex-row items-center gap-10">
                        <Facebook className="text-gray-500" />
                        <Twitter className="text-gray-500" />
                        <Instagram className="text-gray-500" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;