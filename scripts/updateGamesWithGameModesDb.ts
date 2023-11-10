require('dotenv').config({ path: '../.env' })
import prisma from '@/app/lib/db';

async function updateGamesWithGameModesDb() { 

    const gameModes = await prisma.gameMode.findMany()
    const numOfGameModes = await prisma.gameMode.count()
    const games = await prisma.game.findMany()

    try {
        for (let gmde = 0; gmde < Object.keys(gameModes).length; gmde++) { 
            console.log(`Game Mode loop through all games: ${gmde + 1}`)
            console.log(`Total # of modes : ${numOfGameModes}`)
            for (let ga = 0; ga < Object.keys(games).length; ga++) { 
                if (games[ga].gameModes.includes(gameModes[gmde].externalId)) { 
                    await prisma.game.update({
                        where: {
                            id: games[ga].id,
                        },
                        data: {
                            gameModeNames: {
                                push: gameModes[gmde].name
                            }
                        },
                    })
                }
            }
        }

        } catch (error) {
            console.log("Something went wrong looping through game modes:", error)
        }
}

updateGamesWithGameModesDb()