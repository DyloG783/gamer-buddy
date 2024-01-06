'use server'

import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache'

export async function sendMessagePrivate(playerId: string, formData: FormData) {
    const message = formData.get('message_input') as string;
    const { userId } = auth();

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        await prisma.privateMessage.create({
            data: {
                sentById: userId!,
                recievedById: playerId,
                message: message
            }
        })
        revalidatePath('/');
        // return { message: `Created Message: ${message}!` }
        console.log("Created Message")
        return
    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail created Message", error)
    }
}

export async function sendMessageForum(gameRoomId: string, formData: FormData) {
    const message = formData.get('message_input') as string;
    const { userId } = auth();

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        await prisma.gameMessage.create({
            data: {
                userId: userId!,
                message: message,
                gameRoomId: gameRoomId,

            }
        })
        revalidatePath('/');
        // return { message: `Created Message: ${message}!` }
        console.log("Created Message")
        return
    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail created Message", error)
    }
}