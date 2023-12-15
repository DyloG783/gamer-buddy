import prisma from "./db";

export async function getUsersFollowingInfo(userEmail: string) { 

    const connections = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            followedBy:true,
            following: true,
        }
    })

    return (connections)
}

// returns a following relation if the user is not also following this user (pending connection)
export async function getUsersConnectionRequests(userEmail: string) { 

    const connections = await prisma.user.findUniqueOrThrow({
        where: {
            email: userEmail
        },
        select: {
            following: true,
            followedBy: true
        }
    })

    const requests = connections?.following.filter(fol => (
        !connections.followedBy.some(by => (
            by.followingId === fol.followedById
        ))
    ))

    return requests;
}

// returns "followedBy" relations when both users have connected with eachother (essentially accepted connections request)
export async function getUsersConnections(userEmail: string) { 

    const followInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: userEmail
        },
        select: {
            following: true,
            followedBy: true
        }
    })

    const connections = followInfo?.following.filter(fol => (
        followInfo.followedBy.some(by => (
            by.followingId === fol.followedById
        ))
    ))

    return connections;
}