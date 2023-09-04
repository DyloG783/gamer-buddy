import Link from "next/link";

export default function NavBar() {
    return (
    <nav className="bg-slate-400 text-white w-full h-14 fixed top-0">
        <ul className="flex h-full items-center text-center">
            <Link href={"/"} className="navItems">Home</Link>
            <Link href={"/games"} className="navItems">Games</Link>
            <Link href={"/connections"} className="navItems">Connections</Link>
            <Link href={"/profile"} className="navItems">Profile</Link>
        </ul>
    </nav>  
    )
}