"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserMenu() {

    // Used to track current url and close menu when url changes
    const pathname = usePathname();

    // state for toggling user menu drop down
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // closes usermenu dropdown if user navigates to another page
    useEffect(() => {
        setUserMenuOpen(false);
    }, [pathname])

    // auth check for active session redirecting to sign in if not
    const { status } = useSession()
    if (status === "unauthenticated") {
        return (
            <div className="flex h-full ">
                <Link href="/api/auth/signin" className='text-sm md:text-base lg:text-lg flex justify-around items-center w-full p-3 hover:shadow-lg text-white'>Sign in</Link>
            </div>
        )
    }

    // usermenu dropdown links mapped over in ul>li
    const userMenuItems = [
        { name: 'Profile', link: '/profile' },
        { name: 'Sign out', link: '/api/auth/signout' }
    ]

    return (
        <div className="relative">
            {/* <div className="relative mx-auto md:mx-0"></div> */}
            <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User or profile drop down menu"
                className={`flex items-center h-full gap-2 p-2 w-full
                hover:shadow-lg`}
            >
                <Image src={"vercel.svg"} height={0} width={0} alt="Profile Avatar"
                    className='w-20 md:w-28 lg:w-36 mx-auto'
                />
                <div className={`${userMenuOpen ? "hidden" : ""} mb-auto`}>
                    <svg className={`w-3 md:w-4 lg:w-5 `}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </div>
                <div className={`${userMenuOpen ? "" : "hidden"} mb-auto`}>
                    <svg
                        className={`w-3 md:w-4 lg:w-5`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </div>
            </button>
            <div className={`${userMenuOpen ? "absolute" : "hidden"}
                w-full`}
            >
                <ul className="bg-slate-400">
                    {userMenuItems.map((userMenuItem, index) => (
                        <li key={index} className={`w-full p-0.5 md:p-3 hover:shadow-lg ${pathname === userMenuItem.link ? 'shadow-lg' : ''}`}>
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




