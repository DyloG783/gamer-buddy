import prisma from "@/lib/db";
import PlayerActionBar from "./components/PlayerActionBar";
import { checkGameExistsAndReturn, checkUserExistsAndReturn } from "@/lib/query_helper";
import { GameNotExist, UserNotExist } from "@/lib/errors";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import { auth } from "@clerk/nextjs";
import Chat from "./components/Chat";

const dynamic = 'force-dynamic';
const revalidate = 0;

export default async function Player({ params }: { params: { player: string, id: number } }) {

    const gameId = Number(params.id) // id of the game
    const playerId = params.player // this refeers to the other player the user wants to connect with

    const { userId } = auth();

    const game = await checkGameExistsAndReturn(gameId)
    if (!game) {
        return <GameNotExist />
    }

    // other player this user wants to connect with
    const playerWithGames = await checkUserExistsAndReturn(playerId);
    if (!playerWithGames) {
        return <UserNotExist />
    }

    // get all messages between the user and the player
    const messages = await prisma.privateMessage.findMany({
        where: {
            OR: [
                {
                    sentById: { contains: userId! },
                    recievedById: { contains: playerId },
                },
                {
                    sentById: { contains: playerId },
                    recievedById: { contains: userId! },
                },
            ]
        },
        include: {
            sentBy: { select: { userName: true } },
            recievedBy: { select: { userName: true } }
        },
        orderBy: { createdAt: "desc" }
    })

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
        <div id="connect_with_player_container"
            className="w-3/4"
        >
            {/* <SubNavigation routeId={gameId} routeLabel={`${game?.name} Connect Forum`} routeName="connect" /> */}
            <div id="page_container" className=" flex flex-col justify-around gap-y-4 mt-2">
                {usersAreConnected &&
                    <div id="chat_container" className="shadow-md">
                        <Chat messages={messages} playerId={playerId} />
                    </div>
                }
                <div id="player_profile_container" className="shadow-md p-4 md:p-10">
                    {userId
                        &&
                        <PlayerActionBar player={playerWithGames} alreadyExists={relationFromUser !== null} game={game} />
                        ||
                        <p>Sign in to connect with player</p>
                    }
                    <h1 className="font-semibold text-blue-700 md:text-xl mb-1 md:mb-4">{playerWithGames?.userName}'s Profile</h1>
                    <p className="italic text-sm md:text-base mb-10">
                        You both play {game?.name} so click the 'Connect' button to send a connection request!
                    </p>
                    <div id="players_bio_container"
                        className="ml-4 mb-10">
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">About {playerWithGames?.userName}</h2>
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
                        className="ml-4 mb-10"
                    >
                        <h2 className="font-semibold text-blue-700 mb-1 md:mb-2">{playerWithGames?.userName}'s Timezone</h2>
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
                    <div id="all_games" className="shadow-md p-2 ">
                        <h2 className="font-semibold text-blue-900 mb-1 md:mb-2">All of {playerWithGames?.userName}'s games</h2>
                        <div className="flex gap-1">
                            {playerWithGames?.games
                                &&
                                <PaginatedGames games={playerWithGames.games} itemsPerPage={3} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 