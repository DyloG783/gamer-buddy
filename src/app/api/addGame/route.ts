import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type gameAndUser = { userEmail: string, gameId: number }

export async function POST(request: Request) { 

    const data: gameAndUser = await request.json()
    
    const { userEmail, gameId } = data

    try {
        const updateUserWithGame = await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                games: {
                    connect: {
                        id: gameId
                    }
                }
            }
        })
        console.log("Success updating user with game (from api/prisma)", updateUserWithGame)
    } catch (error) {
        console.log("Failed to update user with game", error)
        return NextResponse.json({message: "failed to update user with game"})
    }

    return NextResponse.json({message: "Succeeded adding game to user"})
}