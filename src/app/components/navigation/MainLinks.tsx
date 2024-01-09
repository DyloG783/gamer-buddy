"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MainLinks() {

    const pathname = usePathname();

    return (
        <>
            <ul className="grow flex p-4 md:p-0 justify-center ">
                <li id="games" className="flex ">
                    <Link
                        href="/games"
                        className={`hover:shadow-md py-4 px-8 md:my-auto md:py-8
                            ${pathname === '/games' || pathname.includes('game/') ? 'underline' : ''}`}
                    >
                        Games
                    </Link>
                </li>
                <li id="connections" className="flex">
                    <Link
                        href="/connections"
                        className={`hover:shadow-md py-4 px-6 md:my-auto md:py-8
                            ${pathname === '/connections' ? 'underline' : ''}`}
                    >
                        Connections
                    </Link>
                </li>
            </ul>
        </>
    )
}