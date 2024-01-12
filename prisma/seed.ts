// const { execSync } = require('child_process')

import prisma from "@/lib/db"
import { clerkClient } from "@clerk/nextjs/server";



// execSync("npm run getTwitchAuthToken")
// execSync("npm run saveGamesToDb")
// execSync("npm run saveGenresToDb")
// execSync("npm run saveModesToDb")
// execSync("npm run savePlatformsToDb")
// execSync("npm run relateGamesToGenres")
// execSync("npm run relateGamesToModes")
// execSync("npm run relateGamesToPlatforms")

// try {
//     await prisma.user.createMany({
//         data: [
//             {email: 'dylan.m.c.digby@gmail.com', },
//             {}
//         ]
//         ,
//         skipDuplicates: true
//     })
// } catch (error) {
//     console.log("Error seeding permanent users into db prod")
// }

// const persistentUsers = ['user_2akaEri3dboquU8h0pJ4QCByLuN', 'user_2aq0Je7jvvFaARtNXQ8tRWKS3H7', 'user_2ZqO4PFqv2bK0A21MfqI5BS8uYN']

// for (const id of persistentUsers) {
//     const params = { firstName: 'Updateseed' };
//     await clerkClient.users.updateUser(id, params);
// }