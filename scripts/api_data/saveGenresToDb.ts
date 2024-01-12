import prisma from "@/lib/db"

async function saveGameGenresToDb() {

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

    async function saveGenres(genresJSON: any) {
        try {
            for (const genre of genresJSON) {

                await prisma.genre.upsert({
                    where: {
                        id: genre.id,
                    },
                    update: {

                    },
                    create: {
                        id: genre.id,
                        name: genre.name,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving genres:", error)
        }
    }
}

saveGameGenresToDb()