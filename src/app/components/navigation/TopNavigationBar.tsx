import HomeLink from "./HomeLink";
import NavigationLinks from "./NavigationLinks";
import UserMenu from "./UserMenu";

export default function TopNavigationBar() {

    return (
        <nav className="sticky top-0 md:h-[10vh]
         grid auto-rows-fr auto-cols-fr
         md:flex md:flex-row md:justify-between 
        bg-slate-400"
        >
            <HomeLink />
            <NavigationLinks />
            <UserMenu />
        </nav>
    )
}
