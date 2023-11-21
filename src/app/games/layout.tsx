import React, { Suspense } from "react";
import YourGames from "./components/YourGames";
import Loading from "./loading";
import SearchOptions from "./components/SearchOptions";
import prisma from "@/lib/db";

export default async function GamesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="grow flex flex-col " id="layout_games">
            <div className=" flex flex-col p-2 shadow-sm" id="yourGames_layout">
                <h1 className="grow md:py-10 text-center font-bold text-lg md:text-2xl">Your Games</h1>
                <YourGames />
            </div>
            <div className="grow flex flex-col p-2 shadow-sm " id="allgames_layout">
                <h1 className="md:py-10 text-center font-bold text-lg md:text-2xl">Games</h1>
                <div className={`grow flex flex-col justify-between`} id="allgames_layout_children">
                    <Suspense fallback={<Loading />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
