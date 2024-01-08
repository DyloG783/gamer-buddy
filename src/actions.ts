'use server'

import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs';
// import { revalidatePath } from 'next/cache'

export async function sendMessagePrivate(privateRoomId: string, formData: FormData) {
    'use server'

    const message = formData.get('message_input') as string;
    const { userId } = auth();
    const Pusher = require("pusher");

    if (!auth) {
        console.log("Send message server action, not authorised failure")
        return
    }

    try {
        const privMessage = await prisma.privateMessage.create({
            data: {
                chatPrivateRoomId: privateRoomId,
                message: message,
                userId: userId!
            },
            select: {
                message: true,
                sentPrivateBy: { select: { userName: true } }
            }
        })
        // revalidatePath('/');
        console.log("Created private message in Database!")

        const pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: "ap1",
            useTLS: true,
        });

        pusher.trigger(privateRoomId, "private-room-post", {
            message: `${JSON.stringify(privMessage)}\n\n`,
        });

    } catch (error) {
        // return { message: `Failed to create message`, error }
        console.log("Fail create and broadcast private message", error)
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
        console.log("Created Message!")

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