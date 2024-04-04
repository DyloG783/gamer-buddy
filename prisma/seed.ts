import prisma from "@/lib/db";
import { test_users } from "./test_users";
import combineUniqueIds from "@/lib/hashIds";

/**
* This script adds users, their games, and connection relations between test users
*/
async function main() {


    /**
     * Delete test users and accosicated data to resfesh data on prod deploy for demo purposes
     */
    try {
        await prisma.user.deleteMany({
            where: {
                email: {
                    contains: '@test.com',
                },
            },
        });
    } catch (error) {
        console.log("Error deleting test users from db: ", error);
    };
    console.log("Success deleting test users in prisma seed!");

    /**
     * Delete private chat room data to resfesh data on prod deploy for demo purposes
     */
    try {
        await prisma.chatPrivateRoom.deleteMany({});
    } catch (error) {
        console.log("Error deleting private chat rooms from db: ", error);
    };
    console.log("Success deleting private chat rooms from prisma seed!");

    /**
     * Add test users and relate games
     */
    for (const user of test_users) {
        try {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    email: user.email,
                    id: user.id!,
                    userName: user.name,
                    bio: user.bio,
                    timezone: user.timezone,
                    games: { connect: user.games?.map(g => ({ id: g })) }
                }
            });
        } catch (error) {
            console.log("Error seeding filler users into db: ", error);
        };
    };
    console.log("Success seeding filler users into db in prisma seed!");

    /**
     * Create follow relations (connection) between test users
     */
    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: process.env.DEMO_USER_ID!,
                    followedByEmail: "demo@test.com",
                    followedByUName: "demo1",
                    followingId: test_users[0].id!,
                    followingUName: test_users[0].name,
                    followingEmail: test_users[0].email
                },
                {
                    followedById: process.env.DEMO_USER_ID!,
                    followedByEmail: "demo@test.com",
                    followedByUName: "demo1",
                    followingId: test_users[2].id!,
                    followingUName: test_users[2].name,
                    followingEmail: test_users[2].email
                },
                {
                    followedById: test_users[2].id!,
                    followedByEmail: test_users[2].email,
                    followedByUName: test_users[2].name,
                    followingId: process.env.DEMO_USER_ID!,
                    followingUName: "demo1",
                    followingEmail: "demo@test.com"
                },
                {
                    followedById: test_users[1].id!,
                    followedByEmail: test_users[1].email,
                    followedByUName: test_users[1].name,
                    followingId: process.env.DEMO_USER_ID!,
                    followingUName: "demo1",
                    followingEmail: "demo@test.com"
                },
                {
                    followedById: test_users[3].id!,
                    followedByEmail: test_users[3].email,
                    followedByUName: test_users[3].name,
                    followingId: process.env.DEMO_USER_ID!,
                    followingUName: "demo1",
                    followingEmail: "demo@test.com"
                },
                {
                    followedById: test_users[4].id!,
                    followedByEmail: test_users[4].email,
                    followedByUName: test_users[4].name,
                    followingId: process.env.DEMO_USER_ID!,
                    followingUName: "demo1",
                    followingEmail: "demo@test.com"
                },
                {
                    followedById: process.env.DEMO_USER_ID!,
                    followedByEmail: "demo@test.com",
                    followedByUName: "demo1",
                    followingId: test_users[5].id!,
                    followingUName: test_users[5].name,
                    followingEmail: test_users[5].email
                },
                {
                    followedById: process.env.DEMO_USER_ID!,
                    followedByEmail: "demo@test.com",
                    followedByUName: "demo1",
                    followingId: test_users[6].id!,
                    followingUName: test_users[6].name,
                    followingEmail: test_users[6].email
                },
                {
                    followedById: test_users[6].id!,
                    followedByEmail: test_users[6].email,
                    followedByUName: test_users[6].name,
                    followingId: process.env.DEMO_USER_ID!,
                    followingUName: "demo1",
                    followingEmail: "demo@test.com"
                }
            ]
        });

        console.log("Success setting up test connections in prisma seed!");

    } catch (error) {
        console.log("Fail setting up test connections in prisma seed:", error);
    };

    /**
     * Create conversations and unread messages between test users
     */

    // user[2] is connected with demo user
    const privateChatId_u2 = String(combineUniqueIds(test_users[2].id!, process.env.DEMO_USER_ID!));

    try {
        await prisma.chatPrivateRoom.createMany({
            data: [
                {
                    id: privateChatId_u2,
                    user1Email: 'demo@test.com',
                    user2Email: test_users[2].email,
                },
            ]
        });
    } catch (error) {
        console.log("Fail setting up private chat room in prisma seed:", error);
    }
    console.log("Success setting up private chat room in prisma seed!");

    try {
        await prisma.privateMessage.createMany({
            data: [
                {
                    message: "Heya, do you want to chat on Steam and start a game?",
                    chatPrivateRoomId: privateChatId_u2,
                    receiverId: process.env.DEMO_USER_ID!,
                    senderId: test_users[2].id!,
                },
            ]
        });
    } catch (error) {
        console.log("Fail setting up test conversations in prisma seed:", error);
    }
    console.log("Success setting up test conversations in prisma seed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
