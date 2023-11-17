import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "@/app/games/components/PaginatedGames";
import SearchOptions from "@/app/games/components/SearchOptions";

export default async function Platform({ params }: { params: { platform: number } }) {

    const platformId = Number(params.platform)
    const platformGames = await prisma.game.findMany({
        where: {
            platforms: {
                has: platformId
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
            <PaginatedGames games={platformGames} itemsPerPage={6} />
        </div>
    )
}