import React from "react";
import Link from "next/link";

export default function NavLink({ link, children }: { link: string, children: string }) {
    return <Link href={link} className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">{children}</Link>
}