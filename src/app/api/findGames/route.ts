import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type userEmail = { userEmail: string}

export async function POST(request: Request) {

    const data: userEmail = await request.json()

    let games = [];

    try {
        const usersGames = await prisma.user.findFirst({
            where: {
                email: data.userEmail
            },
            select: {
                games: true
            }
        })

        console.log("Succeeded fetching game IDs on user (routes)", usersGames)

        if (usersGames?.games) { 
            if (usersGames.games.length > 0) { 

                for (let i = 0; usersGames.games.length; i++) { 

                    const game = await prisma.game.findFirst({
                        where: {
                            externalId: usersGames.games[i]
                        }
                    })

                    games.push(game)
                }
                
            }
        }
        
        return NextResponse.json({games})

    } catch (error) {
        console.log("Failed looking up games on user", error)
        return NextResponse.json({message: "Failed looking up games on user", error})
    }
 }