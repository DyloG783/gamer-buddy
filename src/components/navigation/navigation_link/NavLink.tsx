import React from "react";
import Link from "next/link";

export default function NavLink({ destination, children }: { destination: string, children: string }) {
    return <Link href={destination} className="flex h-full items-center text-center">{children}</Link>
}