import NavLink from "../navigation_link/NavLink";
import React from "react"

export default function NavBar() {
    return (
        <nav className="bg-slate-400 text-white w-full h-14 sticky top-0">
            <ul className="flex h-full">
                <li className="w-full hover:bg-slate-600">
                    <NavLink destination={"/"}>Home</NavLink>
                </li>
                <li className="w-full hover:bg-slate-600">
                    <NavLink destination={"/games"}>Games</NavLink>
                </li>
                <li className="w-full hover:bg-slate-600">
                    <NavLink destination={"/connections"}>Connections</NavLink>
                </li>
                <li className="w-full hover:bg-slate-600">
                    <NavLink destination={"/profile"}>Profile</NavLink>
                </li>
            </ul>
        </nav>
    )
}