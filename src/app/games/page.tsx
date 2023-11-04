import React from "react";
import prisma from "../lib/db";

export default async function Games() {

    async function getTwitchAuth() {
        const response = await fetch("https://id.twitch.tv/oauth2/token?client_id=t86e9gszh18045kpdlg7r5lv1c9ykq&client_secret=347folsyh0cl57ich7kb6gmloelgh6&grant_type=client_credentials", {
            method: "POST"
        })
        const tknResponse = await response.json()
        const tkn: string = tknResponse.access_token
        return {
            tkn
        }
    }

    // how is this working? thanks autocomplete ;)
    let authToken = await (await getTwitchAuth()).tkn
    console.log(authToken)

    // this works but errors out on subsequent attempts because we can only have 1 uniqe entry in the table
    // Is this ok as I dont want more entires?
    // What if a new token is gernerated... I want only 1 instance here andit overwrites if a new one is generated
    try {
        await prisma.tempTokens.create({
            data: {
                twitchAuthToken: authToken,
            },
        })
    } catch (error) {
        console.log(error)
    }


    return <div>Games</div>;
};

// export default Games;