import prisma from "@/lib/db";
import { test_users } from "./test_users";

/**
* This script adds users, their games, and connection relations between test users
*/
async function main() {

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
                    id: user.id,
                    userName: user.name,
                    bio: user.bio,
                    timezone: user.timezone,
                    games: { connect: user.games?.map(g => ({ id: g })) }
                }
            })

        } catch (error) {
            console.log("Error seeding filler users into db: ", error);
        }
    }

    console.log("Success seeding filler users into db in prisma seed!");

    /**
     * Create follow (connection) relations between test users
     */
    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followedByEmail: "demo@demo.test",
                    followedByUName: "Demo",
                    followingId: test_users[0].id,
                    followingUName: test_users[0].name,
                    followingEmail: test_users[0].email
                },
                {
                    followedById: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followedByEmail: "demo@demo.test",
                    followedByUName: "Demo",
                    followingId: test_users[2].id,
                    followingUName: test_users[2].name,
                    followingEmail: test_users[2].email
                },
                {
                    followedById: test_users[2].id,
                    followedByEmail: test_users[2].email,
                    followedByUName: test_users[2].name,
                    followingId: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followingUName: "Demo",
                    followingEmail: "demo@demo.test"
                },
                {
                    followedById: test_users[1].id,
                    followedByEmail: test_users[1].email,
                    followedByUName: test_users[1].name,
                    followingId: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followingUName: "Demo",
                    followingEmail: "demo@demo.test"
                },
                {
                    followedById: test_users[3].id,
                    followedByEmail: test_users[3].email,
                    followedByUName: test_users[3].name,
                    followingId: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followingUName: "Demo",
                    followingEmail: "demo@demo.test"
                },
                {
                    followedById: test_users[4].id,
                    followedByEmail: test_users[4].email,
                    followedByUName: test_users[4].name,
                    followingId: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followingUName: "Demo",
                    followingEmail: "demo@demo.test"
                },
                {
                    followedById: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followedByEmail: "demo@demo.test",
                    followedByUName: "Demo",
                    followingId: test_users[5].id,
                    followingUName: test_users[5].name,
                    followingEmail: test_users[5].email
                },
                {
                    followedById: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followedByEmail: "demo@demo.test",
                    followedByUName: "Demo",
                    followingId: test_users[6].id,
                    followingUName: test_users[6].name,
                    followingEmail: test_users[6].email
                },
                {
                    followedById: test_users[6].id,
                    followedByEmail: test_users[6].email,
                    followedByUName: test_users[6].name,
                    followingId: "user_2ea8umy8tA8uiqdqYuilBbcZCye",
                    followingUName: "Demo",
                    followingEmail: "demo@demo.test"
                }
            ]
        })

        console.log("Success setting up test connections in prisma seed!");

    } catch (error) {
        console.log("Fail setting up test connections in prisma seed:", error);
    };
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
