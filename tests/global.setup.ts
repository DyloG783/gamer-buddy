import prisma from '@/lib/db';
import { test as setup, expect } from '@playwright/test';
import { test_users } from '../prisma/test_users';

setup('create follow relations', async ({ }) => {

    // create follow realations between test users
    try {
        await prisma.follows.createMany({
            data: [
                {
                    followedById: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB",
                    followedByEmail: test_users[0].email,
                    followedByUName: test_users[0].name,
                    followingId: "user_2ZtF7sj1agf3O5bCSciz511eRzj",
                    followingUName: test_users[1].name,
                    followingEmail: test_users[1].email
                },
                {
                    followedById: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB",
                    followedByEmail: test_users[0].email,
                    followedByUName: test_users[0].name,
                    followingId: "user_2ZtFP1wPGdH5oITfJTmrU9OKA2w",
                    followingUName: test_users[3].name,
                    followingEmail: test_users[3].email
                },
                {
                    followedById: "user_2ZtFP1wPGdH5oITfJTmrU9OKA2w",
                    followedByEmail: test_users[3].email,
                    followedByUName: test_users[3].name,
                    followingId: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB",
                    followingUName: test_users[0].name,
                    followingEmail: test_users[0].email
                },
                {
                    followedById: "user_2ZtFu6LzPOsaLVmDiZeac9r2VRU",
                    followedByEmail: test_users[8].email,
                    followedByUName: test_users[8].name,
                    followingId: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB",
                    followingUName: test_users[0].name,
                    followingEmail: test_users[0].email
                },
            ]
        })

        console.log("Success setting up test connections in playwright global setup!")

    } catch (error) {
        console.log("Fail setting up test connections in playwright global setup:", error)
    }

    // update user name of test user to be sure I can validate front end by their username
    try {
        await prisma.user.update({
            where: { email: "test1@test.com" },
            data: { userName: "sally" }
        })
        await prisma.user.update({
            where: { email: "test2@test.com" },
            data: { userName: "jimmytool2" }
        })
        await prisma.user.update({
            where: { email: "test4@test.com" },
            data: { userName: "kingdon7" }
        })
        await prisma.user.update({
            where: { email: "test9@test.com" },
            data: { userName: "thebestofmelbour" }
        })

        console.log("Success updating user names in golbal setup Playwright!")

    } catch (error) {
        console.log("Fail updating user names in playwright global setup:", error)
    }

    // update test game of test user to be sure I can validate front end by their username
    try {
        await prisma.user.update({
            where: { email: "test1@test.com" },
            data: {
                games: {
                    connect: { id: 83563 }
                }
            }
        })

        console.log("Success updating user with test game 'NeptuneGL' in golbal setup Playwright!")

    } catch (error) {
        console.log("Fail updating user with test game 'NeptuneGL' in playwright global setup:", error)
    }

});

// Test user 1 - sally, test1@test.com(password), user_2ZtEUw0s5N5aRXYNV27MWPKbLUB
// Test user 2 - jimmytool2, test2@test.com(password), user_2ZtF7sj1agf3O5bCSciz511eRzj
// Test user 3 - kingdon7, test3@test.com(password), user_2ZtFP1wPGdH5oITfJTmrU9OKA2w