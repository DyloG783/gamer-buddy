import Link from "next/link";

export default function NavBar() {
    return <nav>
        
        <ul>
            <Link href={"/"}>Site Name</Link>
            <Link href={"/games/page_games"}>Games</Link>
            <Link href={"/connections/page_connections"}>Connections</Link>
        </ul>
    </nav> 
 }