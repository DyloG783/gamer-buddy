import Link from "next/link";
import PaginatedGames from "./PaginatedGames";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/db";


const YourGames: React.FC = async () => {

    const session = await getServerSession(authOptions)

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

    const games = await prisma.user.findUnique({
        where: {
            email: session.user?.email!
        },
        include: {
            games: {
                include: {
                    genres: true,
                    modes: true,
                    platforms: true
                }
            }
        }

    })

    return (
        <>
            {games && games?.games.length > 0
                &&
                <PaginatedGames games={games.games} itemsPerPage={5} />
                ||
                <p>You don't have any games</p>
            }
        </>
    )
}

export default YourGames;