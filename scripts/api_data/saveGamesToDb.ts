import prisma from '@/lib/db';

async function saveGamesToDb() {

    // const gameCount = 500;
    // const limit: number = 500; // igdb api rate limit per second
    // let offset: number = 0;
    // let loopCount = 0;
    const postBody = `fields name, url, summary, platforms, game_modes, genres, first_release_date; where genres != null & summary != null & cover != null & platforms != null & first_release_date != null & game_modes = (2,3,4,5,6) & first_release_date > 1577836799 & first_release_date < 1712188060 & platforms = (6, 34, 39, 48, 49, 130, 165, 167, 169, 386, 390, 471); limit 500; offset 0; sort id;`

    const igdbBaseUrl = process.env.IGDB_BASE_URL;
    const twitchClientId = process.env.TWITCH_CLIENT_ID as string;
    const twitchAuthTokenFromDb = await prisma.twitchAuthToken.findFirst({
        where: {
            type: 'token',
        }
    });

    // // loop through fetching all games based upon the game count. IGDB rate limits require looping in groups of 500
    // while (offset < gameCount) {

    // console.log("Games processing...:", offset);
    // console.log("Max game count:", gameCount);
    // console.log("Iterations:", loopCount);

    try {
        const response = await fetch(`${igdbBaseUrl}/games`, {
            method: "POST",
            headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                "Accept": "application/json"
            },
            body: postBody
        })
        const gamesJSON = await response.json();
        // await saveGames(gamesJSON);
        // offset += limit;

        // Loop through response and save each game
        try {
            for (const game of gamesJSON) {

                // loopCount++;

                const alreadyExists = await prisma.game.findUnique({
                    where: { id: game.id }
                })

                if (alreadyExists) {
                    return
                }
                else {

                    console.log("New game: ", game.name);

                    // get game's genres
                    const genresResponse = await fetch(`${igdbBaseUrl}/genres`, {
                        method: "POST",
                        headers: {
                            "Client-ID": twitchClientId,
                            "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                            "Accept": "application/json"
                        },
                        body: `fields name; where id = (${game.genres}); sort id;`
                    })
                    const genresJSON = await genresResponse.json()

                    // get game's platforms
                    const platformsResponse = await fetch(`${igdbBaseUrl}/platforms`, {
                        method: "POST",
                        headers: {
                            "Client-ID": twitchClientId,
                            "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                            "Accept": "application/json"
                        },
                        body: `fields name; where id = (${game.platforms}); sort id;`
                    })
                    const platformsJSON = await platformsResponse.json()

                    // get game's modes
                    const modesResponse = await fetch(`${igdbBaseUrl}/game_modes`, {
                        method: "POST",
                        headers: {
                            "Client-ID": twitchClientId,
                            "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                            "Accept": "application/json"
                        },
                        body: `fields name; where id = (${game.game_modes}); sort id;`
                    })
                    const gameModesJSON = await modesResponse.json()

                    //get games cover image json object
                    const gameCoverResponse = await fetch(`${igdbBaseUrl}/covers`, {
                        method: "POST",
                        headers: {
                            "Client-ID": twitchClientId,
                            "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
                            "Accept": "application/json"
                        },
                        body: `fields game,height,url,width; where game = ${game.id};`
                    })
                    const gameCoverJSON = await gameCoverResponse.json()

                    await prisma.game.upsert({
                        where: {
                            id: game.id,
                        },
                        update: {},
                        create: {
                            id: game.id,
                            name: game.name,
                            summary: game.summary,
                            url: game.url,
                            platforms: platformsJSON.map((i: any) => i.name),
                            modes: gameModesJSON.map((i: any) => i.name),
                            genres: genresJSON.map((i: any) => i.name),
                            firstReleaseDate: game.first_release_date,
                            cover: gameCoverJSON
                        },
                    })
                }
            }
        } catch (error) {
            console.log("Something went wrong saving games:", error)
        }

    } catch (error) {
        console.log("Something went wrong fetching games: ", error);
    }
}

// async function saveGames(gamesJSON: any) {
//     try {
//         for (const game of gamesJSON) {

//             // loopCount++;

//             const alreadyExists = await prisma.game.findUnique({
//                 where: { id: game.id }
//             })

//             if (alreadyExists) {
//                 return
//             }
//             else {

//                 console.log("New game: ", game.name);

//                 // get game's genres
//                 const genresResponse = await fetch(`${igdbBaseUrl}/genres`, {
//                     method: "POST",
//                     headers: {
//                         "Client-ID": twitchClientId,
//                         "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
//                         "Accept": "application/json"
//                     },
//                     body: `fields name; where id = (${game.genres}); sort id;`
//                 })
//                 const genresJSON = await genresResponse.json()

//                 // get game's platforms
//                 const platformsResponse = await fetch(`${igdbBaseUrl}/platforms`, {
//                     method: "POST",
//                     headers: {
//                         "Client-ID": twitchClientId,
//                         "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
//                         "Accept": "application/json"
//                     },
//                     body: `fields name; where id = (${game.platforms}); sort id;`
//                 })
//                 const platformsJSON = await platformsResponse.json()

//                 // get game's modes
//                 const modesResponse = await fetch(`${igdbBaseUrl}/game_modes`, {
//                     method: "POST",
//                     headers: {
//                         "Client-ID": twitchClientId,
//                         "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
//                         "Accept": "application/json"
//                     },
//                     body: `fields name; where id = (${game.game_modes}); sort id;`
//                 })
//                 const gameModesJSON = await modesResponse.json()

//                 //get games cover image json object
//                 const gameCoverResponse = await fetch(`${igdbBaseUrl}/covers`, {
//                     method: "POST",
//                     headers: {
//                         "Client-ID": twitchClientId,
//                         "Authorization": `Bearer ${twitchAuthTokenFromDb?.twitchAuthToken}`,
//                         "Accept": "application/json"
//                     },
//                     body: `fields game,height,url,width; where game = ${game.id};`
//                 })
//                 const gameCoverJSON = await gameCoverResponse.json()

//                 await prisma.game.upsert({
//                     where: {
//                         id: game.id,
//                     },
//                     update: {},
//                     create: {
//                         id: game.id,
//                         name: game.name,
//                         summary: game.summary,
//                         url: game.url,
//                         platforms: platformsJSON.map((i: any) => i.name),
//                         modes: gameModesJSON.map((i: any) => i.name),
//                         genres: genresJSON.map((i: any) => i.name),
//                         firstReleaseDate: game.first_release_date,
//                         cover: gameCoverJSON
//                     },
//                 })
//             }
//         }
//     } catch (error) {
//         console.log("Something went wrong saving games:", error)
//     }
// }
// }

/**
 * stopping new games being added while demo user is active for data consistency
 */
saveGamesToDb();

