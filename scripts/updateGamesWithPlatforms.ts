require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';

async function updateGamesWithPlatforms() { 

    const platforms = await prisma.platform.findMany()
    const numOfPlatforms = await prisma.platform.count()

    try {
        for (let plat = 0; plat < Object.keys(platforms).length; plat++) { 
            console.log(`Platform loop through all games: ${plat + 1}`)
            console.log(`Total # of modes : ${numOfPlatforms}`)
            let games = await prisma.game.findMany({
                where: {
                    platforms: {
                        has: platforms[plat].externalId
                    }
                }
            })
            for (let ga = 0; ga < Object.keys(games).length; ga++) { 
                    await prisma.game.update({
                        where: {
                            id: games[ga].id,
                        },
                        data: {
                            platformNames: {
                                push: platforms[plat].name
                            }
                        },
                })
            }
        }
        } catch (error) {
            console.log("Something went wrong looping through platforms:", error)
    } finally { 
        console.log("Successfully added Platforms")
    }
}

updateGamesWithPlatforms()