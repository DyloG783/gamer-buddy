import React from "react";
import Link from "next/link";

export default function NavLink({ link, children }: { link: string, children: string }) {
    return <Link href={link} className="flex justify-center hover:bg-slate-600 text-white p-4">{children}</Link>
}