import React from "react";
import prisma from "@/lib/db";
import GamesDisplay from "./components/GamesDisplay";

export default async function GamesPage() {

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.mode.findMany()

    // Gets the last 500 games in the DB including future releases to be displayed before searching
    const defaultGames = await prisma.game.findMany({
        take: 500, where: {},
        include: {
            genres: true,
            modes: true,
            platforms: true
        },
        orderBy: { firstReleaseDate: "desc" },
    })

    return (
        <div className="" id="games_page_container">
            <GamesDisplay genres={genres} platforms={platforms} modes={modes} defaultGames={defaultGames} />
        </div>
    )
}
