import prisma from '@/lib/db';
import { getUserId } from '@/lib/query_helper';
import { test_users } from '../../prisma/test_users';


// real users must login first to connect fake users with
async function user_Relations() { 

    const user = await prisma.user.findUniqueOrThrow({ where: {email: "dylan.m.c.digby@gmail.com" } })
    const testUser1 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[0].email } })
    const testUser2 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[1].email } })
    // const testUser3 = await getUserId(test_users[2].email) no games
    const testUser4 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[3].email } })
    const testUser5 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[4].email } })
    const testUser6 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[5].email } })
    const testUser7 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[6].email } })
    const testUser8 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[7].email } })
    const testUser9 = await prisma.user.findUniqueOrThrow({ where: { email: test_users[8].email } })

    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: testUser1.id,
                    followedByName: testUser1.name!,
                    followingId: user.id,
                    followingName: user.name!,
                    gameId: 83563,
                    gameName: "NeptuneGL"
                },  // 1
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser1.id,
                    followingName: testUser1.name!,
                    gameId: 83563,
                    gameName: "NeptuneGL"
                },  
                {
                    followedById: testUser2.id,
                    followedByName: testUser2.name!,
                    followingId: user.id,
                    followingName: user.name!,
                    gameId: 81753,
                    gameName: "AfterTheDawn"
                },  // 2
                // {
                //     followedById: user.id,
                //     followedByName: user.name!,
                //     followingId: testUser4.id,
                //     followingName: testUser4.name!,
                //     gameId: 262659,
                //     gameName: "ZeroSpace"
                // }, // 4
                {
                    followedById: testUser4.id,
                    followedByName: testUser4.name!,
                    followingId: user.id,
                    followingName: user.name!,
                    gameId: 83563,
                    gameName: "NeptuneGL"
                },
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser4.id,
                    followingName: testUser4.name!,
                    gameId: 83563,
                    gameName: "NeptuneGL"
                },
                {
                    followedById: testUser5.id,
                    followedByName: testUser5.name!,
                    followingId: user.id,
                    followingName: user.name!,
                    gameId: 262659,
                    gameName: "ZeroSpace"
                }, // 5
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser5.id,
                    followingName: testUser5.name!,
                    gameId: 262659,
                    gameName: "ZeroSpace"
                },
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser6.id,
                    followingName: testUser6.name!,
                    gameId: 81753,
                    gameName: "AfterTheDawn"
                }, //6
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser7.id,
                    followingName: testUser7.name!,
                    gameId: 211573,
                    gameName: "Zix"
                }, //7
                {
                    followedById: user.id,
                    followedByName: user.name!,
                    followingId: testUser8.id,
                    followingName: testUser8.name!,
                    gameId: 211573,
                    gameName: "Zix"
                }, //8
                {
                    followedById: testUser9.id,
                    followedByName: testUser9.name!,
                    followingId: user.id,
                    followingName: user.name!,
                    gameId: 211573,
                    gameName: "Zix"
                }, //9
            ],
            skipDuplicates: true,
        })
        
    } catch (error) {
        console.log("Something went wrong relating User following relations with test users:", error)
    }
}

user_Relations()