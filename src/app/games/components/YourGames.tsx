import PaginatedGames from "./PaginatedGames";
import Link from "next/link";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";

const YourGames: React.FC = async () => {

    const { userId } = auth();

    // auth check for active session redirecting to sign in if not
    if (!userId) {
        return (
            <Link href={`${process.env.CLERK_SIGNIN}`}
                className=' flex justify-around text-purple-600 italic hover:underline
                font-semibold tracking-wide mb-4'
            >
                Sign in to see your games
            </Link>
        )
    }

    // get all users games and the cout of other players to display in game card
    const games = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            games: { include: { _count: { select: { users: true } } } }
        }
    })

    return (
        <div id="yourgames_container" className="flex flex-col">
            <h2 className="mb-4 font-bold text-blue-800 tracking-wide text-xl md:text-2xl">Your games</h2>
            <p className="text-sm font-semibold tracking-wide italic mb-4 md:mb-10">Games that you have <span className="text-teal-500">Saved</span> are displayed below</p>
            <div id="games_container" className="flex justify-around">
                {games && games?.games.length > 0
                    &&
                    <PaginatedGames games={games.games} itemsPerPage={3} />
                    ||
                    <p> You don&apos;t have any games</p>
                }
            </div>
        </div >
    )
}

export default YourGames;