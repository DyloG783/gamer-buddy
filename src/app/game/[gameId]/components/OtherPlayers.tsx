import { TUnsafeMetadata } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { GameNotExist } from "@/lib/errors";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { auth, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function OtherPlayers({ gameId }: { gameId: number }) {

    const { userId } = auth();
    const user = await currentUser();

    // if not logged in don't show component
    if (!userId) return (
        <div className="grow flex justify-center items-center">
            <Link href={`${process.env.CLERK_SIGNIN}`}
                className="link tracking-wider text-sm md:text-base lg:text-lg"
                data-testid='sign-in'>Sign in to see information about others playing this game!</Link>
        </div>
    )

    // extract custom user profile info out of Clerk
    const userBio: TUnsafeMetadata["bio"] = user?.unsafeMetadata.bio as string
    const userTimezone: TUnsafeMetadata["timezone"] = user?.unsafeMetadata.timezone as string

    // return game or null if exists
    const game = await checkGameExistsAndReturn(gameId);

    // in case user enters something incorrect into the url
    if (game === null) {
        return <GameNotExist />
    }

    // find all users who have also have this game saved by count 
    const usersWhoAlsoHaveThisGameCount = await prisma.user.count({
        where: { games: { some: { id: gameId } } }
    })

    // find other users who have also have this game saved
    const usersWhoAlsoHaveThisGame = await prisma.user.findMany({
        where: {
            games: { some: { id: gameId } },
            NOT: { id: userId },
        }
    })

    let usersWithGameAndTimezoneCount = 0;

    if (userTimezone) {
        // count users with matching timezone as the player for this game
        usersWithGameAndTimezoneCount = usersWhoAlsoHaveThisGame.filter(u => (
            u.timezone === userTimezone
        )).length
    }
    return (
        <div className="grow flex flex-col px-8 md:px-16">
            <h2 className="font-semibold text-xl md:text-4xl text-blue-700">Other Players</h2>
            <div id="other_players_main_content"
                className="grow flex flex-col md:flex-row justify-evenly items-center"
            >
                {userTimezone && userTimezone.length > 0 &&
                    <p id="others_in_your_timezone"
                        className="p-6 tracking-wide"
                    >
                        Others in your timezone playing this game: <span className="text-emerald-500 font-semibold">{usersWithGameAndTimezoneCount}</span>
                    </p>
                    ||
                    <p id="others_in_your_timezone"
                        className="p-6 tracking-wide"
                    >
                        Set your time-zone to see if others in your time-zone also play!
                    </p>
                }
                <p id="others_in_all_timezones"
                    className="p-6 tracking-wide"
                >
                    Others playing this game: <span className="text-emerald-500 font-semibold">{usersWhoAlsoHaveThisGameCount}</span>
                </p>
            </div >
        </div>
    )
}