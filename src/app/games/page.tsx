import React from "react";
import prisma from "@/lib/db";
import GamesDisplay from "./components/GamesDisplay";

export default async function GamesPage() {

    const genresDb = await prisma.genre.findMany();
    const platformsDb = await prisma.platform.findMany();
    const modesdb = await prisma.mode.findMany();

    // let genres = [{ value: "Default", label: "Default"}];
    // let platforms = [{ value: "Default", label: "Default" }];
    // let modes = [{ value: "Default", label: "Default"}];

    const genres = genresDb.map((g) => {
        return {
            value: g.id.toString(),
            label: g.name
        }
    })

    const platforms = platformsDb.map((p) => {
        return {
            value: p.id.toString(),
            label: p.name
        }
    })

    const modes = modesdb.map((m) => {
        return {
            value: m.id.toString(),
            label: m.name
        }
    })


    // Gets the last 150 games in the DB including future releases to be displayed before searching include user count
    const defaultGames = await prisma.game.findMany({
        take: 200, where: {},
        include: { _count: { select: { users: true } } },
        orderBy: { firstReleaseDate: "desc" },
    })

    return (
        <GamesDisplay genres={genres} platforms={platforms} modes={modes} defaultGames={defaultGames} />
    )
}
