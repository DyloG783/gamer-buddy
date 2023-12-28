import GameConnections from "../components/GameConnections";
import TimezoneMatches from "../components/TimezoneMatches";
import GameActionBar from "../components/GameActionBar";
import { IGameFilterType } from "@/lib/custom_types";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist } from "@/lib/errors";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db"
import Link from "next/link";
import ChatForum from "../components/ChatForum";

export default async function GamePage({ params }: { params: { id: number } }) {

    const { userId } = auth();

    // this is required to convert string in params to number
    const gameId = Number(params.id)

    // if game doesnt exist retun null, or return game
    const game = await checkGameExistsAndReturn(gameId);

    if (game === null) {
        return (
            <GameNotExist />
        )
    }

    // boolean for whether the user already has this game added to their account
    let alreadyExists = false;
    // check whether user already has this game saved
    if (userId) {

        const hasGame = await prisma.user.findUnique({
            select: { games: { where: { id: gameId } } },
            where: {
                id: userId
            },
        })

        if (hasGame && hasGame.games.length > 0) {
            alreadyExists = true;
        }
    }

    //create game forum table if not already exists
    await prisma.gameforum.upsert({
        where: { id: gameId },
        update: {},
        create: {
            id: gameId,
            gameId: gameId
        }
    })

    const forumMessages = await prisma.gameforum.findUnique({
        select: {
            messages: {
                include:
                {
                    sentBy:
                        { select: { userName: true } }
                },
                orderBy: { createdAt: "desc" }
            },
        },
        where: { gameId: gameId },

    })

    return (
        <div id="game_container" className={`flex flex-col  justify-center bg-slate-300 p-4 my-auto`}>
            <div id="game_info_container" className="p-1 md:p-4 my-auto flex md:flex-row">
                <div id="game_info_container">
                    <div id="game_title_and_summary" className="pb-1 md:pb-4">
                        <Link href={`${game?.url}`}
                            className="hover:italic text-blue-700 hover:text-purple-700 "
                            target="_blank"
                        >
                            <h1 className="font-semibold text-xl md:text-4xl text-center pb-2 ">{`${game?.name}`}</h1>
                        </Link>
                        <p className="text-left italic p-4">{`${game?.summary}`}</p>
                    </div>
                    <div id="game_info_groups_container"
                        className="flex justify-around p-1 md:p-4 gap-2 md:gap-0 md:mt-10"
                    >
                        <div id="game_genre_group" className="pb-4">
                            <p className="font-semibold">Genre</p>
                            {game?.genres.map((genre: IGameFilterType) => (
                                <span key={genre.id} className="italic">{genre.name + ", "}</span>
                            ))}
                        </div>
                        <div id="game_mode_group" className="pb-4">
                            <p className="font-semibold">Mode</p>
                            {game?.modes.map((mode: IGameFilterType) => (
                                <span key={mode.id} className="italic">{mode.name + ", "}</span>
                            ))}
                        </div>
                        <div id="game_platform_group" className="pb-4">
                            <p className="font-semibold">Platform</p>
                            {game?.platforms.map((plat: IGameFilterType) => (
                                <span key={plat.id} className="italic">{plat.name + ", "}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {userId &&
                    <GameActionBar alreadyExists={alreadyExists} game={game} />
                }
            </div>

            <GameConnections gameId={gameId} />
            <TimezoneMatches gameId={gameId} />
            <ChatForum messages={forumMessages} gameId={gameId} />
        </div>
    )
}