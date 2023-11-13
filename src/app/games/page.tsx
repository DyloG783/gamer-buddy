import React from "react";
import prisma from "@/app/lib/db";
import PaginatedGames from "./components/PaginatedGames";
import SearchOptions from "./components/SearchOptions";

export default async function Games() {

    // replace this with latest or something relevant
    const defaultGames = await prisma.game.findMany({ take: 100 })

    return (
        <PaginatedGames games={defaultGames} itemsPerPage={6} />
    )
}
