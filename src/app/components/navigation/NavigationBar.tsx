import MainLinks from "./MainLinks";
import UserMenu from "./UserMenu";

export default function NavigationBar() {

    return (
        <nav className="sticky flex flex-col md:flex-row 
        justify-between max-w-7xl mx-auto shadow-md"
        >
            <MainLinks />
            <UserMenu />
        </nav>
    )
}
