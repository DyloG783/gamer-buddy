import prisma from '@/lib/db';
// import { getUserId } from '@/lib/query_helper';
import { test_users } from '../../prisma/test_users';


// real users must login first to connect fake users with
async function user_Relations() {

    const user = await prisma.user!.findFirstOrThrow({ where: { email: "dylan.m.c.digby@gmail.com" } })
    const testUser1 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[0].email } })
    const testUser2 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[1].email } })
    // const testUser3 = await getUserId(test_users[2].email) no games
    const testUser4 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[3].email } })
    const testUser5 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[4].email } })
    const testUser6 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[5].email } })
    const testUser7 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[6].email } })
    const testUser8 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[7].email } })
    const testUser9 = await prisma.user!.findFirstOrThrow({ where: { email: test_users[8].email } })

    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: testUser1!.id,
                    followedByUName: testUser1!.userName!,
                    followingId: user!.id,
                    followingUName: user!.userName!
                },  // 1
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser1.id,
                    followingUName: testUser1.userName!
                },
                {
                    followedById: testUser2.id,
                    followedByUName: testUser2.userName!,
                    followingId: user!.id,
                    followingUName: user!.userName!
                },  // 2
                // {
                //     followedById: user!.id,
                //     followedByUName: user!.userName!,
                //     followingId: testUser4.id,
                //     followingUName: testUser4.userName!,
                //     gameId: 262659,
                //     gameName: "ZeroSpace"
                // }, // 4
                {
                    followedById: testUser4.id,
                    followedByUName: testUser4.userName!,
                    followingId: user!.id,
                    followingUName: user!.userName!
                },
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser4.id,
                    followingUName: testUser4.userName!
                },
                {
                    followedById: testUser5.id,
                    followedByUName: testUser5.userName!,
                    followingId: user!.id,
                    followingUName: user!.userName!
                }, // 5
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser5.id,
                    followingUName: testUser5.userName!
                },
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser6!.id,
                    followingUName: testUser6!.userName!
                }, //6
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser7!.id,
                    followingUName: testUser7!.userName!
                }, //7
                {
                    followedById: user!.id,
                    followedByUName: user!.userName!,
                    followingId: testUser8!.id,
                    followingUName: testUser8!.userName!
                }, //8
                {
                    followedById: testUser9!.id,
                    followedByUName: testUser9!.userName!,
                    followingId: user!.id,
                    followingUName: user!.userName!
                }, //9
            ],
            skipDuplicates: true,
        })
        console.log("Relating User following relations with test users successful!")
    } catch (error) {
        console.log("Something went wrong relating User following relations with test users:", error)
    }
}

user_Relations()