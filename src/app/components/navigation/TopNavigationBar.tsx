"use client"

import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import NavigationLinks from "./NavigationLinks";
import UserMenu from "./UserMenu";

export default function TopNavigationBar() {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 md:h-[10vh]
         grid auto-rows-fr auto-cols-fr
         md:flex md:flex-row md:justify-between 
        bg-slate-400"
        >
            <Link
                href="/"
                className={`link ${pathname === '/home' ? 'shadow-xl' : ''} 
                flex justify-around
                p-2 hover:shadow-md border-dotted`}
                onClick={() => setUserMenuOpen(false)}
            >
                <Image src="./next.svg" height={0} width={0} alt="Home page link"
                    className="w-20 md:w-32 lg:w-48 border-gray-700"
                />
            </Link>
            <ul className="grid grid-flow-row auto-cols-fr md:grid-flow-col">
                <NavigationLinks setUserMenuOpen={setUserMenuOpen} />
            </ul>

            <UserMenu setUserMenuOpen={setUserMenuOpen} userMenuOpen={userMenuOpen} />
        </nav>
    )
}
