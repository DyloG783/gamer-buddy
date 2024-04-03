export default function About() {

    return (
        <div className="flex flex-col full-height-minus-nav 
        tracking-wide shadow-sm background-color dark:bg-black
        p-4">
            <h1 className="flex justify-around text-3xl text-blue-700 mt-10 ">About</h1>
            <div className="flex flex-col p-16 sm:px-36 gap-5 ">
                <p>
                    This application is firstly a passion, then secondly a portfolio project called Gamer Buddy!
                </p>

                <p>
                    The point of Gamer Buddy is for users to connect and be able to chat with other players of games that they have saved to their profile. Once you save a game to your profile you have access to a public game chat forum.
                </p>

                <p>
                    Users can view other player's profiles through the public game chat forum, and request to connect with them privately.
                </p>

                <p>
                    A user will be notified of a connection request, and can accept it to begin talking privately.
                </p>

                <p>
                    This completes the flow of the application. Users can go and play their games on whatever platform is relevant for them, now that they have found eachother!!
                </p>
            </div>
            <hr />
            <div className="grow flex flex-col justify-around px-10">
                <p className="mx-auto font-semibold">
                    Built on
                    <span className="primary-color-font"> NextJS </span> with
                    <span className="primary-color-font"> React</span>,
                    <span className="primary-color-font"> Tailwind</span>,
                    <span className="primary-color-font"> Prisma</span>,
                    <span className="primary-color-font"> Pusher</span>, and
                    <span className="primary-color-font"> Clerk auth</span>. Testing with
                    <span className="primary-color-font"> Playwright </span> &
                    <span className="primary-color-font"> Jest </span>
                </p>
            </div>
        </div>
    )
}