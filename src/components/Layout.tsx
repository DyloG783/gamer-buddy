import React, { PropsWithChildren } from "react"
import NavBar from "./navigation/NavBar"

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
}