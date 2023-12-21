import prisma from "@/lib/db"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import GameActionBar from "../components/GameActionBar";
import { IGameFilterType } from "@/lib/custom_types";
import { checkGameExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist } from "@/lib/errors";

export default async function GamePage({ params }: { params: { id: number } }) {

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

    const session = await getServerSession(authOptions);
    if (session) {

        // check whether user already has this game saved
        const hasGame = await prisma.user.findUnique({
            select: { games: { where: { id: gameId } } },
            where: {
                email: session?.user?.email!
            },
        })

        if (hasGame && hasGame.games.length > 0) {
            alreadyExists = true;
        }
    }

    return (
        <div id="game_info_and_action_buttons_view" className={`flex flex-col md:flex-row justify-center bg-slate-300 p-4 my-auto`}>
            <div id="game_info_container" className="p-1 md:p-4 my-auto">
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
            {session &&
                <GameActionBar session={session} alreadyExists={alreadyExists} game={game} />
            }
        </div>
    )
}