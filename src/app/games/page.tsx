import React from "react";
import prisma from "@/lib/db";
import GamesDisplay from "./components/GamesDisplay";
import YourGames from "./components/YourGames";

export default async function GamesPage() {

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.mode.findMany()

    // const games = await prisma.game.findMany({
    //     include: {
    //         genres: true,
    //         modes: true,
    //         platforms: true
    //     }
    // })

    // this works fine but nextjs can't cache more than 2mb
    async function getGames() {
        const res = await fetch('http://localhost:3000/api/getAllGames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        const result = await res.json();

        return result.games
    };

    const games = await getGames();

    // Gets the last 500 games in the DB including future releases to be displayed before searching
    const defaultGames = await prisma.game.findMany({
        take: 500,
        where: {

        },
        include: {
            genres: true,
            modes: true,
            platforms: true
        },
        orderBy: {
            firstReleaseDate: "desc",
        },
    })

    return (
        <div className="grow flex flex-col justify-between" id="games_page_container">
            <div className=" flex flex-col p-2 md:p-8 bg-slate-300 mt-4">
                <h2 className="pb-2 font-bold text-blue-800 text-xl md:text-2xl">Your games</h2>
                <p className="text-sm italic pb-2">Games that you have 'Saved' are displayed below</p>
                <YourGames />
            </div>
            <GamesDisplay genres={genres} platforms={platforms} modes={modes} games={games} defaultGames={defaultGames} />
            {/* <GamesDisplay genres={genres} platforms={platforms} modes={modes} defaultGames={defaultGames} /> */}
        </div>
    )
}
