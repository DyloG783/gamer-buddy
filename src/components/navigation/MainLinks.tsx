"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MainLinks() {

    const pathname = usePathname();

    return (
        <div className="flex flex-col md:flex-row md:gap-8">
            <Link
                href="/"
                className={`${pathname === '/home' ? 'shadow-xl' : ''} 
                 hover:shadow-xl w-full`}
            >
                <img src="/./GamerBuddy.png" height={0} width={0} alt="Home page link"
                    className="w-16 md:w-20 lg:w-24 h-auto mx-auto md:p-1 object-contain"
                />
            </Link>
            <ul className="flex flex-col md:flex-row">
                <li id="games">
                    <Link
                        href="/games"
                        className={`flex items-center justify-around h-full p-2 md:p-4 
                            text-sm md:text-base lg:text-lg 
                            hover:shadow-lg text-white
                            ${pathname === '/games' || pathname.includes('game/') ? 'shadow-lg' : ''}`}
                    >
                        Games
                    </Link>
                </li>
                <li id="connections">
                    <Link
                        href="/connections"
                        className={`flex items-center justify-around h-full p-2 md:p-4
                            text-sm md:text-base lg:text-lg 
                            hover:shadow-lg text-white
                            ${pathname === '/connections' ? 'shadow-lg' : ''}`}
                    >
                        Connections
                    </Link>
                </li>
            </ul>
        </div>
    )
}