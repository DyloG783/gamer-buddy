import prisma from "@/app/lib/db"

async function saveGameModesToDb() {

    const igdbBaseUrl = process.env.IGDB_BASE_URL
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string
    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
        where: {
            type: 'token',
        }
    })

    try {
        const response = await fetch(`${igdbBaseUrl}/game_modes`, {
            method: "POST",
            headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                "Accept": "application/json"
            },
            body: `fields name; limit 500; sort id;`
        })
        const gameModesJSON = await response.json()
        await savegameModes(gameModesJSON)
    } catch (error) {
        console.log("Something went wrong fetching game modes:", error)
    }

    async function savegameModes(gameModesJSON: any){ 
        try {
            for (let i = 0; i < Object.keys(gameModesJSON).length; i++) { 

                await prisma.gameMode.upsert({
                    where: {
                        externalId: gameModesJSON[i].id,
                    },
                    update: {
                        
                    },
                    create: {
                        externalId: gameModesJSON[i].id,
                        name: gameModesJSON[i].name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving game modes:", error)
        }
    }
} 
    
saveGameModesToDb()