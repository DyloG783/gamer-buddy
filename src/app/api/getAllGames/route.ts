import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() { 

    try {
        const games = await prisma.game.findMany({ include: { genres: true, modes: true, platforms: true } })
        return NextResponse.json({ games })
    } catch (error) {

        console.log()
        return NextResponse.json({message: "Failed to retreive all games from db in client route"})
    }

    
}