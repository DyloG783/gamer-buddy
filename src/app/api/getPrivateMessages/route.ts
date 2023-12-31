import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type playerId = { playerId: string };

export async function POST(request: Request) {

    const { userId } = auth();

    const data = await request.json()
    const { playerId } = data

    try {

        // get all messages between the user and the player
        const messages = await prisma.privateMessage.findMany({
            where: {
                OR: [
                    {
                        sentById: { contains: userId! },
                        recievedById: { contains: playerId },
                    },
                    {
                        sentById: { contains: playerId },
                        recievedById: { contains: userId! },
                    },
                ]
            },
            include: {
                sentBy: { select: { userName: true } },
                recievedBy: { select: { userName: true } }
            },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json({ messages })

    } catch (error) {
        console.log("Failed to retreive messages (api)", error)
        return NextResponse.json({ message: "Failed to retreive messages (api)", error })
    }

}