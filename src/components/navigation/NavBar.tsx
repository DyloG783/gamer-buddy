import React, { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { MainNavItems } from "./MenuItems";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };

    const closeMenu = () => {
        setMenuOpen(false)
    };

    const pathname = usePathname();

    return (
        <nav className="flex justify-between items-center sticky top-0 md:h-[10vh] flex-col md:flex-row bg-slate-400">
            <Link href="/" onClick={closeMenu} className={`link ${pathname === '/' ? 'bg-slate-500' : ''} hover:bg-slate-600 h-full flex p-2`}>
                <Image src="./next.svg" height={0} width={0} alt="Home page link" className="w-16 md:w-32 lg:w-48 " />
            </Link>

            <ul className="grid gap-1 sm:grid-flow-col sm:auto-cols-fr h-full ">
                <MainNavItems closeMenu={closeMenu} />
            </ul>

            <UserMenu toggleMenu={toggleMenu} closeMenu={closeMenu} menuOpen={menuOpen} />
        </nav>
    )
}
