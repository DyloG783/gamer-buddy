import OtherPlayers from "./components/OtherPlayers";
import { SubmitButton } from "./components/SubmitButton";
import { addGame, removeGame } from "@/lib/actions"
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist } from "@/lib/errors";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from 'next/navigation'
import { LinkButton } from "./components/LinkButton";

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

    // adds playerId to server action
    const RemoveActionWithGameId = removeGame.bind(null, gameId)
    const AddActionWithGameId = addGame.bind(null, gameId)

    return (
        <div id="page_container" className="flex flex-col h-full">
            <div id="game_container" className={`flex flex-col justify-center p-8 md:p-16 `}>
                <div id="game_info_container" className="p-1 md:p-4">
                    <div id="game_title_actions_container" className="mb-1 md:mb-4 flex  ">
                        <Link href={`${game?.url}`}
                            target="_blank"
                        >
                            <h1 className="font-semibold text-xl md:text-4xl mb-2 hover:italic text-blue-700 hover:text-purple-700">{`${game?.name}`}</h1>
                        </Link>
                        {userId &&
                            <div id="gameActionsBar"
                                className="flex gap-2 ml-6 md:ml-auto">
                                <div>
                                    {alreadyExists
                                        &&
                                        <form action={RemoveActionWithGameId}>
                                            <SubmitButton text={`Remove game`} css={`bg-rose-400`} />

                                        </form>
                                        ||
                                        <form action={AddActionWithGameId}>
                                            <SubmitButton text={`Add game`} css={`bg-emerald-400`} />
                                        </form>
                                    }
                                </div>
                                <div>
                                    {alreadyExists &&
                                        <LinkButton link={`/connect/${game.id}`} text="Chat" css="bg-emerald-400" />
                                        // <Link href={`/connect/${game.id}`}>Connect</Link>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <p className="text-left p-4 md:p-8 tracking-wide font-thin">{`${game?.summary}`}</p>
                    <div id="game_info_groups_container"
                        className="flex justify-around p-1 md:p-4 gap-2 md:gap-0 md:mt-0"
                    >
                        <div id="game_genre_group" className="mb-4">
                            <p className="font-semibold">Genre</p>
                            {game?.genres.map((genre: string, index) => (
                                <span key={index} className=" font-light">{genre + ", "}</span>
                            ))}
                        </div>
                        <div id="game_mode_group" className="mb-4">
                            <p className="font-semibold">Mode</p>
                            {game?.modes.map((mode: string, index) => (
                                <span key={index} className="font-light">{mode + ", "}</span>
                            ))}
                        </div>
                        <div id="game_platform_group" className="mb-4">
                            <p className="font-semibold">Platform</p>
                            {game?.platforms.map((plat: string, index) => (
                                <span key={index} className="font-light">{plat + ", "}</span>
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