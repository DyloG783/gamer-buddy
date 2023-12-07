import prisma from '@/lib/db';

async function gameToPlatform() { 

    const platforms = await prisma.platform.findMany()

    try {

        for (let pl = 0; pl < platforms.length; pl++) { 

            console.log(`Platform loop ${platforms[pl].name}`)

           const games = await prisma.game.findMany({
                where: {
                    platformIds: {
                        has: platforms[pl].id
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
                        platforms: {
                            connect: {
                                id: platforms[pl].id,
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