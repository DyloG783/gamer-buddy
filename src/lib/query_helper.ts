import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";
import prisma from "./db";

// who user follows, but they don't follow back
export async function getFollowing() {

    const user = await currentUser();

    try {
        const connections = await prisma.follows.findMany({
            where: {
                followedByEmail: user?.emailAddresses[0].emailAddress, // the people I'm following
                NOT: {
                    following: {
                        followedBy: { some: { followingEmail: user?.emailAddresses[0].emailAddress } }
                    },
                },
            },
        });

        revalidatePath('/');
        return (connections);
    } catch (error) {
        console.log("Failed to find the users which this user follows in 'query_helper': ", error)
    }

    return (null)
}

// returns followers of the user, if the user is not following them (pending connection request to the user)
export async function getUsersConnectionRequests() {

    const user = await currentUser();

    try {
        const connections = await prisma.follows.findMany({
            where: {
                followingEmail: user?.emailAddresses[0].emailAddress, // people who fol me
                NOT: { // not
                    followedBy: { // when I 
                        following: { some: { followedByEmail: user?.emailAddresses[0].emailAddress } } // follow them
                    }
                }
            },
        });

        revalidatePath('/');
        return connections;

    } catch (error) {
        console.log("Failed to find 'following' users of this user in 'query_helper': ", error)
    }

    return (null)
}

// returns relations when both users have connected with eachother (essentially accepted connections request)
export async function getUsersConnections() {

    const user = await currentUser();

    try {
        const connections = await prisma.follows.findMany({
            where: {
                followingEmail: user?.emailAddresses[0].emailAddress,
                AND: {
                    followedBy: {
                        following: { some: { followedByEmail: user?.emailAddresses[0].emailAddress } }
                    }
                }
            },
        });

        revalidatePath('/');
        return connections;

    } catch (error) {
        console.log("Failed to find 'connected' users of this user in 'query_helper': ", error)
    }

    return (null)
}

// check game exists (for when user types random strings into urls) and returns it if true
export async function checkGameExistsAndReturn(gameId: number) {

    if (Number.isNaN(gameId)) {
        console.log("Game Check: NaN")
        return null;
    }

    try {
        const game = await prisma.game.findUnique({ where: { id: gameId } })
        return game;
    } catch (error) {
        console.log("Game Check: try/catch fail retrieving game")
        return null;
    }
}

// check user exists (for when user types random strings into urls) and returns it if true
export async function checkUserExistsAndReturn(userId: string) {

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }, include: {
                games: true
            }
        })
        return user;
    } catch (error) {
        console.log("User Check: try/catch fail retrieving user")
        return null;
    }
} 