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
                    followedById: user.id, // this is the user who initiates following. They have their 'followedBy'(meaning this user has followed others) instances increased to showtheir side ofthe relation
                    followingId: player.id // this is the user who is beingfollowed. They get their 'Following'(measing this many people follow this user) instances increased to show their side of the relation
                }
            }
        })

    } catch (error) {
        return NextResponse.json({message: `${user.name} and ${player.name} and ${game.name} disconnection failed` , error})
    }

    return NextResponse.json({message: `${user.name} and ${player.name} and ${game.name} disconnection successful`})
}