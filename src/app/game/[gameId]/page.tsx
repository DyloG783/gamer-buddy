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
import { Prisma } from "@prisma/client";
type gameCover = {
    url: string
}

export default async function GamePage({ params }: { params: { gameId: number } }) {

    const { userId } = auth();

    // this is required to convert string in params to number
    const gameId = Number(params.gameId);

    // if game doesnt exist retun null, or return game
    const game = await checkGameExistsAndReturn(gameId);

    // display 'game not exist' error on page (in case user enters incorrect url)
    if (!game) return <GameNotExist />;


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
    };

    // adds playerId to server action
    const RemoveActionWithGameId = removeGame.bind(null, gameId);
    const AddActionWithGameId = addGame.bind(null, gameId);

    //convert game's release date from unix timestamp to readable
    const unix_timestamp = game.firstReleaseDate;
    let date = null;
    if (unix_timestamp) {
        date = new Date(unix_timestamp * 1000);
    };

    // game images from IGBD have dynamic sizes, default is small (t_thumb)
    const gameCover = game.cover as Prisma.JsonArray;
    // @ts-ignore (hide ts warning for 'url' below)
    const gameImageUrl = gameCover[0]?.url as string;
    const largeGameCoverURL = gameImageUrl.replace('t_thumb', 't_cover_big');

    return (
        <div id="page_container" className="flex flex-col full-height-minus-nav shadow-sm background-color dark:bg-black">
            <div id="game_container" className={`flex flex-col justify-center p-8 md:p-16 `}>
                <div id="game_info_container" className="p-1 md:p-4">
                    <div id="game_title_actions_container" className="mb-1 md:mb-4 flex  ">
                        <h1 className="font-semibold text-xl md:text-4xl mb-2 text-blue-700">{`${game?.name}`}</h1>
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
                    <p className="my-4 md:my-2 tracking-wide">{`${game?.summary}`}</p>
                    <div id="game_info_container" className="flex py-8 ">

                        <div className="flex flex-col gap-2">
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
                                {date != null && <p className="font-light">{date.toLocaleDateString()}</p>}
                            </div>
                            <Link href={`${game?.url}`}
                                target="_blank"
                                className="link mt-4"
                            >
                                Click here to view more about this game on the IGDB gaming site
                            </Link>
                        </div>
                        <div className="grow flex items-center justify-center">
                            <img src={`https:${largeGameCoverURL}`} alt="game_cover"
                                className=""
                            />
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <OtherPlayers gameId={gameId} />
        </div>
    )
}