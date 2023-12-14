import Link from "next/link";

// 'route id' is the dynamic id for a page, 'route name' is the route folder name, 'route label' is for the navigation display text
// for simple non dynamic routes, 'route id' could be null
export default function SubNavigation({ routeId, routeLabel, routeName }: { routeId: number | null, routeLabel: string, routeName: string }) {

    return (
        <div id="sub_navigation"
            className="top-0 w-full bg-slate-500 text-white p-1 md:p-2 text-sm">
            <Link href={`/${routeName}/${routeId}`}
                className="hover:text-purple-300 hover:italic">
                {`< back to ${routeLabel}`}
            </Link>
        </div>
    )
}