import prisma from "@/app/lib/db"

async function saveGenresToDb() {

    const igdbBaseUrl = process.env.IGDB_BASE_URL
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string
    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
        where: {
            type: 'token',
        }
    })

    try {
        const response = await fetch(`${igdbBaseUrl}/genres`, {
            method: "POST",
            headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                "Accept": "application/json"
            },
            body: `fields name; limit 500; sort id;`
        })
        const genresJSON = await response.json()
        await saveGenres(genresJSON)
    } catch (error) {
        console.log("Something went wrong fetching genres:", error)
    }

    async function saveGenres(genresJSON: any){ 
        try {
            for (let i = 0; i < Object.keys(genresJSON).length; i++) { 

                await prisma.genres.upsert({
                    where: {
                        externalId: genresJSON[i].id,
                    },
                    update: {
                        
                    },
                    create: {
                        externalId: genresJSON[i].id,
                        name: genresJSON[i].name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving genres:", error)
        }
    }
} 
    
saveGenresToDb()