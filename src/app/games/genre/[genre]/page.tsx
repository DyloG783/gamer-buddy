import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import SearchOptions from "@/app/games/components/SearchOptions";

export default async function Genre({ params }: { params: { genre: number } }) {

    const genreId = Number(params.genre)
    const genreGames = await prisma.game.findMany({
        where: {
            genres: {
                has: genreId
            }
        }
    })

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.gameMode.findMany()

    return (
        <div className={`grow flex flex-col justify-between`}
            id="page_games"
        >
            <SearchOptions genres={genres} platforms={platforms} modes={modes} />
            <PaginatedGames games={genreGames} itemsPerPage={6} />
        </div>

    )
}