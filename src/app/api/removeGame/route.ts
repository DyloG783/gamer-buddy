import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type gameAndUser = { userEmail: string, gameId: number }

export async function POST(request: Request) { 

    const data: gameAndUser = await request.json()

    const { userEmail, gameId } = data

    try {
        const removeGameFromUser = await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                games: {
                    disconnect: {
                        id: gameId
                    }
                }
            }
        })
        console.log("Success remove game from User (from api/prisma)", removeGameFromUser)
    } catch (error) {
        console.log("Failed to remove game from User", error)
        return NextResponse.json({message: "Failed to remove game from User"})
    }
    
    return NextResponse.json({message: "Succeeded removing game from user"})
}