import prisma from "@/lib/db"

async function saveGamePlatformsToDb() {

    const igdbBaseUrl = process.env.IGDB_BASE_URL
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string
    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
        where: {
            type: 'token',
        }
    })

    try {
        const response = await fetch(`${igdbBaseUrl}/platforms`, {
            method: "POST",
            headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                "Accept": "application/json"
            },
            body: `fields name; where id = (3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 20, 34, 39, 48, 49, 130, 165, 167, 169, 384, 385, 386, 390, 471); limit 500; sort id;`
        })
        const platformsJSON = await response.json()
        await savePlatforms(platformsJSON)
    } catch (error) {
        console.log("Something went wrong fetching platforms:", error)
    }

    async function savePlatforms(platformsJSON: any){ 
        try {
            for (const plat of platformsJSON) { 

                await prisma.platform.upsert({
                    where: {
                        id: plat.id,
                    },
                    update: {
                        
                    },
                    create: {
                        id: plat.id,
                        name: plat.name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving platforms:", error)
        }
    }
} 
    
saveGamePlatformsToDb()