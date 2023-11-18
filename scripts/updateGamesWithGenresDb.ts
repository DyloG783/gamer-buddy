require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';

async function updateGamesWithGenresDb() { 

    const genres = await prisma.genre.findMany()
    const numOfGenres = await prisma.genre.count()

    try {
        for (let genr = 0; genr < Object.keys(genres).length; genr++) { 
            console.log(`Genre loop through all games: ${genr + 1}`)
            console.log(`Total # of genres: ${numOfGenres}`)

            let games = await prisma.game.findMany({
                where: {
                    genres: {
                        has: genres[genr].externalId
                    }
                }
            })

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
        } finally { 
        console.log("Successfully added Genres")
    }
}

updateGamesWithGenresDb()