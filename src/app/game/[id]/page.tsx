import prisma from "@/lib/db"
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import GameActionBar from "../components/GameActionBar";
import { IGameFilterType, IGameFilterType, IGameFilterType } from "@/lib/custom_types";

export default async function GamePage({ params }: { params: { id: number } }) {

    const gameId = Number(params.id) // this id passed in params is the game's id
    const session = await getServerSession(authOptions);

    // the game selected from the games page
    let game;

    // boolean for whether the user already has this game added to their account
    let alreadyExists = false;

    // users email to be passed into buttons for api actions
    let userEmail;

    // retrieve game from db
    try {
        game = await prisma.game.findUnique({
            where: {
                id: gameId
            },
            include: {
                genres: true,
                modes: true,
                platforms: true
            }
        })
    }
    catch (error) {
        console.log("Failed looking up game id in database, returning bare game:", error)
        return (
            <div id="failureDiv">
                {`No game found in database; gameId: ${gameId}; game returned: ${game}`}
            </div>
        )
    }

    // return not found in case a user enters a random number through url
    if (!game) {
        return (<p>Game not found</p>)
    }

    if (session) {

        userEmail = session?.user?.email;

        const hasGame = await prisma.user.findUnique({
            where: {
                email: userEmail as string
            },
            select: {
                games: {
                    where: {
                        id: gameId
                    }
                }
            }
        })

        if (hasGame?.games.length) {
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
            <GameActionBar session={session} alreadyExists={alreadyExists} game={game} userEmail={userEmail} />
        </div>
    )
}