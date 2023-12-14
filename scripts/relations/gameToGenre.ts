import prisma from '@/lib/db';

async function gameToGenre() { 

    const genres = await prisma.genre.findMany()

    try {

        for (const genre of genres) { 

            console.log(`Genre loop ${genre.name}`)

           const games = await prisma.game.findMany({
                where: {
                    genreIds: {
                        has: genre.id
                    }
                }
           })
            
            console.log(`Games to connect ${games.length}`)
            
            for (const game of games) { 

                await prisma.game.update({
                    where: {
                    id: game.id,
                    },
                    data: {
                        genres: {
                            connect: {
                                id: genre.id,
                            },
                        },
                    },
                })
            }
        }
        
    } catch (error) {
        console.log("Something went wrong relating Games to Genres:", error)
    }
}

gameToGenre()