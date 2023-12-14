import prisma from "@/lib/db"
import SubNavigation from "../components/SubNavigation"
import PlayerActionBar from "./components/PlayerActionBar"
import Link from "next/link"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import { IGame, IUser } from "@/lib/custom_types"


export default async function Player({ params }: { params: { player: string, id: number } }) {

    const gameId = Number(params.id)
    const playerId = params.player // this refeers to the other player the user wants to connect with

    const session = await getServerSession(authOptions);

    const player: IUser = await prisma.user.findUniqueOrThrow({
        where: { id: playerId }
    })

    const user: IUser = await prisma.user.findUniqueOrThrow({
        where: { email: session?.user?.email! }
    })

    const game: IGame = await prisma.game.findUniqueOrThrow({
        where: { id: gameId }
    })

    const playerWithProfileGamesFollowers = await prisma.user.findUnique({
        where: { id: playerId }, include: { Profile: true, games: true }
    })


    // check whether the user is already following this player
    let alreadyExists = false;

    const relation = await prisma.follows.findUnique({
        where: {
            followingId_followedById: {
                followedById: user.id,
                followingId: player.id
            }
        }
    })

    if (relation) {
        alreadyExists = true
    }

    return (
        <div id="connect_with_player_container"
            className="w-full"
        >
            <SubNavigation routeId={gameId} routeLabel={`${game?.name} Connect Forum`} routeName="connect" />
            <div className="grow flex justify-around my-1 md:my-10">
                <div className="md:w-3/4 shadow-md p-4 md:p-10">
                    {session
                        &&
                        <PlayerActionBar user={user} player={player} alreadyExists={alreadyExists!} game={game} />
                        ||
                        <p>Sign in to connect with player</p>
                    }
                    <h1 className="font-semibold text-blue-700 md:text-xl mb-1 md:mb-4">{player?.name}'s Profile</h1>
                    <p className="italic text-sm md:text-base mb-10">
                        You both play {game?.name} so click the 'Connect' button to send a connection request!
                    </p>
                    <div id="players_bio_container"
                        className="ml-4 mb-10">
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">About {player?.name}</h2>
                        {playerWithProfileGamesFollowers?.Profile?.bio
                            &&
                            <div id="players_bio">
                                {playerWithProfileGamesFollowers?.Profile?.bio}
                            </div>
                            ||
                            <div id="players_bio_falsey">
                                {playerWithProfileGamesFollowers?.name} has no information about themselves to share...
                            </div>
                        }
                    </div>
                    <div id="players_timezone_containter"
                        className="ml-4 mb-10"
                    >
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">{player?.name}'s Timezone</h2>
                        {playerWithProfileGamesFollowers?.Profile?.timezone
                            &&
                            <div id="players_timezone">
                                {playerWithProfileGamesFollowers?.Profile?.timezone}
                            </div>
                            ||
                            <div id="players_timezone_falsey">
                                {playerWithProfileGamesFollowers?.name} has no timezone set...
                            </div>
                        }
                    </div>
                    <div id="all_games" className="shadow-md p-2 ">
                        <h2 className="font-semibold text-blue-900 mb-1 md:mb-2">All of {player?.name}'s games</h2>
                        <p className="flex gap-1">
                            {playerWithProfileGamesFollowers?.games
                                &&
                                playerWithProfileGamesFollowers?.games.map(g => (
                                    <Link
                                        key={g.id}
                                        href={`/game/${g.id}`}
                                        className="hover:italic text-purple-700"
                                    >
                                        {g.name},
                                    </Link>
                                ))
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 