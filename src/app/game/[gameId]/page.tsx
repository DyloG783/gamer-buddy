import OtherPlayers from "./components/OtherPlayers";
import { addGame, removeGame } from "@/lib/actions"
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist } from "@/lib/errors";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/db";
import Link from "next/link";
import { LinkButton } from "@/app/components/LinkButton";
import { RemoveButton } from "@/app/components/RemoveButton";
import { SubmitButton } from "@/app/components/SubmitButton";

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

    //convert game's release date from unix timestamp to readable


    const unix_timestamp = game.firstReleaseDate
    let date = null;
    if (unix_timestamp) {
        date = new Date(unix_timestamp * 1000)
    }


    return (
        <div id="page_container" className="flex flex-col full-height-minus-nav shadow-sm background-color dark:bg-black">
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
                                className="flex flex-col md:flex-row gap-2 ml-auto">
                                <div>
                                    {alreadyExists
                                        &&
                                        <form action={RemoveActionWithGameId}>
                                            <RemoveButton text={`Remove game`} />

                                        </form>
                                        ||
                                        <form action={AddActionWithGameId}>
                                            <SubmitButton text={`Add game`} />
                                        </form>
                                    }
                                </div>
                                <div>
                                    {alreadyExists &&
                                        <LinkButton link={`/connect/${game.id}`} text="Chat" />
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <p className="my-4 md:my-2 tracking-wide ">{`${game?.summary}`}</p>
                    <div id="game_info_groups_container"
                        className="flex flex-col my-8 gap-2 "
                    >
                        <div id="game_genre_group" className="mb-4">
                            <p className="font-semibold md:mb-2 primary-color-font">Genre</p>
                            {game?.genres.map((genre: string, index) => (
                                <span key={index} className=" font-light">{genre + ", "}</span>
                            ))}
                        </div>
                        <div id="game_mode_group" className="mb-4">
                            <p className="font-semibold md:mb-2 primary-color-font">Mode</p>
                            {game?.modes.map((mode: string, index) => (
                                <span key={index} className="font-light">{mode + ", "}</span>
                            ))}
                        </div>
                        <div id="game_platform_group" className="mb-4">
                            <p className="font-semibold md:mb-2 primary-color-font">Platform</p>
                            {game?.platforms.map((plat: string, index) => (
                                <span key={index} className="font-light">{plat + ", "}</span>
                            ))}
                        </div>
                        <div id="release_date" className="mb-4">
                            <p className="font-semibold md:mb-2 primary-color-font">Release date</p>
                            {date != null && <p className="font-thin">{date.toLocaleDateString()}</p>}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="grow p-8 md:p-20 my-auto">
                <OtherPlayers gameId={gameId} />
            </div>
        </div>
    )
}