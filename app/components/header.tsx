import ThemeToggle from "../themes/theme-toggle";
import Logo from "./logo";

const Header = () => { 

    return (
        <section>
            <div className="my-header shadow-sm h-[72px] w-full flex justify-between items-center p-5">
               <Logo />
                
                <div className="flex gap-4 items-center">
                    <div className="flex gap-5 items-center mr-3">
                        <button>Login</button>
                        <button>Sign Up</button>
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