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
        <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen} className="shadow-sm py-2">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <h1 className="text-black text-3xl font-bold">
                            Gamer<span className="text-teal-500">Buddy</span>
                        </h1>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4 tracking-wide " justify="center">
                <NavbarItem >
                    <Link href="/games"
                        className={`${pathname === '/games' || pathname.includes('game/') ? 'underline' : ''} 
                        text-lg`}
                    >
                        Games
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/connections"
                        className={`${pathname === '/connections' || pathname.includes('connections/') ? 'underline' : ''}
                        text-lg`}
                    >
                        Connections
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" className={`${pathname === '/about' || pathname.includes('about/') ? 'underline' : ''}
                    text-lg`}
                    >
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem >
                    <SignedIn>
                        <UserButton
                            userProfileMode="navigation"
                            userProfileUrl="/user-profile/"
                            showName
                            appearance={{
                                elements: {
                                    userButtonBox: "",
                                    userButtonOuterIdentifier: "md:text-lg font-semibold"
                                }
                            }}
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
                            // color={
                            //     index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            // }
                            className={`w-full tracking-wide`}
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
