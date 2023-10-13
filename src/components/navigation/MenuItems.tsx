import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export function MainNavItems({ closeMenu }: any) {
    const mainNavItems = [
        { name: 'Games', link: '/games' },
        { name: 'Connections', link: '/connections' }
    ];
    const pathname = usePathname();
    return (
        <>
            {mainNavItems.map((navItem, index) => (
                <li key={index} className="flex">
                    <Link href={navItem.link} onClick={closeMenu}
                        className={`link ${pathname === navItem.link ? 'bg-slate-500' : ''}
                        text-sm md:text-base lg:text-lg flex items-center w-full p-2 hover:bg-slate-600 text-white`}>
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
                    <Link href={userMenuItem.link} onClick={closeMenu} className={` block w-full p-0.5 md:p-3 text-sm md:text-base lg:text-lg hover:bg-slate-600 text-white ${pathname === userMenuItem.link ? 'bg-slate-500' : ''}`} >{userMenuItem.name}</Link>
                </li>
            ))}
        </>
    );
}

