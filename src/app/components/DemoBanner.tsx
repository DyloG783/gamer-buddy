import { auth } from "@clerk/nextjs";

export default function DemoBanner() {

    const { userId } = auth();
    if (userId) return null;

    return (
        <div id="demo_banner" className="banner">
            You can <span className="primary-color-font dark:secondary-color-font">login
                as a demonstration user</span> with the
            <span className="primary-color-font dark:secondary-color-font"> username </span>
            and <span className="primary-color-font dark:secondary-color-font">password</span>
            , of
            <span className="primary-color-font dark:secondary-color-font"> &quot;demo1&quot;</span>
            , to view the intended experience as a user with games, connections, requests, etc!
        </div>
    )
}