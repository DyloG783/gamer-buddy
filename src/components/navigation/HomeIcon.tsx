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
                  hover:shadow-md flex justify-around`}
            >
                <img src="/./GamerBuddy.png" height={0} width={0} alt="Home page link"
                    className="w-16 md:w-24 lg:w-28 h-auto"
                />
            </Link>
        </>
    )
}