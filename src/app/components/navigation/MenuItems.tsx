import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

export function MainNavItems({ closeMenu }: any) {
    const { status } = useSession()
    const pathname = usePathname();
    const mainNavItems: { name: string; link: string; }[] = [];

    // techdebt: is there a more elegant way to map conditionally if user is authenticated?
    mainNavItems.push({ name: 'Games', link: '/games' })

    if (status === "authenticated") {
        mainNavItems.push({ name: 'Connections', link: '/connections' })
    }

    return (
        <>
            {mainNavItems.map((navItem, index) => (
                <li key={index} className="flex">
                    <Link href={navItem.link} onClick={closeMenu}
                        className={`link ${pathname === navItem.link ? 'shadow-lg' : ''}
                        text-sm md:text-base lg:text-lg flex items-center w-full px-0 py-1 md:px-2 md:py-0 hover:shadow-lg text-white`}>
                        {navItem.name}
                    </Link>
                </li>
            ))}
        </>
    );
}

export function UserMenuItems({ closeMenu }: any) {
    const userMenuItems = [
        { name: 'Profile', link: '/profile' },
        { name: 'Sign out', link: '/api/auth/signout' }
    ]

    const pathname = usePathname();

    return (
        <>
            {userMenuItems.map((userMenuItem, index) => (
                <li key={index}>
                    <Link href={userMenuItem.link} onClick={closeMenu}
                        className={`block w-full p-0.5 md:p-3 text-sm md:text-base lg:text-lg hover:shadow-lg text-white 
                        ${pathname === userMenuItem.link ? 'shadow-lg' : ''}`}>
                        {userMenuItem.name}
                    </Link>
                </li>
            ))}
        </>
    );
}

