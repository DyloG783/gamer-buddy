import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import prisma from "./db";

// who user follows, but they don't follow back
export async function getFollowing() {

    const { userId } = auth();

    const connections = await prisma.follows.findMany({
        where: {
            followedById: userId!, // the people I'm following
            NOT: {
                following: {
                    followedBy: { some: { followingId: userId! } }
                },
            },
        },
    });

    revalidatePath('/');
    return (connections)
}

// returns followers of the user, if the user is not following them (pending connection request to the user)
export async function getUsersConnectionRequests() {

    const { userId } = auth();

    const connections = await prisma.follows.findMany({
        where: {
            followingId: userId!, // people who fol me
            NOT: { // not
                followedBy: { // when I 
                    following: { some: { followedById: userId! } } // follow them
                }
            }
        },
    });

    revalidatePath('/');
    return connections;
}

// returns relations when both users have connected with eachother (essentially accepted connections request)
export async function getUsersConnections() {

    const { userId } = auth();

    const connections = await prisma.follows.findMany({
        where: {
            followingId: userId!,
            AND: {
                followedBy: {
                    following: { some: { followedById: userId! } }
                }
            }
        },
    });

    revalidatePath('/');
    return connections;
}

// check game exists (for when user types random strings into urls) and returns it if true
export async function checkGameExistsAndReturn(gameId: number) {

    if (Number.isNaN(gameId)) {
        console.log("Game Check: NaN")
        return null;
    }

    try {
        const game = await prisma.game.findUnique({ where: { id: gameId }, include: { genres: true, modes: true, platforms: true } })
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
                games: {
                    include: { genres: true, modes: true, platforms: true }
                }
            }
        })
        return user;
    } catch (error) {
        console.log("User Check: try/catch fail retrieving user")
        return null;
    }
} 