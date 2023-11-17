'use client'

import React, { Suspense, useState } from "react";
import YourGames from "./components/YourGames";
import HideOrShowButton from "./components/HideOrShowButton";
import Loading from "./loading";

export default function GamesLayout({ children }: { children: React.ReactNode }) {

    const [yourGamesMenuOpen, setYourGamesMenuOpen] = useState(true)
    const [gamesMenuOpen, setGamesMenuOpen] = useState(true)

    const handleYourGamesMenuClick = () => {
        setYourGamesMenuOpen(!yourGamesMenuOpen)
    }

    const handleGamesMenuClick = () => {
        setGamesMenuOpen(!gamesMenuOpen)
    }

    return (
        <div className="grow flex flex-col sm:text-sm md:text-base lg:text-lg" id="layout_games">
            <div className=" flex flex-col p-2 shadow-sm" id="yourGames_layout">
                <div className="flex justify-between">
                    <h1 className="grow md:py-10 text-center font-bold text-lg md:text-2xl">Your Games</h1>
                    <HideOrShowButton hideOrShowClickHandler={handleYourGamesMenuClick} hiddenOrOpen={yourGamesMenuOpen} />
                </div>
                <div className={`${yourGamesMenuOpen ? "" : "hidden"}`}>
                    <YourGames />
                </div>
            </div>
            <div className="grow flex flex-col p-2 shadow-sm " id="allgames_layout">
                <div className="flex justify-between">
                    <h1 className="grow md:py-10 text-center font-bold text-lg md:text-2xl">All Games</h1>
                    <HideOrShowButton hideOrShowClickHandler={handleGamesMenuClick} hiddenOrOpen={gamesMenuOpen} />
                </div>
                <div className={`grow flex ${gamesMenuOpen ? "" : "hidden"}`} id="allgames_layout_children">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
