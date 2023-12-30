import MainLinks from "./MainLinks";
import UserMenu from "./UserMenu";

export default function NavigationBar() {

    return (
        <nav className="flex flex-col md:flex-row 
        justify-between"
        >
            <MainLinks />
            <UserMenu />
        </nav>
    )
}
