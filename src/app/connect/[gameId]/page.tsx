import prisma from "@/lib/db";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { GameNotExist } from "@/lib/errors";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import Form from "./components/Form";
import ChatForum from "./components/ChatForum";

// stop page from caching (needed for real time chat (in prod))
export const dynamic = "force-dynamic";

export default async function Connect({ params }: { params: { gameId: number } }) {

    const gameId = Number(params.gameId) // this id passed in params is the game's id
    const { userId } = auth();

    // if game doesnt exist retun null, or return game
    const game = await checkGameExistsAndReturn(gameId);

    // display 'game not exist' error on page (in case user enters incorrect url)
    if (game === null) {
        return (
            <GameNotExist />
        )
    }

    // get all the users who also have this game saved
    const otherPlayers = await prisma.user.findMany({
        where: {
            games: {
                some: {
                    id: gameId
                }
            },
            NOT: {
                id: userId!
            }
        },
    })

    // create game forum table if not already exists
    const gameRoom = await prisma.chatGameRoom.upsert({
        where: { gameId: gameId },
        update: {},
        create: {
            gameId: gameId
        }
    })

    // get messages from this games chat forum 
    const messages = await prisma.chatGameRoom.findUnique({
        where: { gameId: gameRoom.gameId },
        select: {
            messages: {
                select: {
                    message: true,
                    createdAt: true,
                    sentGameBy: { select: { userName: true } }
                },
                take: 50,
                orderBy: { createdAt: "asc" }
            },
        },
    });

    return (
        <div id="connect_container"
            className="full-height-minus-nav background-color dark:bg-black"
        >
            <div id="title_link_container" className="mb-10 md:mb-20 pt-4 md:pt-10">
                <Link href={`/game/${gameId}`}
                >
                    <h1 className="text-center tracking-wider text-blue-700 
                    font-semibold text-xl md:text-4xl hover:text-purple-700 
                    hover:italic 
                    ">
                        {game?.name} Chat
                    </h1>
                </Link>
            </div>
            <div id="players_and_chat_forum_container "
                className="flex flex-col md:flex-row md:justify-between "
            >
                <div id="other_players_container" className="px-4 pb-10 md:pb-0 md:min-w-[33%]">
                    <p className="font-semibold text-lg md:text-xl mb-1 md:mb-6 tracking-wide text-blue-700">Other Players</p>
                    <ul id="player_list "
                        className="flex flex-col gap-2">
                        {otherPlayers.map(player => (
                            <li key={player.email}
                                className="shadow-sm hover:italic text-sm md:text-base p-1 "
                            >
                                <Link key={player.email + player.email!} href={`/connections/view-player/${player.id}`}
                                    className="inline-block w-full">
                                    <p className="tracking-wider">{player.userName}</p>
                                    <p className="italic font-light">{player.timezone}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="chat_forum container"
                    className="md:min-w-[66%] "
                >
                    <h2 className="font-semibold text-lg md:text-xl mb-1 md:mb-6 ml-4 md:ml-2 tracking-wide text-blue-700">Chat Forum</h2>
                    <ChatForum messages={messages?.messages!} gameRoomId={gameRoom.id} />
                    <Form gameRoomId={gameRoom.id} />
                </div>

            </div>
        </div>
    )

}