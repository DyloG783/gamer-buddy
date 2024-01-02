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
                <Link href="/api/auth/signin" className='flex justify-around items-center w-full p-6 mb-2 text-purple-600 italic '>
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
        <div className="flex flex-col">
            <h2 className="mb-4 font-bold text-blue-800 text-xl md:text-2xl">Your games</h2>
            <p className="text-sm italic mb-4 md:mb-10">Games that you have 'Saved' are displayed below</p>
            {games && games?.games.length > 0
                &&
                <PaginatedGames games={games.games} itemsPerPage={3} />
                ||
                <p>You don't have any games</p>
            }
        </div>
    )
}

export default YourGames;