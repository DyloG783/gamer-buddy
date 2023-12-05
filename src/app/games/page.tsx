import React from "react";
import prisma from "@/lib/db";
import GamesDisplay from "./components/GamesDisplay";
import YourGames from "./components/YourGames";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { IGame } from "@/lib/custom_types";


export default async function GamesPage() {

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.gameMode.findMany()
    const games = await prisma.game.findMany()
    const session = await getServerSession(authOptions)
    let yourGames: IGame[] = [];

    // Fetches the last 500 games in the DB including future releases to be displayed before searching
    const defaultGames = await prisma.game.findMany({
        take: 500,
        where: {

        },
        orderBy: {
            firstReleaseDate: "desc",
        },
    })

    // get game ids from user
    const yourGamesIds = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        },
        select: {
            games: true
        }
    })

    // get games from db
    if (yourGamesIds != null) {
        if (yourGamesIds.games.length > 0) {

            for (let i = 0; i < yourGamesIds.games.length; i++) {
                try {
                    const game = await prisma.game.findUnique({
                        where: {
                            externalId: yourGamesIds.games[i]
                        }
                    })

                    if (game != null) {
                        yourGames.push(game)
                    }


                } catch (error) {
                    console.log("Failed finding games for users gameIds: ", error)
                }
            }
        }
    }

    return (
        <div className="grow flex flex-col justify-between" id="games_page_container">
            <div className=" flex flex-col p-2 md:p-8 bg-slate-300 mt-4">
                <h2 className="pb-2 font-bold text-blue-800 text-xl md:text-2xl">Your games</h2>
                <p className="text-sm italic pb-2">Games that you have 'Saved' are displayed below</p>
                <YourGames yourGames={yourGames} />
            </div>
            <GamesDisplay genres={genres} platforms={platforms} modes={modes} games={games} defaultGames={defaultGames} />
        </div>
    )
}
