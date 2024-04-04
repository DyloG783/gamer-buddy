import prisma from "@/lib/db"

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
            body: `fields name; where id = (2,3,4,5,6); limit 500; sort id;`
        })
        const gameModesJSON = await response.json()
        await savegameModes(gameModesJSON)
    } catch (error) {
        console.log("Something went wrong fetching game modes:", error)
    }

    async function savegameModes(gameModesJSON: any) {
        try {
            for (const mode of gameModesJSON) {

                await prisma.mode.upsert({
                    where: {
                        id: mode.id,
                    },
                    update: {

                    },
                    create: {
                        id: mode.id,
                        name: mode.name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving game modes:", error)
        }
    }
}

saveGameModesToDb()