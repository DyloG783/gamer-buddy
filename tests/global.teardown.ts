import prisma from '@/lib/db';
import { test as setup, expect } from '@playwright/test';
import { test_users } from '../prisma/test_users';

setup('delete follow relations', async ({ }) => {

    // try {
    //     await prisma.follows.delete({
    //         where: {
    //             followingId_followedById: {
    //                 followedById: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB", // this is the user who initiates following. 
    //                 followingId: "user_2ZtF7sj1agf3O5bCSciz511eRzj" // this is the user who is beingfollowed. 
    //             },

    //         }
    //     })

    //     await prisma.follows.delete({
    //         where: {
    //             followingId_followedById: {
    //                 followedById: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB", // this is the user who initiates following. 
    //                 followingId: "user_2ZtFP1wPGdH5oITfJTmrU9OKA2w" // this is the user who is beingfollowed. 
    //             },

    //         }
    //     })

    //     await prisma.follows.delete({
    //         where: {
    //             followingId_followedById: {
    //                 followedById: "user_2ZtFP1wPGdH5oITfJTmrU9OKA2w", // this is the user who initiates following. 
    //                 followingId: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB" // this is the user who is beingfollowed. 
    //             },

    //         }
    //     })

    //     await prisma.follows.delete({
    //         where: {
    //             followingId_followedById: {
    //                 followedById: "user_2ZtFu6LzPOsaLVmDiZeac9r2VRU", // this is the user who initiates following. 
    //                 followingId: "user_2ZtEUw0s5N5aRXYNV27MWPKbLUB" // this is the user who is beingfollowed. 
    //             },

    //         }
    //     })


    //     console.log("Success deleting following relations during global tear down Playwright")

    // } catch (error) {
    //     console.log("Failed to delete following relations during global tear down Playwright:", error)
    // }

});

// Test user 1 - sally, test1@test.com(password), user_2ZtEUw0s5N5aRXYNV27MWPKbLUB
// Test user 2 - jimmytool2, test2@test.com(password), user_2ZtF7sj1agf3O5bCSciz511eRzj
// Test user 3 - kingdon7, test3@test.com(password), user_2ZtFP1wPGdH5oITfJTmrU9OKA2w