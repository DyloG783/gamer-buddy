import NavLink from "./NavLink";
import React from "react"

export default function NavBar() {
    return (
        <nav className="bg-slate-400 text-white h-14 sticky top-0 ">
            <ul className="flex h-full">
                <li className="flex w-full">
                    <NavLink destination={"/"}>Home</NavLink>
                </li>
                <li className="flex w-full">
                    <NavLink destination={"/games"}>Games</NavLink>
                </li>
                <li className="flex w-full">
                    <NavLink destination={"/connections"}>Connections</NavLink>
                </li>
                <li className="flex w-full">
                    <NavLink destination={"/profile"}>Profile</NavLink>
                </li>
            </ul>
        </nav>
    )
}