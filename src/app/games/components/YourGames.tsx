import PaginatedGames from "./PaginatedGames";
import Link from "next/link";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";


const YourGames: React.FC = async () => {

    const { userId } = auth();

    // auth check for active session redirecting to sign in if not
    if (!userId) {
        return (
            <div>
                <Link href="/api/auth/signin" className='flex justify-around items-center w-full p-3 hover:shadow-lg hover:text-purple-600 bg-yellow-200 '>
                    Sign in to see your games
                </Link>
            </div>
        )
    }

    const games = await prisma.user.findUnique({
        where: { id: userId },
        select: {
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