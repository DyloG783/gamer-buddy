import HomeIcon from "./HomeIcon";
import NavigationLinks from "./NavigationLinks";
import UserMenu from "./UserMenu";

export default function TopNavigationBar() {

    return (
        <nav className="sticky md:min-h-[100px] flex flex-col md:flex-row 
        justify-between bg-slate-400 "
        >
            <HomeIcon />
            <NavigationLinks />
            <UserMenu />
        </nav>
    )
}
