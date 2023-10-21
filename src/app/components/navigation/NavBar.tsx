"use client"

import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { MainNavItems } from "./MenuItems";
import UserMenu from "./UserMenu";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    };
    const closeMenu = () => {
        setMenuOpen(false)
    };

    const pathname = usePathname();

    return (
        <nav className="flex justify-between items-center flex-col md:flex-row sticky top-0 md:h-[10vh] bg-slate-400">
            <Link href="/" onClick={closeMenu} className={`link ${pathname === '/' ? 'shadow-xl' : ''} flex h-full p-2 hover:shadow-md`}>
                <Image src="./next.svg" height={0} width={0} alt="Home page link" className="w-16 md:w-32 lg:w-48 " />
            </Link>

            <ul className="grid grid-flow-row md:auto-cols-fr h-full sm:grid-flow-col">
                <MainNavItems closeMenu={closeMenu} />
            </ul>

            <UserMenu toggleMenu={toggleMenu} closeMenu={closeMenu} menuOpen={menuOpen} />
        </nav>
    )
}
