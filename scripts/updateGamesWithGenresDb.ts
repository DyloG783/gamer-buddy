require('dotenv').config({ path: '../.env' })
import prisma from '@/app/lib/db';

async function updateGamesWithGenresDb() { 

    const genres = await prisma.genre.findMany()
    const numOfGenres = await prisma.genre.count()
    const games = await prisma.game.findMany()

    try {
        for (let genr = 0; genr < Object.keys(genres).length; genr++) { 
            console.log(`Genre loop through all games: ${genr + 1}`)
            console.log(`Total # of genres: ${numOfGenres}`)
            for (let ga = 0; ga < Object.keys(games).length; ga++) { 
                if (games[ga].genres.includes(genres[genr].externalId)) { 
                    await prisma.game.update({
                        where: {
                            id: games[ga].id,
                        },
                        data: {
                            gameGenreNames: {
                                push: genres[genr].name
                            }
                        },
                    })
                }
            }
        }

        } catch (error) {
            console.log("Something went wrong looping through genres:", error)
        }
}

updateGamesWithGenresDb()