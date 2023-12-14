import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() { 

    const games = await prisma.game.findMany({
        include: {
            genres: true,
            modes: true,
            platforms: true
        }
    })

    return NextResponse.json({games})
}