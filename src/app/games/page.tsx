import React from "react";
import prisma from "../lib/db";
import YourGames from "./YourGames";
import AllGames from "./AllGames";

export default async function Games() {

    const allGames = await prisma.games.findMany({ take: 100 })
    // const allGames = await prisma.games.findMany()

    return (
        <>
            <YourGames />
            <AllGames allGames={allGames} />
        </>
    )
}
