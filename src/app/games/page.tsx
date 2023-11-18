import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "./components/PaginatedGames";


export default async function GamesPage() {

    // Fetches the last 500 games in the DB including future releases
    const defaultGames = await prisma.game.findMany({
        take: 500,
        where: {

        },
        orderBy: {
            firstReleaseDate: "desc",
        },
    })

    return (
        <PaginatedGames games={defaultGames} itemsPerPage={6} />
    )
}
