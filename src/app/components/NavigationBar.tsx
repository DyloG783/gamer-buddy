'use client'

import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useState } from "react";

export default function NavigationBar() {

    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Games",
        "Connections",
        "About"
    ];

    return (
        <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen}
            className="font-semibold py-2"
            maxWidth="full"
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <h1 className="text-black text-3xl font-bold">
                            Gamer<span className="primary-color-font">Buddy</span>
                        </h1>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8 tracking-wide" justify="center">
                <NavbarItem >
                    <Link href="/games"
                        className={`${pathname === '/games' || pathname.includes('game/') ? 'underline' : ''} 
                        text-lg text-blue-800`}
                    >
                        Games
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/connections"
                        className={`${pathname === '/connections' || pathname.includes('connections/') ? 'underline' : ''}
                        text-lg text-blue-800`}
                        color="primary"
                    >
                        Connections
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" className={`${pathname === '/about' ? 'underline' : ''}
                    text-lg text-blue-800`}
                    >
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="md:text-lg font-semibold tracking-wide blue-font">
                <NavbarItem className="md:text-lg">
                    <SignedIn>
                        <UserButton
                            userProfileMode="navigation"
                            userProfileUrl="/user-profile/"
                            showName
                            appearance={{
                                elements: {
                                    userButtonBox: "",
                                    userButtonOuterIdentifier: "md:text-lg font-semibold blue-font"
                                }
                            }}
                            afterSignOutUrl={process.env.NEXT_PUBLIC_BASE_URL}
                        />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="mt-4">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className={`w-full tracking-wide text-blue-800`}
                            href={item === 'Games' ? '/games' : '' || item === 'Connections' ? '/connections' : '' || item === 'About' ? '/about' : ''}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
