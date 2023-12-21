import { IGame } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type gameAndUser = { userEmail: string, game: IGame };

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
                    connect: {
                        id: game.id
                    }
                }
            }
        })
    } catch (error) {
        console.log("Failed to update user with game", error)
        return NextResponse.json({message: "failed to update user with game"})
    }
    return NextResponse.json({ message: "Succeeded adding game to user" })
}