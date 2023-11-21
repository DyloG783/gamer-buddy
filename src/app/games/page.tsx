import React from "react";
import prisma from "@/lib/db";
import GamesDisplay from "./components/GamesDisplay";


export default async function GamesPage() {

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.gameMode.findMany()
    const games = await prisma.game.findMany()

    // Fetches the last 500 games in the DB including future releases to be displayed before searching
    const defaultGames = await prisma.game.findMany({
        take: 500,
        where: {

        },
        orderBy: {
            firstReleaseDate: "desc",
        },
    })

    return (
        <GamesDisplay genres={genres} platforms={platforms} modes={modes} games={games} defaultGames={defaultGames} />
    )
}
