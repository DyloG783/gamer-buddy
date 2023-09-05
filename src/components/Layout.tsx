import React, { PropsWithChildren } from "react"
import NavBar from "./navigation/navigation_bar/NavBar"

export default function Layout({ children }: PropsWithChildren){ 
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}