require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';
import getIGBdFilteredGameCount from '../helpers/getIGBdFilteredGameCount';

async function saveGamesToDb() {

    const gameCount = await getIGBdFilteredGameCount()
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
                body: `fields name, url, summary, platforms, game_modes, genres, first_release_date; where game_modes = (2,3,4,5,6) & first_release_date > 1577883600 & platforms = (34, 39, 48, 49, 130, 165, 167, 169, 386, 390, 471) & genres != null; limit ${limit}; offset ${offset}; sort id;`
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
            for (const game of gamesJSON) {
                await prisma.game.upsert({
                    where: {
                        id: game.id,
                    },
                    update: {

                    },
                    create: {
                        id: game.id,
                        name: game.name,
                        summary: game.summary,
                        url: game.url,
                        platformIds: game.platforms,
                        modeIds: game.game_modes,
                        genreIds: game.genres,
                        firstReleaseDate: game.first_release_date
                    },
                })
            }
        } catch (error) {
            console.log("Something went wrong saving games:", error)
        }
    }
}

saveGamesToDb()
