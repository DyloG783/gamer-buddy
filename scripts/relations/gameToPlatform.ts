import prisma from '@/lib/db';

async function gameToPlatform() { 

    const platforms = await prisma.platform.findMany()

    try {

        for (const platform of platforms) { 

            console.log(`Platform loop ${platform.name}`)

           const games = await prisma.game.findMany({
                where: {
                    platformIds: {
                        has: platform.id
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
                        platforms: {
                            connect: {
                                id: platform.id,
                            },
                        },
                    },
                })
            }
        }
        
    } catch (error) {
        console.log("Something went wrong relating Games to Platforms:", error)
    }
}

gameToPlatform()