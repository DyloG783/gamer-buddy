import prisma from "@/lib/db";
import PlayerActionBar from "./components/PlayerActionBar";
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import { UserNotExist } from "@/lib/errors";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import { auth } from "@clerk/nextjs";

export default async function Player({ params }: { params: { playerId: string } }) {

    const playerId = params.playerId // this refeers to the other player the user wants to connect with
    const { userId } = auth();

    // other player this user wants to connect with
    const playerWithGames = await checkUserExistsAndReturn(playerId);
    if (!playerWithGames) {
        return <UserNotExist />
    }

    // see whether we already follow this player
    const relationFromUser = await prisma.follows.findUnique({
        where: {
            followingId_followedById: {
                followedById: userId!,
                followingId: playerWithGames.id
            }
        }
    })

    // ensure users are connected to eachother
    let usersAreConnected;
    if (relationFromUser) {
        usersAreConnected = await prisma.follows.findUnique({
            where: {
                followingId_followedById: {
                    followedById: playerWithGames.id,
                    followingId: userId!
                }
            }
        })
    }

    return (
        <div className="flex flex-col h-full">
            <div id="connect_with_player_container"
                className="grow p-4 md:p-20 bg-slate-300"
            >
                <div id="player_action_bar_container">
                    {userId
                        &&
                        <PlayerActionBar player={playerWithGames} alreadyExists={relationFromUser !== null} usersAreConnected={usersAreConnected !== null} />
                        ||
                        <p>Sign in to connect with player</p>
                    }
                    <h1 className="font-semibold text-blue-700 text-xl md:text-4xl tracking-wider mb-6 md:mb-20">{playerWithGames?.userName}'s Profile</h1>
                    <div id="players_bio_container"
                        className="ml-4 md:ml-10 mb-4 md:mb-10 ">
                        <h2 className="font-semibold text-blue-600 mb-1 md:mb-2 text-lg md:text-xl tracking-wide">About {playerWithGames?.userName}</h2>
                        {playerWithGames?.bio
                            &&
                            <div id="players_bio">
                                {playerWithGames?.bio}
                            </div>
                            ||
                            <div id="players_bio_falsey">
                                {playerWithGames?.userName} has no information about themselves to share...
                            </div>
                        }
                    </div>
                    <div id="players_timezone_containter"
                        className="ml-4 md:ml-10 mb-4 md:mb-10"
                    >
                        <h2 className="font-semibold text-blue-600 mb-1 md:mb-2 text-lg md:text-xl tracking-wide">{playerWithGames?.userName}'s Timezone</h2>
                        {playerWithGames?.timezone
                            &&
                            <div id="players_timezone">
                                {playerWithGames?.timezone}
                            </div>
                            ||
                            <div id="players_timezone_falsey">
                                {playerWithGames?.userName} has no timezone set...
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div id="all_games" className="p-4 md:p-20 bg-slate-200">
                <h1 className="font-semibold text-blue-900  mb-4 md:mb-10  tracking-wider text-xl md:text-2xl">All of {playerWithGames?.userName}'s games</h1>
                <div className="ml-4 md:ml-10">
                    {playerWithGames?.games
                        &&
                        <PaginatedGames games={playerWithGames.games} itemsPerPage={3} />
                    }
                </div>
            </div>
        </div>
    )
} 