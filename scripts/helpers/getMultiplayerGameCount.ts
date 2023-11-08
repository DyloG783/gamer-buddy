require('dotenv').config({ path: '../.env' })
import prisma from '@/app/lib/db';

export default async function getMultiplayerGameCount() { 
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
        body: "fields name; where game_modes = (2,3,4,5,6) & platforms != null;"
    })

    const countJSON = await totalCountResponse.json()
    const count: number = countJSON.count
    console.log("The #(count) of multiplayer games retrieved from IGBD is:", count)

    return count
}
