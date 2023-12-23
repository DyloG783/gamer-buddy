import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default async function GameConnections({ gameId }: { gameId: number }) {

    const { userId } = auth();

    // if not logged in don't show component
    if (!userId) {
        return null
    }

    if (userId) {
        return (
            <div id="game_connections_main"
                className="p-4 bg-slate-300 my-auto"
            >
                <h2 className="font-semibold text-lg md:text-2xl mb-2 text-blue-700">Your Connections</h2>
                <p className="italic mb-2 md:mb-4 ml-4">
                    Here are other players you have connected with
                </p>
                <Link href={`/connect/${gameId}`}>
                    <div className="p-4 md:p-8 hover:shadow-md hover:text-purple-600">
                        You don't have any connections yet. Check out the forums, or directly connect with someone playing this game in the
                        Game Connect section. Click here (or in the menu) to take a look!
                    </div>
                </Link>

            </div>
        )
    }
    else {
        return (
            <div id="game_connections_not_signed_on"
                className="p-4 bg-slate-300 my-auto"
            >
                <h2 className="font-semibold text-lg md:text-2xl mb-2 text-blue-700">Your Connections</h2>
                <p className="italic mb-2 md:mb-4 ml-4">
                    Here are other players you have connected with
                </p>
                <Link href={`/api/auth/signin`}>
                    <div className="p-4 md:p-8 text-sm hover:shadow-md hover:text-purple-600 bg-red-300">
                        Sign in to view your connections to this game
                    </div>
                </Link>
            </div>
        )
    }
}