
import MainLinks from "./MainLinks";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default function NavigationBar() {
    return (
        <nav >
            <div id="non_responsive_layout" className="hidden md:flex justify-between">
                <div className="flex">
                    <div className={`flex hover:shadow-md `}>
                        <Link href="/" className="grow">
                            <h1 className="text-black text-3xl font-bold px-6 py-8">
                                Gamer<span className="text-teal-500">Buddy</span>
                            </h1>
                        </Link>
                    </div>
                    <div className="flex font-semibold tracking-wide ">
                        <MainLinks />
                    </div>
                </div>

                <UserMenu />
            </div>

            <div id="responsive_layout" className="md:hidden flex flex-wrap">
                <div className={`grow flex justify-between`}>
                    <Link href="/" className="">
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
