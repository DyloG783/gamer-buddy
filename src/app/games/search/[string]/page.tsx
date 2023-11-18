import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "@/app/games/components/PaginatedGames";

export default async function Search({ params }: { params: { string: string } }) {

    const searchedGames = await prisma.game.findMany({
        where: {
            name: {
                startsWith: params.string,
                mode: "insensitive"
            }
        }
    })

    return (
        <PaginatedGames games={searchedGames} itemsPerPage={6} />
    )
}