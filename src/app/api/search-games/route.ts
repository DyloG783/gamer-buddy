import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) { 

    const data = await request.json()

    const genre: number = data.searchState.genre;
    const mode: number = data.searchState.mode;
    const platform: number = data.searchState.platform;
    const search: string = data.searchState.search;

    try {
        
       const searchedGames = await prisma.game.findMany({
        where: {
            genreIds: genre && { has: genre } || undefined,
            modeIds: mode && { has: mode } || undefined,
            platformIds: platform && { has: platform } || undefined,
            name: search && {startsWith: search, mode: 'insensitive'} || undefined
           },
           include: {
               genres: true, modes: true, platforms: true
           }
       })
        
        return NextResponse.json({ searchedGames })
    } catch (error) {

        console.log("Failed to retreive searched games from db in client route", error)
        return NextResponse.json({message: "Failed to retreive searched games from db in client route", error})
    }
}