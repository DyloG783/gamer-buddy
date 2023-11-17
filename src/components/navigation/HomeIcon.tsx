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
                 p-4 hover:shadow-md flex justify-around`}
            >
                <Image src="/./mainicon.svg" height={0} width={0} alt="Home page link"
                    className="w-12 md:w-20 lg:w-24 "
                    priority
                />
            </Link>
        </>
    )
}