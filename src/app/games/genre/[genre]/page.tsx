import React from "react";
import prisma from "@/app/lib/db";
import SearchOptions from "../../components/SearchOptions";
import PaginatedGames from "../../components/PaginatedGames";

export default async function Genre({ params }: { params: { genre: number } }) {

    const genreId = Number(params.genre)
    const genreGames = await prisma.game.findMany({
        where: {
            genres: {
                has: genreId
            }
        }
    })

    return (
        <PaginatedGames games={genreGames} itemsPerPage={6} />
    )
}