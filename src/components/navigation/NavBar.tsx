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
        <nav className="flex items-center justify-between flex-wrap p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
                <Link href="/home" >
                    <Image priority src="./next.svg" height={0} width={0} alt="Logo" className="w-100 h-10 mr-2" />
                </Link>
            </div>

            <HamburgerMenu onClick={onClick} menuOpen={menuOpen} />

            <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${menuOpen ? "block" : "hidden"}`}>
                <div className="text-sm lg:flex-grow">
                    <NavLink link={"/games"}>Games</NavLink>
                    <NavLink link={"/connections"}>Connections</NavLink>
                    <NavLink link={"#"}>Another link</NavLink>
                    <NavLink link={"#"}>Another link 2</NavLink>
                </div>
                <div>
                    <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white">Click Me</button>
                </div>
            </div>



        </nav>
    )
}
