require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';

async function updateGamesWithPlatforms() { 

    const platforms = await prisma.platform.findMany()
    const numOfPlatforms = await prisma.platform.count()
    const games = await prisma.game.findMany()

    try {
        for (let plat = 0; plat < Object.keys(platforms).length; plat++) { 
            console.log(`Platform loop through all games: ${plat + 1}`)
            console.log(`Total # of modes : ${numOfPlatforms}`)
            for (let ga = 0; ga < Object.keys(games).length; ga++) { 
                if (games[ga].platforms.includes(platforms[plat].externalId)) { 
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
        }

        } catch (error) {
            console.log("Something went wrong looping through platforms:", error)
        }
}

updateGamesWithPlatforms()