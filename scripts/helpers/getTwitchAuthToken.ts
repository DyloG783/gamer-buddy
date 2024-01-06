require('dotenv').config({ path: '../.env' })

export default async function getTwitchAuthToken() {

    const twitchClientId = process.env.TWITCH_CLIENT_ID
    const twitchSecretId = process.env.TWITCH_CLIENT_SECRET

    const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${twitchClientId}&client_secret=${twitchSecretId}&grant_type=client_credentials`, {
        method: "POST"
    })
    const tknResponse = await response.json()
    const tkn: string = tknResponse.access_token
    console.log("In getTwitchAuthToken() fetchData", tkn)

    if (tkn === undefined) {
        console.log("!!! Failed to retrieve auth token from twitch api", tkn)
    }
    return tkn
}
