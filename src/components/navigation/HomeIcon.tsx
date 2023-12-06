"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function HomeLink() {

    const pathname = usePathname();
    return (
        <>
            <Link
                href="/"
                className={`${pathname === '/home' ? 'shadow-xl' : ''} 
                  shadow-lg hover:shadow-xl flex justify-around`}
            >
                <img src="/./GamerBuddy.png" height={0} width={0} alt="Home page link"
                    className="w-16 md:w-24 lg:w-32 h-auto m-2"
                />
            </Link>
        </>
    )
}