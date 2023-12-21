import { IGame } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type gameAndUser = { userEmail: string, game: IGame }

export async function POST(request: Request) { 

    const data: gameAndUser = await request.json()

    const { userEmail, game } = data

    try {
        await prisma.user.update({
            where: {
                email: userEmail
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
        return NextResponse.json({message: "Failed to remove game from User"})
    }
    return NextResponse.json({message: "Succeeded removing game from user"})
}