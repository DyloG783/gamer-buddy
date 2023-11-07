require('dotenv').config({ path: '../.env' })
import prisma from '@/app/lib/db';
import getMultiplayerGameCount from './getMultiplayerGameCount';

async function saveGamesToDb(){ 

    const gameCount = await getMultiplayerGameCount()
    const limit: number = 500;
    let offset: number = 0;
    let loopCount = 0

    const igdbBaseUrl = process.env.IGDB_BASE_URL
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string
    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
            where: {
                type: 'token',
            }
        })
    
    // loop through fetching all games until the offset (increments 500) is > game count (~35,000)
    while (offset < gameCount) { 
        
        try {
            const response = await fetch(`${igdbBaseUrl}/games`, {
                method: "POST",
                headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                "Accept": "application/json"
                },
                body: `fields name, url, summary; where game_modes = (2,3,4,5,6); limit ${limit}; offset ${offset}; sort id;`
            })
            const gamesJSON = await response.json()
            await AddGamesToDb(gamesJSON)

            offset += limit
            loopCount++
            console.log("Current offset:", offset)
            console.log("Max game count:", gameCount)
            console.log("Iterations:", loopCount)
        } catch (error) {
            console.log("Something went wrong fetching games:", error)
        }
    }

    async function AddGamesToDb(gamesJSON: any) { 
        try {
            for (let i = 0; i < Object.keys(gamesJSON).length; i++) { 

                await prisma.games.upsert({
                    where: {
                        externalId: gamesJSON[i].id,
                    },
                    update: {
                        
                    },
                    create: {
                        externalId: gamesJSON[i].id,
                        name: gamesJSON[i].name,
                        summary: gamesJSON[i].summary,
                        url: gamesJSON[i].url,
                    },
                })
            }

        } catch (error) {
            console.log("Something went wrong saving games:", error)
        }
    }
}

saveGamesToDb()
