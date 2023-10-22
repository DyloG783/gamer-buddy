import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from 'next/navigation';

export function MainNavItems({ setMenuOpen }: { setMenuOpen: any }) {
    const { status } = useSession()
    const pathname = usePathname();
    const mainNavItems: { name: string; link: string; }[] = [];

    // techdebt: is there a more elegant way to map conditionally if user is authenticated?
    mainNavItems.push({ name: 'Games', link: '/games' })
    if (status === "authenticated") {
        mainNavItems.push({ name: 'Connections', link: '/connections' })
    }
    return (
        <>
            {mainNavItems.map((navItem, index) => (
                <li key={index} className="block h-full w-full">
                    <Link
                        href={navItem.link}
                        className={`flex items-center text-sm md:text-base lg:text-lg px-0 h-full w-full
                            py-1 md:px-2 md:py-0 hover:shadow-lg text-white
                            ${pathname === navItem.link ? 'shadow-lg' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        {navItem.name}
                    </Link>
                </li>
            ))}
        </>
    );
}
