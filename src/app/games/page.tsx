import React from "react";
import prisma from "../lib/db";
import YourGames from "./components/YourGames";
import AllGames from "./components/AllGames";

export default async function Games() {

    const defaultGames = await prisma.game.findMany()

    return (
        <div className="grow flex text-sm md:text-base lg:text-lg">
            <div className="grow md:grid md:grid-flow-row auto-rows-fr ">
                <div className="p-2 shadow-sm">
                    <YourGames />
                </div>
                <div className="p-2 shadow-sm flex justify-around">
                    <AllGames allGames={defaultGames} />
                </div>
            </div>

        </div>
    )
}
