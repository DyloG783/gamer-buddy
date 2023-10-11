import Image from 'next/image';
import { UserMenuItems } from "./MenuItems";

export default function UserMenu({ toggleMenu, closeMenu, menuOpen }: any) {
    return (
        <div className="relative h-full">
            <button
                onClick={toggleMenu}
                aria-label="User or profile drop down menu"
                className={`flex gap-2 h-full items-center p-2 hover:bg-slate-600 ${menuOpen ? "bg-slate-500" : ""}`}
            >
                <Image src="./vercel.svg" height={0} width={0} alt="Profile Avatar" className={`w-14 md:w-24 lg:w-32`} />
                <svg
                    className={`w-2 md:w-3 lg:w-4 mb-auto ${menuOpen ? "hidden" : "inline-block"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                    className={`w-2 md:w-3 lg:w-4 mb-auto ${menuOpen ? "inline-block" : "hidden"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>
            <div className={`w-full bg-slate-400 ${menuOpen ? "absolute" : "hidden"}`}>
                <ul>
                    <UserMenuItems closeMenu={closeMenu} />
                </ul>
            </div>
        </div>
    )
}




