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
                className={`link ${pathname === '/home' ? 'shadow-xl' : ''} 
                flex justify-around
                p-2 hover:shadow-md border-dotted`}
            >
                <Image src="./next.svg" height={0} width={0} alt="Home page link" className="w-20 md:w-32 lg:w-48 border-gray-700" />
            </Link>
        </>
    )
}