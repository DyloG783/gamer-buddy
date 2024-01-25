import prisma from "@/lib/db";
import { addUser, removeUser } from "@/lib/actions"
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import { UserNotExist } from "@/lib/errors";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import { currentUser } from "@clerk/nextjs";
import { SubmitButton } from "@/app/components/SubmitButton";
import { RemoveButton } from "@/app/components/RemoveButton";
import { LinkButton } from "@/app/components/LinkButton";

// 30 seconds auto update for all clients
export const dynamic = 'force-dynamic';

export default async function ViewPlayer({ params }: { params: { playerId: string } }) {

    const playerId = params.playerId // this refeers to the other player the user wants to connect with
    const user = await currentUser();

    // other player this user wants to connect with
    const player = await checkUserExistsAndReturn(playerId);
    if (!player || !user) {
        return <UserNotExist />
    }

    // see whether we already follow this player
    const weFollowThisPlayer = await prisma.follows.findUnique({
        where: {
            followingEmail_followedByEmail: {
                followedByEmail: user?.emailAddresses[0].emailAddress!,
                followingEmail: player.email
            }
        }
    })

    // ensure users are connected to eachother by ensureing they follow us if we follow them
    let usersAreConnected;
    if (weFollowThisPlayer) {
        usersAreConnected = await prisma.follows.findUnique({
            where: {
                followingEmail_followedByEmail: {
                    followedByEmail: player.email,
                    followingEmail: user?.emailAddresses[0].emailAddress!
                }
            }
        })
    }

    // adds playerId to server action
    const addActionWithPlayer = addUser.bind(null, player)
    const removeActionWithPlayer = removeUser.bind(null, player)

    return (
        <div className="flex flex-col justify-between full-height-minus-nav background-color">
            <div id="connect_with_player_container"
                className=" p-4 shadow-sm"
            >
                <div id="player_profile_container">

                    <div id="player_action_bar_container"
                        className="w-full mb-10 flex justify-end gap-2"
                    >
                        {usersAreConnected
                            &&
                            <>
                                <form action={removeActionWithPlayer}>
                                    <RemoveButton text={`Remove player`} />
                                </form>
                                <LinkButton link={`/connections/${user.id}/${player.id}`} text="Chat" />
                            </>
                        }
                        {!weFollowThisPlayer
                            &&
                            <form action={addActionWithPlayer}>
                                <SubmitButton text={`Add player`} />
                            </form>
                        }
                        {!usersAreConnected && weFollowThisPlayer
                            &&
                            <form action={removeActionWithPlayer}>
                                <RemoveButton text={`Remove player`} />
                            </form>
                        }
                    </div>
                    <div className="pl-4 md:pl-20">
                        <h1 className="font-semibold blue-font text-xl md:text-4xl tracking-wider mb-10 md:mb-20">
                            {player?.userName}&apos;s Profile
                        </h1>
                        <div id="players_bio_container"
                            className="ml-4 md:ml-10 mb-4 md:mb-10 ">
                            <h2 className="font-semibold blue-font mb-4 md:mb-6 text-lg md:text-xl tracking-wide">About {player?.userName}</h2>
                            {player?.bio
                                &&
                                <div id="players_bio" className={'ml-2'}>
                                    {player?.bio}
                                </div>
                                ||
                                <div id="players_bio_falsey" className={'ml-2'}>
                                    {player?.userName} has no information about themselves to share...
                                </div>
                            }
                        </div>
                        <div id="players_timezone_containter"
                            className="ml-4 md:ml-10 mb-4 md:mb-10"
                        >
                            <h2 className="font-semibold blue-font mb-4 md:mb-6 text-lg md:text-xl tracking-wide">{player?.userName}&apos;s Timezone</h2>
                            {player?.timezone
                                &&
                                <div id="players_timezone" className={'ml-2'}>
                                    {player?.timezone}
                                </div>
                                ||
                                <div id="players_timezone_falsey" className={'ml-2'}>
                                    {player?.userName} has no timezone set...
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="all_games" className="pl-4 md:pl-20">
                <h1 className="font-semibold blue-font mt-3 mb-4 md:mb-16 md:mt-0 tracking-wider 
                text-xl md:text-2xl"
                >
                    All of {player?.userName}&apos;s games
                </h1>
                <div className="ml-4 md:ml-10">
                    {player?.games.length > 0
                        && <PaginatedGames games={player.games} itemsPerPage={3} />
                        || <p className="tracking-wide">{player?.userName} has no games saved...</p>
                    }
                </div>
            </div>
        </div>
    )
} 