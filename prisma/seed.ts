import prisma from "@/lib/db";
import { test_users } from "./test_users";

async function main() {
    for (const user of test_users) {
        try {
            await prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    email: user.email,
                    id: user.email,
                    userName: user.name,
                    bio: user.bio,
                    timezone: user.timezone,
                    games: { connect: user.games?.map(g => ({ id: g })) }
                }
            })
        } catch (error) {
            console.log("Error seeding filler users into db: ", error)
        }
    }

    // create follow realations between test users
    // trusting my Clerk user ID doesn't change as I shouldn't be moving to prod for a while if ever
    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: "user_2ZqO4PFqv2bK0A21MfqI5BS8uYN",
                    followedByEmail: "dylan.m.c.digby@gmail.com",
                    followedByUName: "Dios",
                    followingId: test_users[0].email,
                    followingUName: test_users[0].name,
                    followingEmail: test_users[0].email
                },
                {
                    followedById: "user_2ZqO4PFqv2bK0A21MfqI5BS8uYN",
                    followedByEmail: "dylan.m.c.digby@gmail.com",
                    followedByUName: "Dios",
                    followingId: test_users[2].email,
                    followingUName: test_users[2].name,
                    followingEmail: test_users[2].email
                },
                {
                    followedById: test_users[2].email,
                    followedByEmail: test_users[2].email,
                    followedByUName: test_users[2].name,
                    followingId: "user_2ZqO4PFqv2bK0A21MfqI5BS8uYN",
                    followingUName: "Dios",
                    followingEmail: "dylan.m.c.digby@gmail.com"
                },
                {
                    followedById: test_users[1].email,
                    followedByEmail: test_users[1].email,
                    followedByUName: test_users[1].name,
                    followingId: "user_2ZqO4PFqv2bK0A21MfqI5BS8uYN",
                    followingUName: "Dios",
                    followingEmail: "dylan.m.c.digby@gmail.com"
                },
            ]
        })

        console.log("Success setting up test connections in playwright global setup!")

    } catch (error) {
        console.log("Fail setting up test connections in playwright global setup:", error)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
