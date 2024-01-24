import prisma from '@/lib/db';
import { test as setup } from '@playwright/test';
import { automation_users } from '../prisma/automation_test_users';

setup('create follow relations', async ({ }) => {

    // create test users
    async function createUsers() {
        for (let user of automation_users) {
            await prisma.user.upsert({
                where: {
                    email: user.email,
                },
                update: {},
                create: {
                    id: user.id,
                    email: user.email,
                    userName: user.userName,
                    bio: user.bio,
                    timezone: user.timezone,
                    games: {
                        connect: user.games?.map(g => ({ id: g })) || [],
                    }
                }
            })
        }
    }
    try {
        await createUsers()

    } catch (error) {
        console.log("Fail creating test users in playwright global setup:", error)
    }

    // push games onto permanent test user
    try {
        await prisma.user.update({
            where: { email: automation_users[0].email },
            data: {
                games: {
                    connect: automation_users[0].games?.map(g => ({ id: g })) || [],
                }
            },
        })
    } catch (error) {
        console.log("Fail adding games to permanent test user in playwright global setup:", error)
    }


    // create follow realations between test users
    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: automation_users[0].id,
                    followedByEmail: automation_users[0].email,
                    followedByUName: automation_users[0].userName,
                    followingId: automation_users[1].id,
                    followingUName: automation_users[1].userName,
                    followingEmail: automation_users[1].email
                },
                {
                    followedById: automation_users[0].id,
                    followedByEmail: automation_users[0].email,
                    followedByUName: automation_users[0].userName,
                    followingId: automation_users[3].id,
                    followingUName: automation_users[3].userName,
                    followingEmail: automation_users[3].email
                },
                {
                    followedById: automation_users[3].id,
                    followedByEmail: automation_users[3].email,
                    followedByUName: automation_users[3].userName,
                    followingId: automation_users[0].id,
                    followingUName: automation_users[0].userName,
                    followingEmail: automation_users[0].email
                },
                {
                    followedById: automation_users[2].id,
                    followedByEmail: automation_users[2].email,
                    followedByUName: automation_users[2].userName,
                    followingId: automation_users[0].id,
                    followingUName: automation_users[0].userName,
                    followingEmail: automation_users[0].email
                },
            ]
        })

        console.log("Success setting up test connections in playwright global setup!")

    } catch (error) {
        console.log("Fail setting up test connections in playwright global setup:", error)
    }
});
