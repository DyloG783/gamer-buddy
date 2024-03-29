require('dotenv').config({ path: '../.env' })
import prisma from '@/lib/db';

export default async function getIGBdFilteredGameCount() {
    const igdbBaseUrl = process.env.IGDB_BASE_URL
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string

    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
        where: {
            type: 'token',
        }
    })

    console.log("twitchAuthTokenFromDb:", twitchAuthTokenFromDb?.twitchAuthToken)

    const totalCountResponse = await fetch(`${igdbBaseUrl}/games/count`, {
        method: "POST",
        headers: {
            "Client-ID": twitchClientId,
            "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
            "Accept": "application/json"
        },
        body: "fields name; where game_modes = (2,3,4,5,6) & first_release_date > 1577883600 & platforms = (34, 39, 48, 49, 130, 165, 167, 169, 386, 390, 471) & genres != null;"
    })

    const countJSON = await totalCountResponse.json()
    const count: number = countJSON.count
    console.log("The #(count) of multiplayer games retrieved from IGBD is:", count)

    return count
}
