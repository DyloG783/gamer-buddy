import { IGame } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type game = { game: IGame };

export async function POST(request: Request) {

    const { userId } = auth();

    const data: game = await request.json()
    const { game } = data

    try {
        await prisma.user.update({
            where: {
                id: userId!
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
        return NextResponse.json({ message: "failed to update user with game" })
    }
    return NextResponse.json({ message: "Succeeded adding game to user" })
}