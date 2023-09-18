import React from "react";
import Link from "next/link";

export default function NavLink({ destination, children }: { destination: string, children: string }) {
    return <Link href={destination} className="flex items-center justify-center w-full hover:bg-slate-600">{children}</Link>
}