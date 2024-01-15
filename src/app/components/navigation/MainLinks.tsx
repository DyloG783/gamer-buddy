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
                        className={`hover:shadow-md px-8 py-4 my-auto h-full items-center flex
                            ${pathname === '/games' || pathname.includes('game/') ? 'underline' : ''}`}
                    >
                        Games
                    </Link>
                </li>
                <li id="connections" className="flex">
                    <Link
                        href="/connections"
                        className={`hover:shadow-md px-8 py-4 my-auto h-full items-center flex
                            ${pathname === '/connections' ? 'underline' : ''}`}
                    >
                        Connections
                    </Link>
                </li>
            </ul>
        </>
    )
}