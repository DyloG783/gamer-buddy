import { IGame, IUser } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type userRequest = { user: IUser, player: IUser, game: IGame };

export async function POST(request: Request) { 
        
    const data: userRequest = await request.json()
    const { user, player, game } = data
    
    try {
        await prisma.follows.create({
            data: {
                followedById: user.id, 
                followingId: player.id, 
                gameId: game.id,
            }
        })

    } catch (error) {
        return NextResponse.json({message: `${user.name} and ${player.name} and ${game.name} connection failed` , error})
    }

    return NextResponse.json({message: `${user.name} and ${player.name} are connected through the game ${game.name}!`})
}