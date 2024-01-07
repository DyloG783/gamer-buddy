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
    'use server'

    const message = formData.get('message_input') as string;
    const { userId } = auth();
    const Pusher = require("pusher");

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        const newMessage = await prisma.gameMessage.create({
            data: {
                userId: userId!,
                message: message,
                gameRoomId: gameRoomId,

            },
            include: {
                sentGameBy: {
                    select: {
                        userName: true
                    }
                }
            }
        })
        // revalidatePath('/');
        // return { message: `Created Message: ${message}!` }
        console.log("Created Message!")
        // return

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        pusher.trigger(gameRoomId, "game-room-post", {
            message: `${JSON.stringify(newMessage)}\n\n`,
        });

    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail create Message", error)
    }
}