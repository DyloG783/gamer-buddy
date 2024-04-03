require('dotenv').config({ path: '../.env' });
import prisma from '@/lib/db';

export default async function saveTwitchAuthToken() {

    const twitchClientId = process.env.TWITCH_CLIENT_ID;
    const twitchSecretId = process.env.TWITCH_CLIENT_SECRET;

    const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretId}&grant_type=client_credentials`, {
        method: "POST"
    });
    const tknResponse = await response.json();
    const tkn: string = tknResponse.access_token;

    if (tkn === undefined) {
        console.log("Failed to retrieve auth token from twitch api (undefined).");
        return;
    }

    try {
        await prisma.twitchAuthToken.upsert({
            where: {
                type: 'token',
            },
            update: {
                twitchAuthToken: tkn,
            },
            create: {
                type: 'token',
                twitchAuthToken: tkn
            }
        })
        console.log("Successfully saved twitch auth token to db.", tkn)
    } catch (error) {
        console.log("Failed updating twitch auth token to db.", error)
    }
    return tkn;
}
