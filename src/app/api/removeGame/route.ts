import prisma from "@/lib/db";
import { NextResponse } from "next/server";

type gameAndUser = { userEmail: string, gameId: number }

export async function POST(request: Request) { 

    const data: gameAndUser = await request.json()
    const { userEmail, gameId } = data

    // get all games from user
    const games = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: { 
            games: true
        }
    })

    // filter out game (.filter function didn't work so needed for loop)
    let filteredGames: number[] = [];
    if (games != null) { 

        for (let i = 0; i < games.games.length; i++) {
            if (games.games[i] !== gameId) { 
                filteredGames.push(games.games[i])
            }
         }
        
    }

    // set new filtered array as user's games array
    try {
        const removeGameFromUser = await prisma.user.update({
            where: {
                email: userEmail
            },
            data: {
                games: {
                    set: filteredGames
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