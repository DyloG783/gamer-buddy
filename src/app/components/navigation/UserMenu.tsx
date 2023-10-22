"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

// techdebt - typing any
export default function UserMenu({ setMenuOpen, menuOpen }: { setMenuOpen: any, menuOpen: boolean }) {

    // auth check for active session redirecting to sign in if not
    const { status } = useSession()
    if (status === "unauthenticated") {
        return (
            <div className="flex h-full ">
                <Link href="/api/auth/signin" className='text-sm md:text-base lg:text-lg flex items-center w-full p-2 hover:shadow-lg text-white'>Sign in</Link>
            </div>
        )
    }

    // usermenu dropdown links mapped over below
    const userMenuItems = [
        { name: 'Profile', link: '/profile' },
        { name: 'Sign out', link: '/api/auth/signout' }
    ]

    const pathname = usePathname();

    return (
        <div className="relative h-full">
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="User or profile drop down menu"
                className={`flex gap-2 h-full items-center p-1 md:p-2 hover:shadow-lg`}
            >
                <Image src="./vercel.svg" height={0} width={0} alt="Profile Avatar" className={`w-14 md:w-24 lg:w-32`} />
                <svg
                    className={`w-2 md:w-3 lg:w-4 mb-auto ${menuOpen ? "hidden" : "inline-block"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                    className={`w-2 md:w-3 lg:w-4 mb-auto ${menuOpen ? "inline-block" : "hidden"}`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            </button>
            <div className={`w-full bg-slate-400 ${menuOpen ? "absolute" : "hidden"}`}>
                <ul>
                    {userMenuItems.map((userMenuItem, index) => (
                        <li key={index}>
                            <Link href={userMenuItem.link}
                                className={`block w-full p-0.5 md:p-3 text-sm md:text-base 
                                    lg:text-lg hover:shadow-lg text-white 
                                    ${pathname === userMenuItem.link ? 'shadow-lg' : ''}`}
                                onClick={() => setMenuOpen(false)}
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




