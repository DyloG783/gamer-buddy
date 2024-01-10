import { IGame, IUser } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type userRequest = { user: IUser, player: IUser };

export async function POST(request: Request) {

    const data: userRequest = await request.json();
    const { player } = data;

    const { userId } = auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    try {
        await prisma.follows.delete({
            where: {
                followingEmail_followedByEmail: {
                    followedByEmail: user?.emailAddresses[0].emailAddress!,
                    followingEmail: player.email!,
                }
            }
        })

    } catch (error) {
        console.log("Failed to delete following relation", error)
        return NextResponse.json({ message: `${user?.username} and ${player.userName} disconnection failed`, error })
    }

    return NextResponse.json({ message: `${user?.username} and ${player.userName} disconnection successful!` })
}