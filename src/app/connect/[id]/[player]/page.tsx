import prisma from "@/lib/db"
import SubNavigation from "../components/SubNavigation"
import PlayerActionBar from "./components/PlayerActionBar"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import { getServerSession } from "next-auth"
import { checkGameExistsAndReturn, checkUserExistsAndReturn } from "@/lib/query_helper"
import { GameNotExist, UserNotExist } from "@/lib/errors"
import PaginatedGames from "@/app/games/components/PaginatedGames"

export default async function Player({ params }: { params: { player: string, id: number } }) {

    const gameId = Number(params.id) // id of the game
    const playerId = params.player // this refeers to the other player the user wants to connect with

    const game = await checkGameExistsAndReturn(gameId)
    if (!game) {
        return <GameNotExist />
    }

    // other player this user wants to connect with
    const playerWithProfileAndGames = await checkUserExistsAndReturn(playerId);
    if (!playerWithProfileAndGames) {
        return <UserNotExist />
    }

    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUniqueOrThrow({
        where: { email: session?.user?.email! }
    })

    // see whether we already follow this player
    const relation = await prisma.follows.findUnique({
        where: {
            followingId_followedById: {
                followedById: user.id,
                followingId: playerWithProfileAndGames.id
            }
        }
    })

    return (
        <div id="connect_with_player_container"
            className="w-full"
        >
            <SubNavigation routeId={gameId} routeLabel={`${game?.name} Connect Forum`} routeName="connect" />
            <div className="grow flex justify-around my-1 md:my-10">
                <div className="md:w-3/4 shadow-md p-4 md:p-10">
                    {session
                        &&
                        <PlayerActionBar user={user} player={playerWithProfileAndGames} alreadyExists={relation !== null} game={game} />
                        ||
                        <p>Sign in to connect with player</p>
                    }
                    <h1 className="font-semibold text-blue-700 md:text-xl mb-1 md:mb-4">{playerWithProfileAndGames?.name}'s Profile</h1>
                    <p className="italic text-sm md:text-base mb-10">
                        You both play {game?.name} so click the 'Connect' button to send a connection request!
                    </p>
                    <div id="players_bio_container"
                        className="ml-4 mb-10">
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">About {playerWithProfileAndGames?.name}</h2>
                        {playerWithProfileAndGames?.Profile?.bio
                            &&
                            <div id="players_bio">
                                {playerWithProfileAndGames?.Profile?.bio}
                            </div>
                            ||
                            <div id="players_bio_falsey">
                                {playerWithProfileAndGames?.name} has no information about themselves to share...
                            </div>
                        }
                    </div>
                    <div id="players_timezone_containter"
                        className="ml-4 mb-10"
                    >
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">{playerWithProfileAndGames?.name}'s Timezone</h2>
                        {playerWithProfileAndGames?.Profile?.timezone
                            &&
                            <div id="players_timezone">
                                {playerWithProfileAndGames?.Profile?.timezone}
                            </div>
                            ||
                            <div id="players_timezone_falsey">
                                {playerWithProfileAndGames?.name} has no timezone set...
                            </div>
                        }
                    </div>
                    <div id="all_games" className="shadow-md p-2 ">
                        <h2 className="font-semibold text-blue-900 mb-1 md:mb-2">All of {playerWithProfileAndGames?.name}'s games</h2>
                        <div className="flex gap-1">
                            {playerWithProfileAndGames?.games
                                &&
                                <PaginatedGames games={playerWithProfileAndGames.games} itemsPerPage={3} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 