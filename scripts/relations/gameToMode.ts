import prisma from '@/lib/db';

async function gameToMode() { 

    const modes = await prisma.mode.findMany()

    try {

        for (let mo = 0; mo < modes.length; mo++) { 

            console.log(`Mode loop ${modes[mo].name}`)

           const games = await prisma.game.findMany({
                where: {
                    modeIds: {
                        has: modes[mo].id
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
                        modes: {
                            connect: {
                                id: modes[mo].id,
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