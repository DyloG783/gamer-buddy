import React, { useState } from "react"
import Image from 'next/image';
import Link from "next/link";
import NavLink from "./NavLink";
import HamburgerMenu from "./HamburgerMenu";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const onClick = () => {
        setMenuOpen(!menuOpen)
    };

    return (
        <nav className="flex justify-between items-center flex-col md:flex-row bg-slate-400 shadow-lg">
            <Link href="/home" className="hover:bg-slate-600 p-4 shadow-lg">
                <Image priority src="./next.svg" height={0} width={0} alt="Home page link" className="w-16 md:w-32 lg:48" />
            </Link>

            <ul className="flex flex-wrap md:flex-nowrap">
                <li className="w-full md:w-32 shadow-lg">
                    <NavLink link={"/games"}>Games</NavLink>
                </li>
                <li className="w-full md:w-32 shadow-lg">
                    <NavLink link={"/connections"}>Connections</NavLink>
                </li>
            </ul>

            <HamburgerMenu onClick={onClick} menuOpen={menuOpen} />
        </nav>
    )
}
