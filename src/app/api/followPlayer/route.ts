import { IUser } from "@/lib/custom_types";
import prisma from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

type userRequest = { player: IUser };

export async function POST(request: Request) {

    const data: userRequest = await request.json()
    const { player } = data

    const { userId } = auth();
    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    try {
        await prisma.follows.create({
            data: {
                followedById: userId,
                followedByEmail: user?.emailAddresses[0].emailAddress!,
                followedByUName: user?.username!,
                followingId: player.id,
                followingEmail: player.email!,
                followingUName: player.userName!
            }
        })
    } catch (error) {
        console.log("Failed to create following relation", error)
        return NextResponse.json({ message: `${user?.username!} and ${player.userName!} connection failed`, error })
    }

    return NextResponse.json({ message: `${user?.username!} and ${player.userName!} are connected!` })
}