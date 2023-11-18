require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';
import getMultiplayerGameCount from './helpers/getMultiplayerGameCount';

async function saveGamesToDb(){ 

    const gameCount = await getMultiplayerGameCount()
    const limit: number = 500;
    let offset: number = 0;
    let loopCount = 0;

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
                body: `fields name, url, summary, platforms, game_modes, genres, first_release_date, total_rating; where game_modes = (2,3,4,5,6) & first_release_date > 1262350800 & platforms != null & genres != null; limit ${limit}; offset ${offset}; sort id;`
            })
            const gamesJSON = await response.json()
            await saveGames(gamesJSON)

            offset += limit
            loopCount++
            console.log("Current offset:", offset)
            console.log("Max game count:", gameCount)
            console.log("Iterations:", loopCount)
        } catch (error) {
            console.log("Something went wrong fetching games:", error)
        }
    }

    async function saveGames(gamesJSON: any) { 
        try {
            for (let i = 0; i < Object.keys(gamesJSON).length; i++) {
                await prisma.game.upsert({
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
                        platforms: gamesJSON[i].platforms,
                        gameModes: gamesJSON[i].game_modes,
                        genres: gamesJSON[i].genres,
                        totalRating: gamesJSON[i].total_rating,
                        firstReleaseDate: gamesJSON[i].first_release_date
                    },
                })
            }
        } catch (error) {
            console.log("Something went wrong saving games:", error)
        }
    }
}

saveGamesToDb()
