import React from "react";
import Link from "next/link";

export function UserMenuItems({ closeMenu }: any) {
    const userItems = [
        { name: "Profile", link: "/profile" },
        { name: "Sign out", link: "/signout" }
    ]
    return (
        <>
            {userItems.map((item, index) => (
                <li>
                    <Link key={index} href={item.link} onClick={closeMenu} className="block w-full p-0 md:p-3 text-sm md:text-base lg:text-lg hover:bg-slate-600 text-white">{item.name}</Link>
                </li>
            ))}
        </>
    );
}

export function MainNavItems({ closeMenu }: any) {
    const mainItems = [
        { name: "Games", link: "/games" },
        { name: "Connections", link: "/connections" }
    ]
    return (
        <>
            {mainItems.map((item, index) => (
                <li className="flex  ">
                    <Link key={index} href={item.link} onClick={closeMenu} className=" text-sm md:text-base lg:text-lg flex items-center w-full p-2 hover:bg-slate-600 text-white">{item.name}</Link>
                </li>
            ))}
        </>
    );
}