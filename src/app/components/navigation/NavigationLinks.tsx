"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

// mapping function to apply repeated css over multiple elements
export default function NavigationLinks() {
    const { status } = useSession()
    const pathname = usePathname();
    const mainNavItems: { name: string; link: string; }[] = [];

    // techdebt: is there a more elegant way to map conditionally if user is authenticated?
    mainNavItems.push({ name: 'Games', link: '/games' })
    if (status === "authenticated") {
        mainNavItems.push({ name: 'Connections', link: '/connections' })
    }
    return (
        <ul className="grid grid-flow-row auto-cols-fr md:grid-flow-col">
            {mainNavItems.map((navItem, index) => (
                <li key={index}>
                    <Link
                        href={navItem.link}
                        // className={`h-full w-full flex items-center justify-around p-2
                        //     text-sm md:text-base lg:text-lg 
                        //     hover:shadow-lg text-white border-gray-700 border-2 border-dotted
                        //     ${pathname === navItem.link ? 'shadow-lg' : ''}`}
                        className={`flex items-center justify-around h-full p-0.5 md:p-2
                            text-sm md:text-base lg:text-lg 
                            hover:shadow-lg text-white
                            ${pathname === navItem.link ? 'shadow-lg' : ''}`}
                    >
                        {navItem.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
