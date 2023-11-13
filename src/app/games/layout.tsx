// 'use client'

import React, { useState } from "react";
import YourGames from "./components/YourGames";
// import HideOrShowButton from "./components/HideOrShowButton";
import SearchOptions from "./components/SearchOptions";
import prisma from "../lib/db";

export default async function GamesLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    // const yourGames = await prisma.user.findMany(// where game id)
    // const [yourGamesMenuOpen, setYourGamesMenuOpen] = useState(true)
    // const [gamesMenuOpen, setGamesMenuOpen] = useState(true)

    // const handleYourGamesMenuClick = () => {
    //     setYourGamesMenuOpen(!yourGamesMenuOpen)
    // }

    // const handleGamesMenuClick = () => {
    //     setGamesMenuOpen(!gamesMenuOpen)
    // }

    const genres = await prisma.genre.findMany()
    const platforms = await prisma.platform.findMany()
    const modes = await prisma.gameMode.findMany()

    return (
        <div className="grow flex flex-col ">
            <div className="grow p-2 shadow-sm">
                <div className="flex justify-between">
                    <label>Your Games</label>
                    {/* <HideOrShowButton hideOrShowClickHandler={handleYourGamesMenuClick} hiddenOrOpen={yourGamesMenuOpen} /> */}
                </div>
                {/* <div className={`${yourGamesMenuOpen ? "" : "hidden"}`}> */}
                <div className={``}>
                    <YourGames />
                </div>
            </div>
            <div className="flex flex-col p-2 shadow-sm ">
                <div className="">
                    <h1 className="py-10 text-center font-bold text-2xl">All Games</h1>
                    {/* <HideOrShowButton hideOrShowClickHandler={handleGamesMenuClick} hiddenOrOpen={gamesMenuOpen} /> */}
                </div>
                {/* <div className={`grow flex ${gamesMenuOpen ? "" : "hidden"}`}> */}
                <div className={`flex flex-col`}>
                    <SearchOptions genres={genres} platforms={platforms} modes={modes} />
                    {children}
                </div>
            </div>
        </div>
    )
}
