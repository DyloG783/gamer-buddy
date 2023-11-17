import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "./components/PaginatedGames";
import SearchOptions from "./components/SearchOptions";

export default async function Games() {

    // replace this with latest or something relevant
    const defaultGames = await prisma.game.findMany({ take: 100 })

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.gameMode.findMany()

    return (
        <div className={`grow flex flex-col justify-between`}
            id="page_games"
        >
            <SearchOptions genres={genres} platforms={platforms} modes={modes} />
            <PaginatedGames games={defaultGames} itemsPerPage={6} />
        </div>

    )
}
