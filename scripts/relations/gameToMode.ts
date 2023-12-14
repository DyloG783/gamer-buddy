import prisma from '@/lib/db';

async function gameToMode() { 

    const modes = await prisma.mode.findMany()

    try {

        for (const mode of modes) { 

            console.log(`Mode loop ${mode.name}`)

           const games = await prisma.game.findMany({
                where: {
                    modeIds: {
                        has: mode.id
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
                        modes: {
                            connect: {
                                id: mode.id,
                            },
                        },
                    },
                })
            }
        }
        
    } catch (error) {
        console.log("Something went wrong relating Games to Modes:", error)
    }
}

gameToMode()