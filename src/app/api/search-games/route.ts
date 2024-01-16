import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    const data = await request.json()

    const genre: string = data.searchState.genre;
    const mode: string = data.searchState.mode;
    const platform: string = data.searchState.platform;
    const search: string = data.searchState.search;

    // console.log("API values before db search:", genre, mode, platform, search)

    try {
        const searchedGames = await prisma.game.findMany({
            where: {
                genres: genre && { has: genre } || undefined,
                modes: mode && { has: mode } || undefined,
                platforms: platform && { has: platform } || undefined,
                name: search && { startsWith: search, mode: 'insensitive' } || undefined
            }
        })

        // console.log("searched games API JSON:", searchedGames)
        return NextResponse.json({ searchedGames })
    } catch (error) {
        console.log("Failed to retreive searched games from db in client route", error)
        return NextResponse.json({ message: "Failed to retreive searched games from db in client route", error })
    }
}