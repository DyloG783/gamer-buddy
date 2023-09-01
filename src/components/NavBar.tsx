import Link from "next/link";

export default function NavBar() {
    return <nav className="bg-slate-400 text-white p-2 w-full fixed top-0 h-16">
        <ul>
            <Link href={"/"}>Site Name</Link>
            <Link href={"/games"}>Games</Link>
            <Link href={"/connections"}>Connections</Link>
        </ul>
    </nav> 
 }