import { TUserId } from "@/lib/custom_types";
import { clerkClient } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';


export async function DELETE(request: Request) {

    // const { userId } = auth();

    // if (!userId) {
    //     return new Response("Unauthorized", { status: 401 });
    // }

    // const data: TUserId = await request.body.json();
    // const { userId } = data;

    const { userId } = await request.body.json();

    try {
        await clerkClient.users.deleteUser(userId);
        return NextResponse.json({ message: 'Success' });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error deleting user' });
    }
}