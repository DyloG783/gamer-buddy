import MainLinks from "./MainLinks";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default function NavigationBar() {
    return (
        <nav className="h-full">
            <div id="non_responsive_layout" className="hidden md:flex justify-between h-full">
                <div className="flex">
                    <Link href="/" className="hover:shadow-md px-6 h-full flex items-center">
                        <h1 className="text-black text-3xl font-bold">
                            Gamer<span className="text-teal-500">Buddy</span>
                        </h1>
                    </Link>
                    <div className="flex font-semibold tracking-wide ">
                        <MainLinks />
                    </div>
                </div>
                <UserMenu />
            </div>
            <div id="responsive_layout" className="md:hidden flex flex-wrap">
                <div className={`grow flex justify-between`}>
                    <Link href="/" >
                        <h1 className="text-black text-lg font-bold p-4">
                            Gamer<span className="text-teal-500">Buddy</span>
                        </h1>
                    </Link>
                    <UserMenu />
                </div>

                <div className="grow font-semibold tracking-wide ">
                    <MainLinks />
                </div>

            </div>
        </nav>
    )
}
