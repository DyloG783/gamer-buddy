import { auth } from "@clerk/nextjs";

export default function DemoBanner() {

    const { userId } = auth();

    // user is logged in don't display this component
    if (userId) return null;

    return (
        <div id="demo_banner" className="banner">
            You can <span className="primary-color-font dark:blue-font">login
                as a demonstration user</span> with the
            <span className="primary-color-font dark:blue-font"> username </span>
            of <span className="primary-color-font dark:blue-font">"demo1"</span>,
            and <span className="primary-color-font dark:blue-font">password</span> of
            <span className="primary-color-font dark:blue-font"> "demo1"</span>, to view the intended experience as a user with games, connections, requests, etc!
        </div>
    )
}