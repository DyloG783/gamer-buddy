import { IGame } from "@/lib/custom_types";
import Link from "next/link";
import PaginatedGames from "./PaginatedGames";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/db";


const YourGames: React.FC = async () => {

    const session = await getServerSession(authOptions)

    let playerGames: IGame[] = [];

    // auth check for active session redirecting to sign in if not
    if (!session) {
        return (
            <div>
                <Link href="/api/auth/signin" className='flex justify-around items-center w-full p-3 hover:shadow-lg hover:text-purple-600 bg-red-300 '>
                    Sign in to see your games
                </Link>
            </div>
        )
    }

    const gameSearch = await prisma.game.findMany({
        where: {
            users: {
                some: session.user
            }
        },
        include: {
            genres: true,
            platforms: true,
            modes: true
        },
    })

    if (gameSearch != null) {
        playerGames = gameSearch
    }

    return (
        <>
            {playerGames.length > 0
                &&
                <PaginatedGames games={playerGames} itemsPerPage={5} />
                ||
                <p>You don't have any games</p>
            }
        </>
    )
}

export default YourGames;