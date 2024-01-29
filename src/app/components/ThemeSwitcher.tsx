"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from 'next/image';

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <div className="pt-2">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Image src={theme === "light" ? "/./moon.svg" : "/./sun.svg"}
                    alt="dark-mode-theme-switcher"
                    height={28} width={28}
                />
            </button>
        </div>
    )
};