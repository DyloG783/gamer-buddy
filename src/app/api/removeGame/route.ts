import { IGame } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type game = { game: IGame }

export async function POST(request: Request) {

    const data: game = await request.json()
    const { userId } = auth();
    const { game } = data

    try {
        await prisma.user.update({
            where: {
                id: userId!
            },
            data: {
                games: {
                    disconnect: {
                        id: game.id
                    }
                }
            }
        })
    } catch (error) {
        console.log("Failed to remove game from User", error)
        return NextResponse.json({ message: "Failed to remove game from User" })
    }
    return NextResponse.json({ message: "Succeeded removing game from user" })
}