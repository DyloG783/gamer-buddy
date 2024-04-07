import prisma from "@/lib/db";
import { UserIdSchema } from '@/lib/zod_schemas';
import { followUser, unFollowUser } from "@/lib/actions"
import { checkUserExistsAndReturn } from "@/lib/query_helper";
import { UserNotExist } from "@/lib/errors";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import { currentUser } from "@clerk/nextjs";
import { SubmitButton } from "@/app/components/buttons/SubmitButton";
import { RemoveButton } from "@/app/components/buttons/RemoveButton";
import { LinkButton } from "@/app/components/buttons/LinkButton";

// 30 seconds auto update for all clients
export const dynamic = 'force-dynamic';

export default async function ViewPlayer({ params }: { params: { playerId: string } }) {

    const input = UserIdSchema.safeParse(params.playerId);
    if (!input.success) return console.log("Input validation failed (zod): ", input.error.errors);

    const playerId = input.data // this refeers to the other player the user wants to connect with
    const user = await currentUser();

    // other player this user wants to connect with
    const playerWithGames = await checkUserExistsAndReturn(playerId);
    if (!playerWithGames || !user) return <UserNotExist />;

    // see whether we already follow this player
    const weFollowThisPlayer = await prisma.follows.findUnique({
        where: {
            followingEmail_followedByEmail: {
                followedByEmail: user?.emailAddresses[0].emailAddress!,
                followingEmail: playerWithGames.email
            }
        }
    })

    // ensure users are connected to eachother by ensureing they follow us if we follow them
    let usersAreConnected;
    if (weFollowThisPlayer) {
        usersAreConnected = await prisma.follows.findUnique({
            where: {
                followingEmail_followedByEmail: {
                    followedByEmail: playerWithGames.email,
                    followingEmail: user?.emailAddresses[0].emailAddress!
                }
            }
        })
    }

    // adds playerId to server action
    const addActionWithPlayer = followUser.bind(null, playerWithGames)
    const removeActionWithPlayer = unFollowUser.bind(null, playerWithGames)

    return (
        <div className="flex flex-col justify-between full-height-minus-nav bg-white dark:bg-black">
            <div id="connect_with_player_container"
                className="p-4 shadow-sm"
            >
                <div id="player_profile_container">
                    <div id="player_action_bar_container"
                        className="w-full mb-10 flex justify-evenly sm:justify-end gap-2"
                    >
                        {usersAreConnected
                            &&
                            <>
                                <form action={removeActionWithPlayer}>
                                    <RemoveButton text={`Remove player`} />
                                </form>
                                <LinkButton link={`/connections/${user.id}/${playerWithGames.id}`} text="Chat" />
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
                        <h1 className="font-semibold secondary-color-font text-xl md:text-4xl tracking-wider mb-10 md:mb-20">
                            {playerWithGames?.userName}&apos;s Profile
                        </h1>
                        <div id="players_bio_container"
                            className="ml-4 md:ml-10 mb-4 md:mb-10 ">
                            <h2 className="font-semibold secondary-color-font mb-4 md:mb-6 text-lg md:text-xl tracking-wide">About {playerWithGames?.userName}</h2>
                            {playerWithGames?.bio
                                &&
                                <div id="players_bio" className={'ml-2'}>
                                    {playerWithGames?.bio}
                                </div>
                                ||
                                <div id="players_bio_falsey" className={'ml-2'}>
                                    {playerWithGames?.userName} has no information about themselves to share...
                                </div>
                            }
                        </div>
                        <div id="players_timezone_containter"
                            className="ml-4 md:ml-10 mb-4 md:mb-10"
                        >
                            <h2 className="font-semibold secondary-color-font mb-4 md:mb-6 text-lg md:text-xl tracking-wide">{playerWithGames?.userName}&apos;s Timezone</h2>
                            {playerWithGames?.timezone
                                &&
                                <div id="players_timezone" className={'ml-2'}>
                                    {playerWithGames?.timezone}
                                </div>
                                ||
                                <div id="players_timezone_falsey" className={'ml-2'}>
                                    {playerWithGames?.userName} has no timezone set...
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div id="players_games" >
                <h1 className="font-semibold secondary-color-font tracking-wider 
                text-xl md:text-2xl p-4 md:pl-20"
                >
                    All of {playerWithGames?.userName}&apos;s games
                </h1>
                {playerWithGames?.games.length > 0
                    &&
                    <div id="all_games" className="p-4 md:pl-20 ">
                        <PaginatedGames games={playerWithGames.games} itemsPerPage={3} />
                    </div>
                    ||
                    <div id="no_games" className="flex justify-center ">
                        <p className="tracking-wide mt-20 mb-40">{playerWithGames?.userName} has no games saved...</p>
                    </div>
                }
            </div>

        </div>
    )
} 