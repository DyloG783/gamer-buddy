import prisma from '@/lib/db';

async function gameToGenre() { 

    const genres = await prisma.genre.findMany()

    try {

        for (let ge = 0; ge < genres.length; ge++) { 

            console.log(`Genre loop ${genres[ge].name}`)

           const games = await prisma.game.findMany({
                where: {
                    genreIds: {
                        has: genres[ge].id
                    }
                }
           })
            
            console.log(`Games to connect ${games.length}`)
            
            for (let gam = 0; gam < games.length; gam++) { 

                await prisma.game.update({
                    where: {
                    id: games[gam].id,
                    },
                    data: {
                        genres: {
                            connect: {
                                id: genres[ge].id,
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