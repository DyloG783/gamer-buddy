import OtherPlayers from "./components/OtherPlayers";
import GameActionBar from "./components/GameActionBar";
import { IGameFilterType } from "@/lib/custom_types";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist } from "@/lib/errors";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function GamePage({ params }: { params: { gameId: number } }) {

    const { userId } = auth();

    // this is required to convert string in params to number
    const gameId = Number(params.gameId)

    // if game doesnt exist retun null, or return game
    const game = await checkGameExistsAndReturn(gameId);

    // display 'game not exist' error on page (in case user enters incorrect url)
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

    return (
        <div id="page_container" className="flex flex-col h-full">
            <div id="game_container" className={`flex flex-col justify-center bg-slate-300 p-8 md:p-16 `}>
                <div id="game_info_container" className="p-1 md:p-4">
                    <div id="game_title_actions_container" className="mb-1 md:mb-4 flex  ">
                        <Link href={`${game?.url}`}
                            target="_blank"
                        >
                            <h1 className="font-semibold text-xl md:text-4xl mb-2 hover:italic text-blue-700 hover:text-purple-700">{`${game?.name}`}</h1>
                        </Link>
                        {userId &&
                            <GameActionBar alreadyExists={alreadyExists} game={game} />
                        }

                    </div>
                    <p className="text-left p-4 md:p-8 tracking-wide font-thin">{`${game?.summary}`}</p>
                    <div id="game_info_groups_container"
                        className="flex justify-around p-1 md:p-4 gap-2 md:gap-0 md:mt-0"
                    >
                        <div id="game_genre_group" className="mb-4">
                            <p className="font-semibold">Genre</p>
                            {game?.genres.map((genre: IGameFilterType) => (
                                <span key={genre.id} className=" font-light">{genre.name + ", "}</span>
                            ))}
                        </div>
                        <div id="game_mode_group" className="mb-4">
                            <p className="font-semibold">Mode</p>
                            {game?.modes.map((mode: IGameFilterType) => (
                                <span key={mode.id} className="font-light">{mode.name + ", "}</span>
                            ))}
                        </div>
                        <div id="game_platform_group" className="mb-4">
                            <p className="font-semibold">Platform</p>
                            {game?.platforms.map((plat: IGameFilterType) => (
                                <span key={plat.id} className="font-light">{plat.name + ", "}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grow p-8 md:p-20 bg-slate-200 my-auto">
                <OtherPlayers gameId={gameId} />
            </div>
        </div>
    )
}