import { IGame, IUser } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type userRequest = { user: IUser, player: IUser, game: IGame };

export async function POST(request: Request) { 
        
    const data: userRequest = await request.json()
    const { user, player, game } = data
    
    try {
        await prisma.follows.delete({
            where: {
                followingId_followedById: {
                    followedById: user.id, // this is the user who initiates following. 
                    followingId: player.id // this is the user who is beingfollowed. 
                }
            }
        })

    } catch (error) {
        console.log("Failed to delete following relation", error)
        return NextResponse.json({message: `${user.name} and ${player.name} and ${game.name} disconnection failed` , error})
    }

    return NextResponse.json({message: `${user.name} and ${player.name} and ${game.name} disconnection successful`})
}