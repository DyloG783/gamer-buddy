import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export function UserMenuItems({ closeMenu }: any) {
    const userItems = [
        { name: "Profile", link: "/profile" },
        { name: "Sign out", link: "/signout" }
    ]
    return (
        <>
            {userItems.map((item, index) => (
                <li>
                    <Link key={index} href={item.link} onClick={closeMenu} className="block w-full p-0.5 md:p-3 text-sm md:text-base lg:text-lg hover:bg-slate-600 text-white">{item.name}</Link>
                </li>
            ))}
        </>
    );
}

export function MainNavItems({ closeMenu }: any) {
    const mainNavItems = [
        { name: 'Games', link: '/games' },
        { name: 'Connections', link: '/connections' }
    ];
    const pathname = usePathname();
    return (
        <>
            {mainNavItems.map((navItem, index) => (
                <li className="flex  ">
                    <Link key={index} href={navItem.link} onClick={closeMenu}
                        className={`link ${pathname === navItem.link ? 'bg-slate-600' : ''}

                        text-sm md:text-base lg:text-lg flex items-center w-full p-2 hover:bg-slate-600 text-white`}>
                        {navItem.name}
                    </Link>
                </li>
            ))}
        </>
    );
}