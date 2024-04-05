import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { SearchStateSchema } from '@/lib/zod_schemas';

export async function POST(request: Request) {

    const data = await request.json();

    const input = SearchStateSchema.safeParse(data.searchState);
    if (!input.success) return NextResponse.json({ error: "Input validation failed (zod)" }, { status: 403 });

    const genre = input.data.genre;
    const mode = input.data.mode;
    const platform = input.data.platform;
    const search = input.data.search;

    try {
        const searchedGames = await prisma.game.findMany({
            where: {
                genres: genre && { has: genre } || undefined,
                modes: mode && { has: mode } || undefined,
                platforms: platform && { has: platform } || undefined,
                name: search && { startsWith: search, mode: 'insensitive' } || undefined
            },
            include: { _count: { select: { users: true } } },
            orderBy: { firstReleaseDate: "desc" },
        })

        return NextResponse.json({ searchedGames })
    } catch (error) {
        console.log("Failed to retreive searched games from db in client route", error)
        return NextResponse.json({ message: "Failed to retreive searched games from db in client route", error })
    }
}