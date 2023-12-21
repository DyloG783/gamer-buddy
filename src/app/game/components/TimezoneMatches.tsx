import prisma from "@/lib/db";
import { GameNotExist } from "@/lib/errors";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { Session } from "next-auth";
import Link from "next/link";

export default async function TimezoneMatches({ gameId, session }: { gameId: number, session: Session | null }) {

    // if game doesnt exist retun null, or return game
    const game = await checkGameExistsAndReturn(gameId);

    if (game === null) {
        return
    }

    // find other users who have also have this game saved by count to be displayed in page regardless of session
    const usersWhoAlsoHaveThisGameCount = await prisma.user.count({
        where: {
            games: {
                some: {
                    id: gameId
                }
            },
        },
    })

    if (session) {

        // get this user from session to lookup profile tz setting
        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            },
            include: { Profile: true }
        })

        if (user?.Profile?.timezone) {

            // find other users who have also have this game saved
            const usersWhoAlsoHaveThisGame = await prisma.user.findMany({
                where: {
                    games: {
                        some: {
                            id: gameId
                        }
                    },
                    NOT: {
                        id: user?.id
                    },
                },
                select: { Profile: true }
            })

            const usersWithGameAndTimezoneCount = usersWhoAlsoHaveThisGame.filter(u => (
                u.Profile?.timezone === user.Profile?.timezone
            )).length


            return (
                <div className="p-4 bg-slate-300 my-auto">
                    <h2 className="font-semibold text-lg md:text-2xl mb-2 text-blue-700">Other Players</h2>
                    <p className="italic mb-2 md:mb-4 ml-4">These are the other people playing this game.
                        Click below (or in the menu) to check out the chat forums, or find someone to connect with!
                    </p>

                    <Link href={`/connect/${gameId}`}>
                        <div id="timezone_main_content"
                            className="grid grid-flow-col auto-cols-fr hover:shadow-md
                            hover:text-purple-600 "
                        >
                            <div id="others_in_your_timezone"
                                className="text-sm p-4 md:p-8 "
                            >
                                {`Other players in your timezone playing this game: '${usersWithGameAndTimezoneCount}'`}
                            </div>
                            <div id="others_in_all_timezones"
                                className="text-sm p-4 md:p-8"
                            >
                                {`Players in all timezones playing this game: '${usersWhoAlsoHaveThisGameCount - 1}'`}
                            </div>
                        </div>
                    </Link>
                </div>
            )
        }
        else {
            return (
                <div className="p-4 bg-slate-300">
                    <h2 className="font-semibold text-2xl mb-2 text-blue-700">Other Players</h2>
                    <p className="italic mb-2 md:mb-4 ml-4">These are the other people playing this game.
                        Click below (or in the menu) to check out the chat forums, or find someone to connect with!
                    </p>
                    <div id="timezone_no_timezone_set" className="grid grid-flow-col auto-cols-fr">
                        <Link href={`/profile`}>
                            <div id="others_in_your_timezone"
                                className="text-sm p-4 md:p-8 bg-yellow-200 hover:shadow-md
                            hover:text-purple-600"
                            >
                                *Set your timezone to make it easier to connect with others
                            </div>
                        </Link>
                        <Link href={`/connect/${gameId}`} className="">
                            <div id="others_in_all_timezones"
                                className="text-sm p-4 md:p-8 hover:shadow-md
                            hover:text-purple-600"
                            >
                                {`Players in all timezones playing this game: '${usersWhoAlsoHaveThisGameCount - 1}'`}
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <div className="p-4 bg-slate-300">
                <h2 className="font-semibold text-2xl mb-2 text-blue-700">Other Players</h2>
                <p className="italic mb-2 md:mb-4 ml-4">These are the other people playing this game.
                    Click below (or in the menu) to check out the chat forums, or find someone to connect with!
                </p>
                <div id="timezone_no_timezone_set" className="grid grid-flow-col auto-cols-fr">
                    <Link href={`/api/auth/signin`}>
                        <div id="timezone_not_signedin"
                            className="text-sm p-4 md:p-8 hover:shadow-md hover:text-purple-600 bg-red-300 mx-2"
                        >
                            Sign in to see if other games matching your timezone are playing this game
                        </div>
                    </Link>
                    <Link href={`/connect/${gameId}`} className="">
                        <div id="others_in_all_timezones"
                            className="text-sm p-4 md:p-8 hover:shadow-md
                            hover:text-purple-600"
                        >
                            {`Players in all timezones playing this game: '${usersWhoAlsoHaveThisGameCount - 1}'`}
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}