import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import Link from "next/link"
import SubNavigation from "./components/SubNavigation"


export default async function Connect({ params }: { params: { id: number } }) {

    const gameId = Number(params.id) // this id passed in params is the game's id

    const session = await getServerSession(authOptions)

    const game = await prisma.game.findUnique({
        where: { id: gameId }
    })

    const otherPlayers = await prisma.user.findMany({
        where: {
            games: {
                some: {
                    id: gameId
                }
            },
            NOT: {
                email: session?.user?.email
            }
        },
        include: {
            Profile: {
                select: { timezone: true }
            }
        }
    })

    return (
        <div id="connect_container"
            className="w-full"
        >
            <SubNavigation routeId={gameId} routeLabel={`${game?.name} page`} routeName="game" />
            <div className="mt-2 md:mt-6 flex justify-around">
                <h1 className=" my-2 md:my-10"
                >
                    <Link href={`/game/${gameId}`}
                        className="text-blue-700 font-semibold text-xl md:text-4xl
                    hover:text-purple-700 hover:italic "
                    >
                        {game?.name}
                    </Link>
                </h1>
            </div>


            <div id="players_and_chat_forum_container"
                className="flex justify-between"
            >
                <div id="other_players_container">
                    <p className="font-semibold mb-1 md:mb-6">Other Players</p>
                    <ul id="players_list"
                        className="flex flex-col gap-4">
                        {otherPlayers.map(player => (
                            <li key={player.email}
                                className="shadow-sm text-sm md:text-base italic"
                            >
                                {player.Profile?.timezone
                                    &&
                                    <Link href={`/connect/${gameId}/${player.id}`}
                                        className="hover:text-purple-700">
                                        {player.name}: {player.Profile.timezone}
                                    </Link>

                                    ||
                                    <Link href={`/connect/${gameId}/${player.id}`}
                                        className="hover:text-purple-700">
                                        {player.name}:
                                    </Link>
                                }
                            </li>
                        ))}
                    </ul>
                </div>

                <div id="chat_forum container"
                    className="bg-yellow-200 min-w-[50%]"
                >
                    Chat forum
                </div>

            </div>
        </div>
    )

}