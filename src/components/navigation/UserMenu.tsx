"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserMenu() {

    // Used to track current url and close menu when url changes
    const pathname = usePathname();

    // usermenu dropdown links mapped over in ul>li
    const userMenuItems = [
        { name: 'Profile', link: '/profile' },
        { name: 'Sign out', link: '/api/auth/signout' }
    ]

    // state for toggling user menu drop down
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // closes usermenu dropdown if user navigates to another page
    useEffect(() => {
        setUserMenuOpen(false);
    }, [pathname])

    // status used for auth check, data used for profile picture
    const { status, data } = useSession()

    // auth check for active session redirecting to sign in if not
    if (status === "unauthenticated") {
        return (
            <div className="flex ">
                <Link href="/api/auth/signin" className='text-sm md:text-base lg:text-lg flex justify-around items-center w-full p-2 md:p-8 hover:shadow-lg text-white'>Sign in</Link>
            </div>
        )
    }

    return (
        <div className="relative min-w-[150px]">
            <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User or profile drop down menu"
                className={`flex justify-center md:justify-end h-full p-2 md:p-4 w-full
                hover:shadow-lg gap-2`}
            >
                <img src={`${data?.user?.image}`} height={0} width={0} alt="Profile Avatar"
                    className='w-12 md:w-16 h-auto  rounded-full'
                />
                <div className={`${userMenuOpen ? "hidden" : ""} mb-auto`}>
                    <svg className={`w-3 md:w-4 lg:w-5`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#FFFFFF"
                            d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                        />
                    </svg>
                </div>
                <div className={`${userMenuOpen ? "" : "hidden"} mb-auto`}>
                    <svg
                        className={`w-3 md:w-4 lg:w-5`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#FFFFFF"
                            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
                        />
                    </svg>
                </div>
            </button>
            <div className={`${userMenuOpen ? "absolute" : "hidden"}
                w-full`}
            >
                <ul className="bg-slate-400">
                    {userMenuItems.map((userMenuItem, index) => (
                        <li key={index} className={`w-full p-3 hover:shadow-lg ${pathname === userMenuItem.link ? 'shadow-lg' : ''}`}>
                            <Link href={userMenuItem.link}
                                className={`flex justify-around w-full text-sm md:text-base lg:text-lg text-white`}
                                onClick={() => setUserMenuOpen(false)}
                            >
                                {userMenuItem.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}




