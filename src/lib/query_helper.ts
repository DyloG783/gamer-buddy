import prisma from "./db";

type IFollowing = {
    followedById: string;
    followingId: string;
    gameId: number;
}[]


export async function getUsersConnectionInfo(userEmail: string) { 

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
    
    const requests: IFollowing = [];

    for (let fol = 0; fol < connections.following.length; fol++) {

        let found = false;
        for (let by = 0; by < connections.followedBy.length; by++) {
            if (connections.following[fol].followedById === connections.followedBy[by].followingId) { 
                found = true
            }
        }

        if (!found) { 
            requests.push(connections.following[fol])
        }
    }

    // const req = userAndConnections.following.map(fol => {
    //     if (userAndConnections.followedBy.find((by) => (fol.followedById != by.followingId))) {
    //         requests.push()
    //     }
    // })

    // // the people the user is following
    // const relations = await prisma.follows.findMany({
    //     where: {
    //         followedById: userAndConnections?.id,
    //     }
    // })

    // // still not working...
    // const requests = userAndConnections?.following.filter(fol => (
    //     relations.some(rel => (
    //         rel.followingId != fol.followedById
    //     )) 
    // ))!

    // this works for findingthe connection!?!?!?
    // const requests = connections?.following.filter(fol => (
    //     connections.followedBy.some(by => (
    //         by.followingId != fol.followedById
    //     ))
    // ))!

    // // this works for findingthe connection!?!?!?
    // const requests = connections?.following.filter(fol => (
    //     connections.followedBy.map(by => (
    //         by.followingId).includes(fol.followedById)
    //     )
    // ))!

    return requests;
}

 