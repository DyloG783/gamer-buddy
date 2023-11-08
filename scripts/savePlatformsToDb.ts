import prisma from "@/app/lib/db"

async function savePlatformsToDb() {

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
            body: `fields name; limit 500; sort id;`
        })
        const platformsJSON = await response.json()
        await savePlatforms(platformsJSON)
    } catch (error) {
        console.log("Something went wrong fetching platforms:", error)
    }

    async function savePlatforms(platformsJSON: any){ 
        try {
            for (let i = 0; i < Object.keys(platformsJSON).length; i++) { 

                await prisma.platforms.upsert({
                    where: {
                        externalId: platformsJSON[i].id,
                    },
                    update: {
                        
                    },
                    create: {
                        externalId: platformsJSON[i].id,
                        name: platformsJSON[i].name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving platforms:", error)
        }
    }
} 
    
savePlatformsToDb()