import prisma from '@/lib/db';
import { test as setup } from '@playwright/test';
import { automation_users } from '../prisma/automation_test_users';

setup('delete follow relations', async ({ }) => {

    // delete test users except permanent from clerk
    try {
        await prisma.user.deleteMany({
            where: {
                email: { endsWith: 'gbtest.com' },
            }
        })
        console.log("Success deleting users during global tear down Playwright")
    } catch (error) {
        console.log("Failed to deleting users during global tear down Playwright:", error)
    }


    // remove games onto permanent test user
    try {
        await prisma.user.update({
            where: { email: automation_users[0].email },
            data: {
                games: {
                    set: [],
                }
            },
        })
    } catch (error) {
        console.log("Fail removing games from permanent test user in playwright global setup:", error)
    }

});

// Test user 1 - sally, test1@test.com(password), user_2ZtEUw0s5N5aRXYNV27MWPKbLUB
// Test user 2 - jimmytool2, test2@test.com(password), user_2ZtF7sj1agf3O5bCSciz511eRzj
// Test user 3 - kingdon7, test3@test.com(password), user_2ZtFP1wPGdH5oITfJTmrU9OKA2w