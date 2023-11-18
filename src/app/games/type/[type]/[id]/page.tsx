import React from "react";
import prisma from "@/lib/db";
import PaginatedGames from "@/app/games/components/PaginatedGames";

export default async function TypeSearch({ params }: { params: { type: string, id: string } }) {

    const id = Number(params.id)
    const gameType = params.type
    let games;

    if (!id) {
        console.log("invalid ID")
        return (<div>"Invalid ID"</div>)
    }

    if (gameType === "genre") {
        games = await prisma.game.findMany({
            where: {
                genres: {
                    has: id
                }
            }
        })
    }
    else if (gameType === "platform") {
        games = await prisma.game.findMany({
            where: {
                platforms: {
                    has: id
                }
            }
        })
    }
    else if (gameType === "mode") {
        games = await prisma.game.findMany({
            where: {
                gameModes: {
                    has: id
                }
            }
        })
    }
    else {
        console.log("could not find game type")
        return (<div>Could not find game type</div>)
    }

    return (<PaginatedGames games={games} itemsPerPage={6} />)
}