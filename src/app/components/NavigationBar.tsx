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
        <Navbar shouldHideOnScroll isBordered onMenuOpenChange={setIsMenuOpen} className=" py-2">
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
                        className={`${pathname === '/games' || pathname.includes('game/') ? 'text-blue-600' : 'text-black'} 
                        text-lg `}
                    >
                        Games
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/connections"
                        className={`${pathname === '/connections' || pathname.includes('connections/') ? 'text-blue-600' : 'text-black'}
                        text-lg`}
                    >
                        Connections
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/about" className={`${pathname === '/about' ? 'text-blue-600' : 'text-black'}
                    text-lg`}
                    >
                        About
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end" className="md:text-lg font-semibold tracking-wide">
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
                            //     index === 2 ? "primary" : index === menuItems.length - 1 ? "warning" : "foreground"
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
